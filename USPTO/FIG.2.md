🧭 FIG.2 – Tier Verification Flow

📄 語義敘述（Description）

FIG.2 presents the tiered verification process used by the LORI Safeguard Framework to differentiate between levels of identity assurance and access privileges.
The system operates through a progressive three-tier model:
	1.	(201) Tier 0 – Symbolic Verification Stage
The user or AI agent performs a micro-payment of USD 1.99 and basic identity input. Upon successful validation, a Limited Token is issued allowing minimal-risk API access (typically 100 calls/day).
	2.	(202) Tier 1 – KYC & Behavioral Verification Stage
The entity submits government-issued identification and liveness verification (e.g., face match or document token). Upon approval, access expands to Full Token status, removing daily limits but maintaining behavioral monitoring.
	3.	(203) Tier 2 – Corporate Integrity Verification Stage
For AI companies or institutional agents, a refundable Corporate Deposit of USD 1,000 is required. The entity must register a verifiable AI-Agent-Identifier Header and agree to the Corporate Integrity License (CIL).
	4.	(204) Escalation Path
Any suspicious behavior detected by the risk engine (205) triggers a downgrade, manual review, or account freeze as described in FIG.3.

The flow ensures that every user or AI progresses through measurable integrity checkpoints, guaranteeing that higher privileges correspond to stronger verification and accountability.

📘 Reference Numerals

編號
階層 / 元件
功能說明
(201)
Tier 0 – Symbolic Verification
微支付與限額 Token 發放
(202)
Tier 1 – KYC & Behavioral Verification
身分證件與活體驗證階段
(203)
Tier 2 – Corporate Integrity Verification
企業押金與 AI-Agent 標識
(204)
Escalation Path
風險異常回退路徑
(205)
Risk Engine
連動 FIG.3 的評分與撤權邏輯

<text x="50%" y="98%" text-anchor="middle"
      font-size="12" font-family="Arial" fill="rgba(80,80,80,0.4)">
  LORI FRAMEWORK © 2025 – ETHICAL SYSTEM ORIGINAL WATERMARK
</text>



