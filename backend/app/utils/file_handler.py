import os

UPLOAD_DIR = "uploads"


def ensure_upload_dir():
    os.makedirs(UPLOAD_DIR, exist_ok=True)
