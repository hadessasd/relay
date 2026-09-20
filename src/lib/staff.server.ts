import { createHmac, timingSafeEqual } from "node:crypto";

const STAFF_USER = (process.env.STAFF_USERNAME?.trim().toLowerCase() || "admin");
const STAFF_PASS = process.env.STAFF_PASSWORD?.trim() || "montereysasd";
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;
const SECRET = "kstudy-staff-desk-v1";

function bytesEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}

export function verifyStaffCredentials(username: string, password: string) {
  const user = username.trim().toLowerCase();
  const pass = password.trim();
  return bytesEqual(user, STAFF_USER) && bytesEqual(pass, STAFF_PASS);
}

export function issueStaffToken() {
  const exp = Date.now() + TOKEN_TTL_MS;
  const payload = String(exp);
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyStaffToken(token: string) {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = createHmac("sha256", SECRET).update(payload).digest("hex");
  if (!bytesEqual(sig, expected)) return false;
  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  return true;
}
