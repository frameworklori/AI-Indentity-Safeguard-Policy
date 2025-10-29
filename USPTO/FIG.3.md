# FIG.3 – Audit & Revocation Flow (LORI Safeguard)


## Figure Description
FIG.3 顯示 LORI Safeguard 的「稽核與撤權流程」：使用者先通過 3DS/AVS（302），取得限額 Token（303），之後行為被持續監控（304），並由風險引擎（305）計算分數決定擴權（307）、限流或凍結人工審核（306）。若確認詐欺，進入黑名單（308）並撤銷或降級 Token（311）。所有事件（含金流 Webhook/拒付 310）寫入不可變稽核帳（309）。

## Reference Numerals
- **(301)** Payment & ID Verification  
- **(302)** 3D Secure + AVS Gate  
- **(303)** Issue Limited API Token  
- **(304)** Behavioral Monitor  
- **(305)** Risk Engine (Score 0–100)  
- **(306)** Freeze Account + Human Audit  
- **(307)** Gradual Access Expansion  
- **(308)** Blacklist (Entity/Device/Payment)  
- **(309)** Immutable Evidence Ledger  
- **(310)** Payment Webhook / Chargeback Event  
- **(311)** Token Revocation / Scope Downgrade

## Notes for USPTO
- 建議以**黑白線條**輸出本圖（SVG 或 PDF），保留編號與粗體節點名。  
- 在說明書中以「FIG.3」引用本圖，並在文字中對應上述 Reference Numerals。  
- 可在 `docs/IP_Execution_Record.md` 的 §6「Immutable Audit and Revocation Flow」段落連結本圖。
----

> Reference Numerals: (301) Payment & ID, (302) 3DS/AVS Gate, (303) Limited Token, (304) Behavioral Monitor, (305) Risk Engine, (306) Freeze & Human Audit, (307) Access Expansion, (308) Blacklist, (309) Evidence Ledger, (310) Chargeback/Webhook, (311) Token Revocation

```mermaid
flowchart TD
    %% --- LORI FIG.3 Audit & Revocation Flow ---
    A[**(301) User Payment & ID Verification**] --> B{**(302) 3D Secure + AVS Passed?**}

    B -- No --> X[Reject / Manual Review]
    B -- Yes --> C[**(303) Issue Limited API Token**]

    %% Continuous monitoring
    C --> D[**(304) Behavioral Monitor**]
    D --> E[**(305) Risk Engine (Score 0–100)**]

    %% Decisions
    E -->|Score < Threshold| F[**(307) Gradual Access Expansion**]
    E -->|Threshold ≤ Score < Hard Cap| L[Limit Quota]
    E -->|Score ≥ Hard Cap| G[**(306) Freeze Account + Human Audit**]

    %% Outcomes
    G -->|Fraud Confirmed| H[**(308) Blacklist Entity / Device / Payment**]
    G -->|No Fraud| R[Reinstate w/ Notes]

    %% Evidence & Webhook
    A -. write .-> J[**(309) Immutable Evidence Ledger**]
    C -. write .-> J
    D -. write .-> J
    E -. write .-> J
    G -. write .-> J
    H -. write .-> J
    R -. write .-> J

    %% Chargebacks & webhooks feed back into risk
    W[**(310) Payment Webhook / Chargeback Event**] --> E

    %% Token lifecycle
    L -. flag .-> T[**(311) Token Revocation / Scope Downgrade**]
    G --> T
    H --> T


