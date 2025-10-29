/**
 * LORI Safeguard Utility – auditLog.ts
 * Immutable JSONL audit ledger for all critical events.
 */
import fs from "fs";
import crypto from "crypto";
const LOG = "logs/audit.jsonl";

export function writeAudit(event: Record<string, any>) {
  const ts = new Date().toISOString();
  const body = { ts, ...event };
  const line = JSON.stringify(body);
  const hash = crypto.createHash("sha256").update(line).digest("hex");
  const record = JSON.stringify({ ...body, hash });
  fs.mkdirSync("logs", { recursive: true });
  fs.appendFileSync(LOG, record + "\n", "utf8");
  return { ts, hash };
}
