import { create } from "zustand";
import type { SavedResult } from "@/lib/progress";

export type QuizResult = SavedResult;

type StudentRecord = {
  results: QuizResult[];
};

type CampusSession = {
  uniId: string;
  accessKey: string;
};

type StudentState = {
  currentName: string | null;
  students: Record<string, StudentRecord>;
  hydrated: boolean;
  isStaff: boolean;
  staffToken: string | null;
  campus: CampusSession | null;
  showArabic: boolean;
  hydrate: () => void;
  login: (name: string, campus?: CampusSession) => void;
  logout: () => void;
  saveResult: (result: QuizResult) => void;
  enterStaff: (token: string) => void;
  mergeResults: (name: string, results: QuizResult[]) => void;
  setShowArabic: (on: boolean) => void;
};

const KEY = "kstudy-student";
const STAFF_KEY = "kstudy-staff";
const CAMPUS_KEY = "kstudy-campus";
const ARABIC_KEY = "kstudy-arabic";

function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, " ").slice(0, 48);
}

function readStorage(): Pick<StudentState, "currentName" | "students"> {
  if (typeof window === "undefined") {
    return { currentName: null, students: {} };
  }
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { currentName: null, students: {} };
    const parsed = JSON.parse(raw) as Partial<StudentState>;
    return {
      currentName: typeof parsed.currentName === "string" ? parsed.currentName : null,
      students: parsed.students && typeof parsed.students === "object" ? parsed.students : {},
    };
  } catch {
    return { currentName: null, students: {} };
  }
}

function readStaffToken() {
  if (typeof window === "undefined") return null;
  try {
    const token = window.localStorage.getItem(STAFF_KEY);
    return token && token.length > 8 ? token : null;
  } catch {
    return null;
  }
}

function readCampus(): CampusSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CAMPUS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CampusSession;
    if (parsed?.uniId && parsed?.accessKey) return parsed;
    return null;
  } catch {
    return null;
  }
}

function writeStorage(state: Pick<StudentState, "currentName" | "students">) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    KEY,
    JSON.stringify({ currentName: state.currentName, students: state.students }),
  );
}

function writeStaff(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(STAFF_KEY, token);
  else window.localStorage.removeItem(STAFF_KEY);
}

function writeCampus(campus: CampusSession | null) {
  if (typeof window === "undefined") return;
  if (campus) window.localStorage.setItem(CAMPUS_KEY, JSON.stringify(campus));
  else window.localStorage.removeItem(CAMPUS_KEY);
}

function readArabic() {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(ARABIC_KEY);
    if (raw === "0" || raw === "off") return false;
    return true;
  } catch {
    return true;
  }
}

function writeArabic(on: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ARABIC_KEY, on ? "1" : "0");
}

function newerWins(local: QuizResult[], remote: QuizResult[]) {
  const map = new Map<string, QuizResult>();
  for (const item of local) map.set(`${item.courseId}:${item.topicId}`, item);
  for (const item of remote) {
    const key = `${item.courseId}:${item.topicId}`;
    const prev = map.get(key);
    if (!prev || Date.parse(item.submittedAt) >= Date.parse(prev.submittedAt)) {
      map.set(key, item);
    }
  }
  return [...map.values()];
}

async function pullRemote(name: string) {
  try {
    const { touchStudent, loadStudentProgress } = await import("./progress");
    await touchStudent({ data: { name } });
    const remote = await loadStudentProgress({ data: { name } });
    useStudent.getState().mergeResults(name, remote.results);
  } catch {
    // Device copy still works if the shared desk is briefly down.
  }
}

async function pushResult(name: string, result: QuizResult) {
  try {
    const { persistResult } = await import("./progress");
    await persistResult({ data: { name, result } });
  } catch {
    // Kept locally.
  }
}

export const useStudent = create<StudentState>()((set, get) => ({
  currentName: null,
  students: {},
  hydrated: false,
  isStaff: false,
  staffToken: null,
  campus: null,
  showArabic: true,
  hydrate: () => {
    const loaded = readStorage();
    const staffToken = readStaffToken();
    const campus = readCampus();
    const showArabic = readArabic();
    if (typeof document !== "undefined") {
      document.documentElement.dataset.arabic = showArabic ? "on" : "off";
    }
    set({
      ...loaded,
      currentName: staffToken ? null : loaded.currentName,
      staffToken,
      isStaff: Boolean(staffToken),
      campus: staffToken ? null : campus,
      showArabic,
      hydrated: true,
    });
    const name = staffToken ? null : loaded.currentName;
    if (name) void pullRemote(name);
  },
  login: (raw, campus) => {
    const name = normalizeName(raw);
    if (!name) return;
    writeStaff(null);
    const nextCampus = campus ?? get().campus;
    writeCampus(nextCampus);
    set((s) => {
      const next = {
        currentName: name,
        students: {
          ...s.students,
          [name]: s.students[name] ?? { results: [] },
        },
      };
      writeStorage(next);
      return { ...next, isStaff: false, staffToken: null, campus: nextCampus };
    });
    void pullRemote(name);
  },
  logout: () => {
    writeStaff(null);
    writeCampus(null);
    set((s) => {
      const next = { currentName: null, students: s.students };
      writeStorage(next);
      return { ...next, isStaff: false, staffToken: null, campus: null };
    });
  },
  saveResult: (result) => {
    const name = get().currentName;
    if (!name) return;
    set((s) => {
      const rec = s.students[name] ?? { results: [] };
      const results = rec.results.filter(
        (r) => !(r.courseId === result.courseId && r.topicId === result.topicId),
      );
      results.push(result);
      const next = {
        currentName: s.currentName,
        students: {
          ...s.students,
          [name]: { results },
        },
      };
      writeStorage(next);
      return next;
    });
    void pushResult(name, result);
  },
  enterStaff: (token) => {
    writeStaff(token);
    writeCampus(null);
    set((s) => {
      const next = { currentName: null, students: s.students };
      writeStorage(next);
      return { ...next, isStaff: true, staffToken: token, campus: null };
    });
  },
  mergeResults: (name, results) => {
    set((s) => {
      const rec = s.students[name] ?? { results: [] };
      const merged = newerWins(rec.results, results);
      const next = {
        currentName: s.currentName,
        students: {
          ...s.students,
          [name]: { results: merged },
        },
      };
      writeStorage(next);
      return next;
    });
  },
  setShowArabic: (on) => {
    writeArabic(on);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.arabic = on ? "on" : "off";
    }
    set({ showArabic: on });
  },
}));
