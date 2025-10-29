/**
 * LORI Safeguard Middleware – ofacCheck.ts
 * Purpose: verify geographic risk and OFAC sanction list compliance.
 */
import { NextFunction, Request, Response } from "express";

// 這裡示意：實際可整合 ComplyAdvantage 或 WorldCheck API
export async function ofacCheck(req: Request, res: Response, next: NextFunction) {
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").toString();

  // 模擬查詢邏輯
  const flagged = false; // true 若來自制裁地區
  (req as any).geoSanction = flagged ? 20 : 0;

  if (flagged) {
    return res.status(403).json({ error: "access_from_sanctioned_region" });
  }
  next();
}
