import subprocess
import os
import time

CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUTPUT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

scenarios = [
    # 1. Desktop - Dropdown (Animated Select) in Midnight
    {"name": "19-desktop-midnight-dropdown", "url": "http://localhost:5173/?component=dropdown&theme=midnight", "w": 1280, "h": 850},
    # 2. Desktop - Dropdown in Clean Light
    {"name": "20-desktop-light-dropdown", "url": "http://localhost:5173/?component=dropdown&theme=minimal-light", "w": 1280, "h": 850},
    # 3. Desktop - Unified Select in Cyberpunk
    {"name": "21-desktop-cyberpunk-select", "url": "http://localhost:5173/?component=select&theme=cyberpunk", "w": 1280, "h": 850},
    # 4. Desktop - Master Input Playground in Sunset Glow
    {"name": "22-desktop-sunset-input-suite", "url": "http://localhost:5173/?component=input&theme=sunset", "w": 1280, "h": 900},
    # 5. Desktop - Floating Label Input in Emerald Matrix
    {"name": "23-desktop-emerald-floating-input", "url": "http://localhost:5173/?component=floating-input&theme=emerald", "w": 1280, "h": 850},
    # 6. Desktop - OTP Code Input in Ocean Abyss
    {"name": "24-desktop-ocean-otp-input", "url": "http://localhost:5173/?component=otp-input&theme=ocean", "w": 1280, "h": 850},
    # 7. Desktop - Tag Input in Midnight
    {"name": "25-desktop-midnight-tag-input", "url": "http://localhost:5173/?component=tag-input&theme=midnight", "w": 1280, "h": 850},
    # 8. Desktop - Password Strength in Clean Light
    {"name": "26-desktop-light-password-strength", "url": "http://localhost:5173/?component=password-input&theme=minimal-light", "w": 1280, "h": 850},
    # 9. Desktop - Expanding Search in Cyberpunk Neon
    {"name": "27-desktop-cyberpunk-expanding-search", "url": "http://localhost:5173/?component=expanding-search&theme=cyberpunk", "w": 1280, "h": 850},
    # 10. Tablet - Dropdown in Midnight (768 x 1024)
    {"name": "28-tablet-midnight-dropdown", "url": "http://localhost:5173/?component=dropdown&theme=midnight", "w": 768, "h": 1024},
    # 11. Mobile - Master Input Suite in Clean Light (390 x 844)
    {"name": "29-mobile-light-input-suite", "url": "http://localhost:5173/?component=input&theme=minimal-light", "w": 390, "h": 844},
    # 12. Mobile - Dropdown in Cyberpunk (390 x 844)
    {"name": "30-mobile-cyberpunk-dropdown", "url": "http://localhost:5173/?component=dropdown&theme=cyberpunk", "w": 390, "h": 844},
]

print(f"Starting capture of {len(scenarios)} advanced Select & Input variant screenshots...")

for idx, s in enumerate(scenarios, start=1):
    out_file = os.path.join(OUTPUT_DIR, f"{s['name']}.png")
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--hide-scrollbars",
        "--virtual-time-budget=2000",
        f"--window-size={s['w']},{s['h']}",
        f"--screenshot={out_file}",
        s["url"],
    ]
    print(f"[{idx}/{len(scenarios)}] Capturing {s['name']} ({s['w']}x{s['h']})...")
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(0.2)

print("All advanced variant screenshots successfully captured!")
