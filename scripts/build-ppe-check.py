from pathlib import Path
import base64
root = Path(__file__).resolve().parents[1]
source = (root / "ppe-check/source.html").read_text()
poster = (root / "assets/ppe-check/poster.png").read_bytes()
(root / "ppe-check/index.html").write_text(source.replace("__POSTER__", "../assets/ppe-check/poster.png"))
(root / "ppe-check/ppe-check-20261113-v01.html").write_text(source.replace("__POSTER__", "data:image/png;base64," + base64.b64encode(poster).decode()))
print("PPE source and portable release built.")
