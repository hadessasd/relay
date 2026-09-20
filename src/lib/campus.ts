import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getUniversity } from "@/data/universities";

export type AccessKeyRow = {
  code: string;
  uniId: string;
  createdAt: string;
  useCount: number;
};

export type ShopListing = {
  id: string;
  teacherName: string;
  title: string;
  summary: string;
  priceAed: number;
  createdAt: string;
  email?: string;
  contact?: string;
  subject?: string;
  audience?: string;
  outline?: string;
  language?: string;
  duration?: string;
  format?: string;
  outcomes?: string;
  status: "live" | "on_hold";
};

export type SaleRow = {
  id: number;
  listingId: string;
  buyerName: string;
  amountAed: number;
  commissionAed: number;
  createdAt: string;
};

function mintCode(prefix: string) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let tail = "";
  for (let i = 0; i < 6; i += 1) tail += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `${prefix}-${tail}`;
}

export const verifyAccessKey = createServerFn({ method: "POST" })
  .validator(z.object({ uniId: z.string().min(1).max(32), code: z.string().min(3).max(24) }))
  .handler(async ({ data }) => {
    const uni = getUniversity(data.uniId);
    if (!uni) return { ok: false as const, error: "That campus is not on the list." };
    const code = data.code.trim().toUpperCase();
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql<{ code: string; uni_id: string }>`
      select code, uni_id from access_keys where code = ${code}
    `;
    const row = rows[0];
    if (!row || row.uni_id !== data.uniId) {
      return { ok: false as const, error: "That access key is not valid for this campus." };
    }
    await sql`update access_keys set use_count = use_count + 1 where code = ${code}`;
    return { ok: true as const, uniId: data.uniId, code };
  });

export const createAccessKey = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().min(1), uniId: z.string().min(1).max(32) }))
  .handler(async ({ data }) => {
    const { verifyStaffToken } = await import("./staff.server");
    if (!verifyStaffToken(data.token)) return { ok: false as const, error: "Staff session expired." };
    const uni = getUniversity(data.uniId);
    if (!uni) return { ok: false as const, error: "Unknown campus." };
    const { getSql } = await import("./db");
    const sql = await getSql();
    let code = mintCode(uni.prefix);
    for (let i = 0; i < 5; i += 1) {
      try {
        await sql`insert into access_keys (code, uni_id) values (${code}, ${data.uniId})`;
        return { ok: true as const, code, uniId: data.uniId };
      } catch {
        code = mintCode(uni.prefix);
      }
    }
    return { ok: false as const, error: "Could not mint a unique key. Try again." };
  });

export const listAccessKeys = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }): Promise<{ ok: true; keys: AccessKeyRow[] } | { ok: false; error: string }> => {
    const { verifyStaffToken } = await import("./staff.server");
    if (!verifyStaffToken(data.token)) return { ok: false, error: "Staff session expired." };
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql<{ code: string; uni_id: string; created_at: string; use_count: number }>`
      select code, uni_id, created_at, use_count from access_keys order by created_at desc
    `;
    return {
      ok: true,
      keys: rows.map((r) => ({
        code: r.code,
        uniId: r.uni_id,
        createdAt: r.created_at,
        useCount: Number(r.use_count),
      })),
    };
  });

type ListingRow = {
  id: string;
  teacher_name: string;
  title: string;
  summary: string;
  price_aed: number;
  created_at: string;
  email: string | null;
  contact: string | null;
  subject: string | null;
  audience: string | null;
  outline: string | null;
  language: string | null;
  duration: string | null;
  format: string | null;
  outcomes: string | null;
  status: string;
};

function toListing(r: ListingRow): ShopListing {
  return {
    id: r.id,
    teacherName: r.teacher_name,
    title: r.title,
    summary: r.summary,
    priceAed: Number(r.price_aed),
    createdAt: r.created_at,
    email: r.email ?? undefined,
    contact: r.contact ?? undefined,
    subject: r.subject ?? undefined,
    audience: r.audience ?? undefined,
    outline: r.outline ?? undefined,
    language: r.language ?? undefined,
    duration: r.duration ?? undefined,
    format: r.format ?? undefined,
    outcomes: r.outcomes ?? undefined,
    status: r.status === "live" ? "live" : "on_hold",
  };
}

export const listListings = createServerFn({ method: "POST" }).handler(async (): Promise<ShopListing[]> => {
  const { getSql } = await import("./db");
  const sql = await getSql();
  const rows = await sql<ListingRow>`
    select id, teacher_name, title, summary, price_aed, created_at, email, contact, subject, audience, outline,
      language, duration, format, outcomes, status
    from listings
    where status = 'live'
    order by created_at desc
  `;
  return rows.map(toListing);
});

export const getListing = createServerFn({ method: "POST" })
  .validator(z.object({ listingId: z.string().min(1) }))
  .handler(async ({ data }): Promise<ShopListing | null> => {
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql<ListingRow>`
      select id, teacher_name, title, summary, price_aed, created_at, email, contact, subject, audience, outline,
        language, duration, format, outcomes, status
      from listings
      where id = ${data.listingId}
    `;
    const listing = rows[0] ? toListing(rows[0]) : null;
    if (!listing) return null;
    if (listing.status !== "live") return { ...listing, status: "on_hold" };
    return listing;
  });

export const listHeldListings = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }): Promise<{ ok: true; listings: ShopListing[] } | { ok: false; error: string }> => {
    const { verifyStaffToken } = await import("./staff.server");
    if (!verifyStaffToken(data.token)) return { ok: false, error: "Staff session expired." };
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql<ListingRow>`
      select id, teacher_name, title, summary, price_aed, created_at, email, contact, subject, audience, outline,
        language, duration, format, outcomes, status
      from listings
      where status = 'on_hold'
      order by created_at desc
    `;
    return { ok: true, listings: rows.map(toListing) };
  });

const listingDraft = z.object({
  teacherName: z.string().trim().min(2).max(48),
  email: z.email().max(80),
  contact: z.string().trim().min(6).max(40),
  title: z.string().trim().min(4).max(80),
  subject: z.string().trim().min(2).max(48),
  audience: z.string().trim().min(4).max(120),
  language: z.string().trim().min(2).max(40),
  duration: z.string().trim().min(2).max(40),
  format: z.string().trim().min(2).max(40),
  summary: z.string().trim().min(20).max(400),
  outline: z.string().trim().min(20).max(800),
  outcomes: z.string().trim().min(12).max(400),
  priceAed: z.number().int().min(5).max(5000),
});

export const createListing = createServerFn({ method: "POST" })
  .validator(listingDraft)
  .handler(async ({ data }) => {
    const { getSql } = await import("./db");
    const sql = await getSql();
    const id = `c${Date.now().toString(36)}`;
    // Review is paused on purpose: new teacher courses always stay on hold.
    await sql`
      insert into listings (
        id, teacher_name, title, summary, price_aed, email, contact, subject, audience, outline,
        language, duration, format, outcomes, status
      )
      values (
        ${id}, ${data.teacherName}, ${data.title}, ${data.summary}, ${data.priceAed},
        ${data.email}, ${data.contact}, ${data.subject}, ${data.audience}, ${data.outline},
        ${data.language}, ${data.duration}, ${data.format}, ${data.outcomes}, 'on_hold'
      )
    `;
    return { ok: true as const, id, status: "on_hold" as const };
  });

export const buyListing = createServerFn({ method: "POST" })
  .validator(z.object({ listingId: z.string().min(1), buyerName: z.string().trim().min(1).max(48) }))
  .handler(async ({ data }) => {
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql<{ id: string; price_aed: number; title: string; teacher_name: string; status: string }>`
      select id, price_aed, title, teacher_name, status from listings where id = ${data.listingId}
    `;
    const listing = rows[0];
    if (!listing) return { ok: false as const, error: "That course is no longer listed." };
    if (listing.status !== "live") {
      return { ok: false as const, error: "This course is still on hold." };
    }
    const amount = Number(listing.price_aed);
    const commission = Math.max(1, Math.round(amount * 0.02));
    await sql`
      insert into sales (listing_id, buyer_name, amount_aed, commission_aed)
      values (${listing.id}, ${data.buyerName}, ${amount}, ${commission})
    `;
    return {
      ok: true as const,
      title: listing.title,
      teacherName: listing.teacher_name,
      amount,
      commission,
      teacherKeeps: amount - commission,
    };
  });

export const listSales = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }): Promise<{ ok: true; sales: SaleRow[] } | { ok: false; error: string }> => {
    const { verifyStaffToken } = await import("./staff.server");
    if (!verifyStaffToken(data.token)) return { ok: false, error: "Staff session expired." };
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      listing_id: string;
      buyer_name: string;
      amount_aed: number;
      commission_aed: number;
      created_at: string;
    }>`select id, listing_id, buyer_name, amount_aed, commission_aed, created_at from sales order by created_at desc`;
    return {
      ok: true,
      sales: rows.map((r) => ({
        id: Number(r.id),
        listingId: r.listing_id,
        buyerName: r.buyer_name,
        amountAed: Number(r.amount_aed),
        commissionAed: Number(r.commission_aed),
        createdAt: r.created_at,
      })),
    };
  });
