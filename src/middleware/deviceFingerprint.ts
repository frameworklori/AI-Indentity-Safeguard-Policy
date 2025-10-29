/**
 * LORI Safeguard Middleware – deviceFingerprint.ts
 * Purpose: generate a unique device fingerprint using request metadata.
 */
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

export function deviceFingerprint(req: Request, _res: Response, next: NextFunction) {
  const ua = req.headers["user-agent"] || "";
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").toString();
  const accept = req.headers["accept"] || "";
  const lang = req.headers["accept-language"] || "";
  const raw = `${ua}|${ip}|${accept}|${lang}`;
  const fp = crypto.createHash("sha256").update(raw).digest("hex");
  (req as any).device_fp = fp;
  next();
}
