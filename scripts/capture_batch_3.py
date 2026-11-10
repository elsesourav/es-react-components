import subprocess
import os
import time

CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUTPUT_DIR = "/Users/sourav/Developer/WEB/top-projects/es-react-components/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

scenarios = [
    # Desktop captures (1280 x 850)
    {"name": "31-desktop-midnight-presence-avatars", "url": "http://localhost:5173/?component=presence-avatars&theme=midnight", "w": 1280, "h": 850},
    {"name": "32-desktop-light-presence-avatars", "url": "http://localhost:5173/?component=presence-avatars&theme=minimal-light", "w": 1280, "h": 850},
    {"name": "33-desktop-cyberpunk-command-palette", "url": "http://localhost:5173/?component=command-palette&theme=cyberpunk", "w": 1280, "h": 850},
    {"name": "34-desktop-emerald-task-steps", "url": "http://localhost:5173/?component=task-steps&theme=emerald", "w": 1280, "h": 850},
    {"name": "35-desktop-sunset-collapsible-banner", "url": "http://localhost:5173/?component=collapsible-banner&theme=sunset", "w": 1280, "h": 850},
    {"name": "36-desktop-ocean-streaming-text", "url": "http://localhost:5173/?component=streaming-text&theme=ocean", "w": 1280, "h": 850},
    {"name": "37-desktop-midnight-tooltip", "url": "http://localhost:5173/?component=tooltip&theme=midnight", "w": 1280, "h": 850},
    {"name": "38-desktop-light-modal", "url": "http://localhost:5173/?component=modal&theme=minimal-light", "w": 1280, "h": 850},
    {"name": "39-desktop-sunset-load-more", "url": "http://localhost:5173/?component=load-more&theme=sunset", "w": 1280, "h": 850},

    # Mobile captures (390 x 844)
    {"name": "40-mobile-cyberpunk-task-steps", "url": "http://localhost:5173/?component=task-steps&theme=cyberpunk", "w": 390, "h": 844},
    {"name": "41-mobile-light-collapsible-banner", "url": "http://localhost:5173/?component=collapsible-banner&theme=minimal-light", "w": 390, "h": 844},

    # Tablet captures (768 x 1024)
    {"name": "42-tablet-midnight-presence-avatars", "url": "http://localhost:5173/?component=presence-avatars&theme=midnight", "w": 768, "h": 1024},
]

print(f"Starting capture of {len(scenarios)} screenshots for Batch 3 components...")

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

print("Batch 3 screenshots successfully captured!")
