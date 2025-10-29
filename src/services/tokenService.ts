/**
 * LORI Safeguard Service – tokenService.ts
 * Issues, upgrades, and revokes API tokens (Limited / Full).
 */
import crypto from "crypto";

export function issueLimitedToken(userId: string) {
  const token = crypto.randomBytes(24).toString("hex");
  // TODO: store in DB with scope=limited, daily_quota=100
  return token;
}

export function upgradeToFullToken(userId: string) {
  const token = crypto.randomBytes(32).toString("hex");
  // TODO: update DB record to scope=full, remove quota limit
  return token;
}

export function revokeToken(token: string, reason: string) {
  // TODO: mark revoked in DB and log event
  return { ok: true, reason };
}
