# Global Regulations on AI Identity Manipulation

This document compares **international regulations and policy trends** regarding deepfake, face-swapping, synthetic voices, and other identity-related AI technologies.
It is meant as a **reference guide** for developers, policymakers, and auditors.

---

## 🌍 European Union – EU AI Act (2024/2025)
- **Risk Classification**: Deepfake and biometric manipulation → categorized as **High-Risk AI Systems**.
- **Obligations**:
- Clear disclosure: users must be informed if content is AI-generated.
- Providers must implement watermarking or equivalent traceability measures.
- Non-compliance may result in fines up to **6% of global turnover**.

---

## 🇺🇸 United States – AI Bill of Rights & State Laws
- **AI Bill of Rights (2022)**: Framework principles (privacy, transparency, accountability). Not binding law yet.
- **State Regulations**:
- *California (AB 602)*: Bans malicious deepfake in election contexts within 60 days of voting.
- *Texas (SB 751)*: Prohibits deepfake media intended to harm candidates or influence elections.
- *Virginia*: Adds penalties for non-consensual deepfake pornography.

---

## 🇯🇵 Japan
- No specific deepfake law yet, but existing **Unfair Competition Prevention Act** and **Copyright Law** may apply if likeness/image rights are violated.
- Discussions ongoing (2025) for **AI content labeling requirements**.

---

## 🇨🇳 China
- **Deep Synthesis Regulation (2023)**:
- Mandatory labeling of AI-generated audio/video.
- Platforms must perform real-name registration for providers.
- Strict penalties for misuse (including criminal liability).

---

## 🇰🇷 South Korea
- **Information and Communications Network Act**: prohibits distribution of manipulated media that causes harm.
- **2023 Deepfake Pornography Ban**: up to 7 years imprisonment for creators/distributors.

---

## 🌐 Other Jurisdictions
- **UK**: Draft Online Safety Bill includes provisions against harmful deepfakes.
- **Australia**: Considering inclusion of deepfake harms in **Online Safety Act** expansion.
- **Canada**: Privacy commissioners pushing for explicit rules in **AI and Data Act** (AIDA).

---

## 📌 Observations
- **EU & China** → strong mandatory compliance (watermarking, disclosure, penalties).
- **US** → fragmented, state-level enforcement, mainly election & sexual exploitation contexts.
- **Asia (Japan, Korea)** → rapidly adapting, with Korea leading in criminalization.
- **Global Trend** → shift from soft ethics → hard law (fines, bans, traceability mandates).

---

## ✅ Implications for AI-Identity-Safeguard-Policy
- Our repo’s **watermarking + KYC requirement** aligns well with EU AI Act & China’s regulation.
- US market requires **flexible, state-specific compliance modules**.
- Japan will likely adopt disclosure obligations soon, so watermark-first approach is future-proof.
