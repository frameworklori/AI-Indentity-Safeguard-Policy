"""
generate_meta.py
Utility script to generate metadata JSON for AI-generated outputs.

© 2025 LORI Framework – AI-Identity-Safeguard-Policy
"""

import hashlib
import json
import os
import argparse
from datetime import datetime
import uuid


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
# Main: generate metadata JSON
# ---------------------------
def generate_metadata(file_path: str, user_id: str, payment_ref: str, consent_proof: str = None):
output_hash = compute_hash(file_path)

metadata = {
"audit_id": f"AUD-{datetime.utcnow().strftime('%Y%m%d-%H%M%S')}-{uuid.uuid4().hex[:6]}",
"timestamp": datetime.utcnow().isoformat() + "Z",
"user_id": user_id,
"payment_ref": payment_ref,
"input_hash": "N/A", # if original input provided, replace here
"output_hash": output_hash,
"feature_scope": "high_risk",
"watermark_id": f"WMK-{uuid.uuid4().hex[:8]}",
"consent_proof": consent_proof if consent_proof else "N/A",
"ip_address": "0.0.0.0" # can be updated by server logs
}

meta_path = file_path + "_meta.json"
with open(meta_path, "w", encoding="utf-8") as f:
json.dump(metadata, f, indent=2)

print(f"✅ Metadata generated: {meta_path}")
return meta_path


# ---------------------------
# CLI Entry
# ---------------------------
if __name__ == "__main__":
parser = argparse.ArgumentParser(description="Generate metadata JSON for AI output files")
parser.add_argument("file", help="Path to the output file (e.g., sample_voice.wav)")
parser.add_argument("--user", required=True, help="User ID")
parser.add_argument("--payment", required=True, help="Payment reference / transaction ID")
parser.add_argument("--consent", help="Consent document ID if third-party likeness is used")

args = parser.parse_args()

if not os.path.exists(args.file):
raise FileNotFoundError(f"Output file not found: {args.file}")

generate_metadata(args.file, args.user, args.payment, args.consent)

