/**
 * LORI Safeguard Middleware – riskRecorder.ts
 * Purpose: record behavioral events, compute risk score, and decide actions.
 */
import { writeAudit } from "../utils/auditLog.js";
import { computeRiskScore, decision } from "../services/riskEngine.js";
import { NextFunction, Request, Response } from "express";

export function riskRecorder(tag: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const entry = {
      tag,
      ip: (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").toString(),
      device_fp: (req as any).device_fp || "",
      user: (req as any).user_id || null,
    };

    const score = computeRiskScore({
      ipReputation: 5,
      deviceDuplication: 10,
      paymentSignal: 5,
      geoSanction: (req as any).geoSanction || 0,
    });

    const act = decision(score);
    writeAudit({ ...entry, score, act });
    (req as any).riskAction = act;

    if (act === "FREEZE") return res.status(423).json({ error: "account_frozen" });
    if (act === "LIMIT") (req as any).limited = true;

    next();
  };
}
