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

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "lead"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "callout"; kind: CalloutKind; title: string; text: string }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "cards"; items: { kicker?: string; title: string; body: string }[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "figure"; src: string; alt: string; caption?: string }
  | { type: "diagram"; kind: DiagramKind; caption?: string }
  | { type: "lab"; kind: "profit" };

export type Mcq = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  tag?: string;
};

export type WritingQ = {
  id: string;
  prompt: string;
  modelAnswer: string;
  hint?: string;
  marks?: string[];
};

export type ExamModule = {
  id: string;
  number: string;
  title: string;
  minutes: number;
  intro: string;
  mcqs: Mcq[];
  writing: WritingQ[];
};

export type Topic = {
  id: string;
  number: string;
  title: string;
  kicker: string;
  clo: "CLO 1" | "CLO 2";
  week: string;
  summary: string;
  blocks: ContentBlock[];
  mcqs: Mcq[];
  writing: WritingQ[];
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
  finalExam: {
    intro: string;
    mcqs: Mcq[];
    writing: WritingQ[];
  };
  summarySheet: {
    title: string;
    intro: string;
    rows: { idea: string; remember: string }[];
    closing: string;
  };
};
