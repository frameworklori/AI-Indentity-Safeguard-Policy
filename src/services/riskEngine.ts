/**
 * LORI Safeguard Service – riskEngine.ts
 * Calculates composite risk scores and determines enforcement decisions.
 */
type RiskFactors = {
  ipReputation?: number;      // 0–30
  deviceDuplication?: number; // 0–20
  paymentSignal?: number;     // 0–30
  geoSanction?: number;       // 0–20
  behaviorSpike?: number;     // 0–30
};

export function computeRiskScore(f: RiskFactors): number {
  const score =
    (f.ipReputation || 0) +
    (f.deviceDuplication || 0) +
    (f.paymentSignal || 0) +
    (f.geoSanction || 0) +
    (f.behaviorSpike || 0);
  return Math.min(100, score);
}

export function decision(score: number) {
  const t = Number(process.env.RISK_THRESHOLD_FREEZE || 70);
  if (score >= t) return "FREEZE";
  if (score >= t - 15) return "LIMIT";
  return "ALLOW";
}
