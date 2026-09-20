import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type SavedResult = {
  courseId: string;
  topicId: string;
  mcqScore: number;
  mcqTotal: number;
  writingCount: number;
  answers: Record<string, number | string>;
  submittedAt: string;
};

export type RosterStudent = {
  name: string;
  lastSeen: string;
  createdAt: string;
  results: SavedResult[];
};

const nameSchema = z
  .string()
  .trim()
  .min(1)
  .max(48)
  .transform((value) => value.replace(/\s+/g, " "));

const resultSchema = z.object({
  courseId: z.string().min(1).max(64),
  topicId: z.string().min(1).max(64),
  mcqScore: z.number().int().min(0).max(200),
  mcqTotal: z.number().int().min(0).max(200),
  writingCount: z.number().int().min(0).max(50),
  answers: z.record(z.string(), z.union([z.number(), z.string()])),
  submittedAt: z.string().min(1).max(40),
});

type StudentRow = { name: string; last_seen: string; created_at: string };
type ResultRow = {
  student_name: string;
  course_id: string;
  topic_id: string;
  mcq_score: number;
  mcq_total: number;
  writing_count: number;
  answers_json: string;
  submitted_at: string;
};

function parseAnswers(raw: string): Record<string, number | string> {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const out: Record<string, number | string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "number" || typeof value === "string") out[key] = value;
    }
    return out;
  } catch {
    return {};
  }
}

function toSaved(row: ResultRow): SavedResult {
  return {
    courseId: row.course_id,
    topicId: row.topic_id,
    mcqScore: Number(row.mcq_score),
    mcqTotal: Number(row.mcq_total),
    writingCount: Number(row.writing_count),
    answers: parseAnswers(row.answers_json),
    submittedAt: row.submitted_at,
  };
}

export const staffLogin = createServerFn({ method: "POST" })
  .validator(z.object({ username: z.string(), password: z.string() }))
  .handler(async ({ data }) => {
    const { verifyStaffCredentials, issueStaffToken } = await import("./staff.server");
    if (!verifyStaffCredentials(data.username, data.password)) {
      return { ok: false as const, error: "Those staff details do not match." };
    }
    return { ok: true as const, token: issueStaffToken() };
  });

export const touchStudent = createServerFn({ method: "POST" })
  .validator(z.object({ name: nameSchema }))
  .handler(async ({ data }) => {
    const { getSql } = await import("./db");
    const sql = await getSql();
    await sql`
      insert into students (name, last_seen)
      values (${data.name}, now())
      on conflict (name) do update set last_seen = now()
    `;
    return { ok: true as const };
  });

export const persistResult = createServerFn({ method: "POST" })
  .validator(z.object({ name: nameSchema, result: resultSchema }))
  .handler(async ({ data }) => {
    const { getSql } = await import("./db");
    const sql = await getSql();
    await sql`
      insert into students (name, last_seen)
      values (${data.name}, now())
      on conflict (name) do update set last_seen = now()
    `;
    const answersJson = JSON.stringify(data.result.answers);
    await sql`
      insert into quiz_results (
        student_name, course_id, topic_id, mcq_score, mcq_total, writing_count, answers_json, submitted_at
      )
      values (
        ${data.name},
        ${data.result.courseId},
        ${data.result.topicId},
        ${data.result.mcqScore},
        ${data.result.mcqTotal},
        ${data.result.writingCount},
        ${answersJson},
        ${data.result.submittedAt}
      )
      on conflict (student_name, course_id, topic_id) do update set
        mcq_score = excluded.mcq_score,
        mcq_total = excluded.mcq_total,
        writing_count = excluded.writing_count,
        answers_json = excluded.answers_json,
        submitted_at = excluded.submitted_at
    `;
    return { ok: true as const };
  });

export const loadStudentProgress = createServerFn({ method: "POST" })
  .validator(z.object({ name: nameSchema }))
  .handler(async ({ data }): Promise<{ results: SavedResult[] }> => {
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql<ResultRow>`
      select student_name, course_id, topic_id, mcq_score, mcq_total, writing_count, answers_json, submitted_at
      from quiz_results
      where student_name = ${data.name}
      order by submitted_at asc
    `;
    return { results: rows.map(toSaved) };
  });

export const listRoster = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }): Promise<{ ok: true; students: RosterStudent[] } | { ok: false; error: string }> => {
    const { verifyStaffToken } = await import("./staff.server");
    if (!verifyStaffToken(data.token)) {
      return { ok: false, error: "Staff session expired. Sign in again." };
    }
    const { getSql } = await import("./db");
    const sql = await getSql();
    const people = await sql<StudentRow>`
      select name, last_seen, created_at
      from students
      order by last_seen desc
    `;
    const rows = await sql<ResultRow>`
      select student_name, course_id, topic_id, mcq_score, mcq_total, writing_count, answers_json, submitted_at
      from quiz_results
      order by submitted_at asc
    `;
    const byName = new Map<string, SavedResult[]>();
    for (const row of rows) {
      const list = byName.get(row.student_name) ?? [];
      list.push(toSaved(row));
      byName.set(row.student_name, list);
    }
    return {
      ok: true,
      students: people.map((person) => ({
        name: person.name,
        lastSeen: person.last_seen,
        createdAt: person.created_at,
        results: byName.get(person.name) ?? [],
      })),
    };
  });
