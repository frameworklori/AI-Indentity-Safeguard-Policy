# Watermarking Guidelines for AI Identity Content

## Purpose
To ensure that any AI-generated face, voice, or likeness can be traced back to its origin.

---

## Types of Watermarks
1. **Visible Marks** – Overlay text like “AI Generated” on images/videos.
2. **Invisible Digital Watermarks** – Embedded into pixels or audio frequencies.
3. **Metadata Tags** – JSON/EXIF fields with watermark_id and audit_id.

---

## Recommended Practices
- Every high-risk output must include **at least one invisible + one metadata watermark**.
- Watermarks must survive common transformations (resizing, compression, format conversion).
- Audio watermarking should use **spread-spectrum frequency encoding** (imperceptible to human ear).

---

## Verification Tools
- Provide open-source scripts for watermark detection.
- Allow authorities or auditors to confirm authenticity without altering content.

