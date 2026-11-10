import subprocess
import os
import time

CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUTPUT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

scenarios = [
    # 1. Desktop - Overview Page in Midnight Space
    {"name": "01-desktop-midnight-overview", "url": "http://localhost:5173/?component=&theme=midnight", "w": 1280, "h": 850},
    # 2. Desktop - Overview Page in Clean Light
    {"name": "02-desktop-light-overview", "url": "http://localhost:5173/?component=&theme=minimal-light", "w": 1280, "h": 850},
    # 3. Desktop - Button in Clean Light
    {"name": "03-desktop-light-button", "url": "http://localhost:5173/?component=button&theme=minimal-light", "w": 1280, "h": 850},
    # 4. Desktop - Button in Cyberpunk Neon
    {"name": "04-desktop-cyberpunk-button", "url": "http://localhost:5173/?component=button&theme=cyberpunk", "w": 1280, "h": 850},
    # 5. Desktop - Card in Emerald Matrix
    {"name": "05-desktop-emerald-card", "url": "http://localhost:5173/?component=card&theme=emerald", "w": 1280, "h": 850},
    # 6. Desktop - Form Inputs in Sunset Glow
    {"name": "06-desktop-sunset-input", "url": "http://localhost:5173/?component=input&theme=sunset", "w": 1280, "h": 850},
    # 7. Desktop - Switch & Checkbox in Ocean Abyss
    {"name": "07-desktop-ocean-switch", "url": "http://localhost:5173/?component=switch&theme=ocean", "w": 1280, "h": 850},
    # 8. Desktop - Stat Dashboard in Midnight Space
    {"name": "08-desktop-midnight-stat", "url": "http://localhost:5173/?component=stat&theme=midnight", "w": 1280, "h": 850},
    # 9. Desktop - Alert Callouts in Cyberpunk Neon
    {"name": "09-desktop-cyberpunk-alert", "url": "http://localhost:5173/?component=alert&theme=cyberpunk", "w": 1280, "h": 850},
    # 10. Desktop - Spinners & Skeletons in Clean Light
    {"name": "10-desktop-light-spinner", "url": "http://localhost:5173/?component=spinner&theme=minimal-light", "w": 1280, "h": 850},
    # 11. Desktop - Tabs in Emerald Matrix
    {"name": "11-desktop-emerald-tabs", "url": "http://localhost:5173/?component=tabs&theme=emerald", "w": 1280, "h": 850},

    # Tablet Viewports (768 x 1024)
    {"name": "12-tablet-midnight-overview", "url": "http://localhost:5173/?component=&theme=midnight", "w": 768, "h": 1024},
    {"name": "13-tablet-light-card", "url": "http://localhost:5173/?component=card&theme=minimal-light", "w": 768, "h": 1024},
    {"name": "14-tablet-cyberpunk-button", "url": "http://localhost:5173/?component=button&theme=cyberpunk", "w": 768, "h": 1024},

    # Mobile Viewports (390 x 844)
    {"name": "15-mobile-midnight-overview", "url": "http://localhost:5173/?component=&theme=midnight", "w": 390, "h": 844},
    {"name": "16-mobile-light-button", "url": "http://localhost:5173/?component=button&theme=minimal-light", "w": 390, "h": 844},
    {"name": "17-mobile-cyberpunk-input", "url": "http://localhost:5173/?component=input&theme=cyberpunk", "w": 390, "h": 844},
    {"name": "18-mobile-sunset-alert", "url": "http://localhost:5173/?component=alert&theme=sunset", "w": 390, "h": 844},
]

print(f"Starting capture of {len(scenarios)} responsive & multi-theme screenshots...")

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

print("All screenshots successfully captured!")
