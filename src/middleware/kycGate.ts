/**
 * LORI Safeguard Middleware – kycGate.ts
 * Purpose: enforce KYC and liveness verification before Tier 2 access.
 */
import { NextFunction, Request, Response } from "express";

export async function requireKYC(req: Request, res: Response, next: NextFunction) {
  const { docToken, selfieToken } = req.body;
  if (!docToken || !selfieToken) {
    return res.status(400).json({ error: "kyc_documents_required" });
  }

  // 模擬 KYC 驗證邏輯（未來可連接 Trulioo、Onfido、Sumsub 等供應商）
  const verified = true;

  if (!verified) {
    return res.status(403).json({ error: "kyc_verification_failed" });
  }

  (req as any).kycStatus = "PASS";
  next();
}
