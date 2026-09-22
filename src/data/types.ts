export type CalloutKind = "exam" | "trap" | "story" | "formula" | "remember";

export type DiagramKind =
  | "hierarchy"
  | "functional"
  | "divisional"
  | "matrix"
  | "flat"
  | "network"
  | "team"
  | "levels"
  | "polc"
  | "lifecycle"
  | "compare";

export type FrqChart =
  | {
      kind: "bar" | "histogram";
      title: string;
      unit?: string;
      bars: { label: string; value: number }[];
    }
  | {
      kind: "pie";
      title: string;
      slices: { label: string; value: number }[];
    }
  | {
      kind: "table";
      title: string;
      headers: string[];
      rows: string[][];
      footer?: string[];
      emphasis?: number[];
    };

export type WorkLine = { lhs?: string; op?: string; rhs: string; note?: string; ar?: string };

export type WorkPart = {
  label: string;
  ask?: string;
  askAr?: string;
  lines: WorkLine[];
  answer?: string;
  answerAr?: string;
};

export type CasioStep = {
  key: string;
  display?: string;
  say?: string;
  sayAr?: string;
};

export type CasioDemo = {
  title: string;
  keys: string[];
  result?: string;
  screen?: string;
  note?: string;
  noteAr?: string;
  steps?: CasioStep[];
  /** Local mp4 of the Casio from the lecture Calculator Guide. */
  video?: string;
  youtube?: string;
  poster?: string;
  videoTitle?: string;
};

export type DatingCalendar = {
  title: string;
  year: number;
  /** Render the full 12-month lecture calendar. */
  showYear?: boolean;
  /** 1–12. When set, a large month is drawn under (or instead of) the year. */
  month?: number;
  invoiceDay?: number;
  paidDay?: number;
  discountDays?: number;
  terms?: string;
  caption?: string;
  ar?: string;
};

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "lead"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[]; ar?: string[] }
  | { type: "callout"; kind: CalloutKind; title: string; text: string; ar?: string }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
      footer?: string[];
      emphasis?: number[];
    }
  | { type: "cards"; items: { kicker?: string; title: string; body: string; ar?: string }[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "figure"; src: string; alt: string; caption?: string }
  | {
      type: "video";
      title: string;
      src?: string;
      youtube?: string;
      poster?: string;
      caption?: string;
    }
  | { type: "diagram"; kind: DiagramKind; caption?: string }
  | { type: "lab"; kind: "profit" }
  | { type: "ar"; text: string }
  | ({ type: "casio" } & CasioDemo)
  | ({ type: "calendar" } & DatingCalendar)
  | {
      type: "work";
      question: string;
      chart?: FrqChart;
      parts: WorkPart[];
      ar?: string;
    };

export type Mcq = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  tag?: string;
  /** Short exam-sentence a student could write after the letter. */
  frqAnswer?: string;
  hint?: string;
  hintAr?: string;
  /** Arabic working shown after submit. Use English digits (12, not ١٢). */
  explanationAr?: string;
  /** Stacked math working shown after submit (practice and tests). */
  working?: WorkPart[];
  /** Optional Casio walkthrough shown with the working. */
  casio?: CasioDemo;
  /** When set, the question is a typed number (auto-graded within tolerance). */
  numericAnswer?: number;
  /** Absolute tolerance. Default 0.01. Use 0.5 for whole-number items. */
  tolerance?: number;
  unit?: string;
};

export type WritingQ = {
  id: string;
  prompt: string;
  modelAnswer: string;
  hint?: string;
  hintAr?: string;
  marks?: string[];
  chart?: FrqChart;
};

export type ExamModule = {
  id: string;
  number: string;
  title: string;
  minutes: number;
  intro: string;
  mcqs: Mcq[];
  writing: WritingQ[];
  marks?: number;
  calculator?: boolean;
};

export type Topic = {
  id: string;
  number: string;
  title: string;
  kicker: string;
  clo: string;
  week: string;
  summary: string;
  blocks: ContentBlock[];
  mcqs: Mcq[];
  writing: WritingQ[];
  /** Original lecture file for this CLO. */
  slides?: { href: string; filename: string; label: string };
};

export type SummarySheet = {
  title: string;
  intro: string;
  rows: { idea: string; remember: string }[];
  closing: string;
};

export type CoursePack = {
  title: string;
  note: string;
  href: string;
  filename: string;
};

export type Course = {
  id: string;
  code: string;
  shortName: string;
  title: string;
  subtitle: string;
  examLabel: string;
  weeks: string;
  clos: string[];
  color: "navy" | "teal";
  topics: Topic[];
  examModules: ExamModule[];
  finalExam: { intro: string; mcqs: Mcq[]; writing: WritingQ[] };
  summarySheet: SummarySheet;
  /** Zip of original lecture files. */
  pack?: CoursePack;
};
