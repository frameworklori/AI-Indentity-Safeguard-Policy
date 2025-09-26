"""
watermark_detector.py
Simple demo script to verify watermark metadata and hash signature
for AI-generated content.

© 2025 LORI Framework – AI-Identity-Safeguard-Policy
"""

import hashlib
import json
import os
from typing import Dict

# ---------------------------
# Helper: compute SHA256 hash
# ---------------------------
def compute_hash(file_path: str) -> str:
sha256 = hashlib.sha256()
with open(file_path, "rb") as f:
for chunk in iter(lambda: f.read(4096), b""):
sha256.update(chunk)
return sha256.hexdigest()


# ---------------------------
# Helper: load metadata JSON
# ---------------------------
def load_metadata(meta_path: str) -> Dict:
if not os.path.exists(meta_path):
raise FileNotFoundError(f"Metadata file not found: {meta_path}")
with open(meta_path, "r", encoding="utf-8") as f:
return json.load(f)


# ---------------------------
# Main Verification
# ---------------------------
def verify_watermark(file_path: str, meta_path: str) -> bool:
# Compute hash of the actual file
actual_hash = compute_hash(file_path)

# Load expected metadata
meta = load_metadata(meta_path)

# Check required fields
required_fields = ["audit_id", "watermark_id", "output_hash"]
for field in required_fields:
if field not in meta:
print(f"❌ Missing field in metadata: {field}")
return False

# Compare output_hash with actual file hash
if meta["output_hash"] != actual_hash:
print("❌ Hash mismatch! File may have been tampered with.")
return False

print("✅ Watermark verified")
print(f"Audit ID: {meta['audit_id']}")
print(f"Watermark ID: {meta['watermark_id']}")
return True


# ---------------------------
# Example Run
# ---------------------------
if __name__ == "__main__":
# Example files (replace with your real paths)
test_file = "outputs/sample_voice.wav"
test_meta = "outputs/sample_voice_meta.json"

try:
result = verify_watermark(test_file, test_meta)
except Exception as e:
print(f"Error: {e}")

