/**
 * LORI Safeguard Utility – crypto.ts
 * Provides hashing, HMAC, and encryption helpers for token and device protection.
 */
import crypto from "crypto";

// 雜湊
export function sha256(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

// HMAC（加簽）
export function hmacSign(message: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

// 生成隨機金鑰
export function randomKey(length = 32): string {
  return crypto.randomBytes(length).toString("hex");
}
