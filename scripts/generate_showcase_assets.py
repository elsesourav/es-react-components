#!/usr/bin/env python3
"""
Generate all ElseSourav App Submission and Showcase Assets for es-react-components:
TARGET DEVICE MODE: DESKTOP ONLY (100% Desktop Mode, ZERO Mobile screens).

Deliverables:
1. Showcase Desktop Screenshots (16:9 aspect ratio, 1920x1080):
   - desktop-01-overview.png
   - desktop-02-tactile-suite.png
   - desktop-03-theme-engine.png
   - desktop-04-toast-stack.png
   - desktop-05-image-crop-upload.png
   - desktop-06-mono-charts.png
   Pure desktop screenshots framed in authentic macOS desktop browser titlebars.
   Zero outside marketing fluff or site text clutter.

2. Hero Carousel Banners (Desktop Only):
   - carousel-slider-desktop-21x9.png (2520x1080, 21:9 Ultrawide)
   - carousel-slider-desktop-16x9.png (1920x1080, 16:9 Full HD)

3. Cover & Update Banners (Desktop Only):
   - app-cover-landscape-16x9.png (1600x900, 16:9)
   - update-banner-v2-16x9.png (1600x900, 16:9)

4. App Icons (1:1):
   - app-icon-512x512.png (512x512 Transparent)
   - app-icon-night-512x512.png (512x512 Cyber Night Squircle)
   - app-icon.svg (Master Vector SVG)
"""

import os
import shutil
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(BASE_DIR, 'public')
SHOWCASE_DIR = os.path.join(BASE_DIR, 'showcase')
RAW_16X9_DIR = os.path.join(SHOWCASE_DIR, '.raw_16x9')
RAW_DESKTOP_DIR = os.path.join(SHOWCASE_DIR, '.raw_desktop')
APP_ICONS_DIR = os.path.join(SHOWCASE_DIR, 'app-icons')
BANNERS_DIR = os.path.join(SHOWCASE_DIR, 'banners')
SCREENSHOTS_DIR = os.path.join(SHOWCASE_DIR, 'screenshots')

os.makedirs(APP_ICONS_DIR, exist_ok=True)
os.makedirs(BANNERS_DIR, exist_ok=True)
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

# macOS System Fonts
FONT_BOLD = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
FONT_TITLE = '/System/Library/Fonts/Supplemental/Futura.ttc'
FONT_TREBUCHET = '/System/Library/Fonts/Supplemental/Trebuchet MS Bold.ttf'
FONT_REGULAR = '/System/Library/Fonts/HelveticaNeue.ttc'

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

def clean_source_icon():
    orig_src = os.path.join(PUBLIC_DIR, 'android-chrome-512x512.png')
    if not os.path.exists(orig_src):
        raise FileNotFoundError(f"{orig_src} not found")
    im = Image.open(orig_src).convert('RGBA')
    arr = np.array(im)
    arr[arr[:, :, 3] <= 10, 3] = 0
    cleaned = Image.fromarray(arr)
    bbox = cleaned.getbbox()
    if bbox:
        cropped = cleaned.crop(bbox)
        w, h = cropped.size
        dim = max(w, h)
        sq = Image.new('RGBA', (int(dim * 1.05), int(dim * 1.05)), (0, 0, 0, 0))
        sq.paste(cropped, ((sq.width - w) // 2, (sq.height - h) // 2), cropped)
        return sq
    return im

def create_cyber_background(w, h, primary_color=(16, 185, 129), secondary_color=(0, 240, 255), tertiary_color=(168, 85, 247)):
    """
    Creates high-tech futuristic gradient background with subtle grid lines
    and smooth Gaussian-blurred ambient nebula spots.
    """
    y, x = np.ogrid[:h, :w]
    cx, cy = w * 0.48, h * 0.5
    max_r = math.hypot(cx, cy)
    r = np.hypot(x - cx, y - cy) / max_r
    t = np.clip(r, 0.0, 1.0) ** 1.65

    red = (10 * (1 - t) + 2 * t).astype(np.uint8)
    green = (15 * (1 - t) + 4 * t).astype(np.uint8)
    blue = (30 * (1 - t) + 10 * t).astype(np.uint8)
    alpha = np.full((h, w), 255, dtype=np.uint8)

    bg = Image.fromarray(np.dstack([red, green, blue, alpha]))
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    grid = max(36, int(min(w, h) / 36))
    for gx in range(0, w, grid):
        draw.line([(gx, 0), (gx, h)], fill=(16, 32, 58, 22), width=1)
    for gy in range(0, h, grid):
        draw.line([(0, gy), (w, gy)], fill=(16, 32, 58, 22), width=1)

    glow_r1 = int(min(w, h) * 0.48)
    draw.ellipse(
        [int(w * 0.72 - glow_r1), int(h * 0.32 - glow_r1),
         int(w * 0.72 + glow_r1), int(h * 0.32 + glow_r1)],
        fill=(*primary_color, 32)
    )

    glow_r2 = int(min(w, h) * 0.42)
    draw.ellipse(
        [int(w * 0.22 - glow_r2), int(h * 0.78 - glow_r2),
         int(w * 0.22 + glow_r2), int(h * 0.78 + glow_r2)],
        fill=(*secondary_color, 28)
    )

    glow_r3 = int(min(w, h) * 0.32)
    draw.ellipse(
        [int(w * 0.52 - glow_r3), int(h * 0.62 - glow_r3),
         int(w * 0.52 + glow_r3), int(h * 0.62 + glow_r3)],
        fill=(*tertiary_color, 24)
    )

    blurred_overlay = overlay.filter(ImageFilter.GaussianBlur(radius=int(min(w, h) * 0.055)))
    return Image.alpha_composite(bg, blurred_overlay)

def create_clean_banner_background(w, h, accent_glow_color=(16, 185, 129), glow_pos=(0.72, 0.50)):
    """
    Creates a disciplined, ultra-clean dark slate backdrop with subtle blueprint grid
    and an elegant ambient backlight centered behind the hero desktop window.
    """
    y, x = np.ogrid[:h, :w]
    cx, cy = w * 0.48, h * 0.5
    max_r = math.hypot(cx, cy)
    r = np.hypot(x - cx, y - cy) / max_r
    t = np.clip(r, 0.0, 1.0) ** 1.65

    # Rich dark slate/obsidian gradient (rgb 9, 13, 22 -> rgb 4, 7, 13)
    red = (9 * (1 - t) + 4 * t).astype(np.uint8)
    green = (14 * (1 - t) + 6 * t).astype(np.uint8)
    blue = (24 * (1 - t) + 12 * t).astype(np.uint8)
    alpha = np.full((h, w), 255, dtype=np.uint8)

    bg = Image.fromarray(np.dstack([red, green, blue, alpha]))
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Subtle grid lines (every 44px)
    grid = max(38, int(min(w, h) / 26))
    for gx in range(0, w, grid):
        draw.line([(gx, 0), (gx, h)], fill=(255, 255, 255, 6), width=1)
    for gy in range(0, h, grid):
        draw.line([(0, gy), (w, gy)], fill=(255, 255, 255, 6), width=1)

    # Single ambient soft glow right behind the hero window
    gx_center = int(w * glow_pos[0])
    gy_center = int(h * glow_pos[1])
    glow_r = int(min(w, h) * 0.55)
    draw.ellipse(
        [gx_center - glow_r, gy_center - glow_r, gx_center + glow_r, gy_center + glow_r],
        fill=(*accent_glow_color, 24)
    )

    blurred_overlay = overlay.filter(ImageFilter.GaussianBlur(radius=int(min(w, h) * 0.07)))
    return Image.alpha_composite(bg, blurred_overlay)

def draw_clean_eyebrow(draw, x, y, text, font, dot_color=(16, 185, 129)):
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    pill_h = max(34, th + 18)
    pill_w = tw + 46

    draw.rounded_rectangle(
        [x, y, x + pill_w, y + pill_h],
        radius=pill_h // 2,
        fill=(15, 23, 42, 230),
        outline=(255, 255, 255, 30),
        width=1
    )
    dot_r = 4
    dot_cy = y + pill_h // 2
    dot_cx = x + 16
    draw.ellipse([dot_cx - dot_r, dot_cy - dot_r, dot_cx + dot_r, dot_cy + dot_r], fill=dot_color)
    draw.text((x + 28, y + (pill_h - th) // 2 - 2), text, font=font, fill=(226, 232, 240))
    return pill_w, pill_h

def draw_unified_feature_pill(draw, x, y, label, font, dot_color=(16, 185, 129)):
    bbox = font.getbbox(label)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    pill_h = max(36, th + 18)
    pill_w = tw + 42

    draw.rounded_rectangle(
        [x, y, x + pill_w, y + pill_h],
        radius=12,
        fill=(15, 23, 42, 220),
        outline=(255, 255, 255, 28),
        width=1
    )
    dot_r = 3
    dot_cy = y + pill_h // 2
    dot_cx = x + 14
    draw.ellipse([dot_cx - dot_r, dot_cy - dot_r, dot_cx + dot_r, dot_cy + dot_r], fill=dot_color)
    draw.text((x + 24, y + (pill_h - th) // 2 - 2), label, font=font, fill=(226, 232, 240))
    return pill_w, pill_h

def draw_terminal_pill(draw, x, y, command, font, prompt_color=(16, 185, 129)):
    bbox = font.getbbox(f"$ {command}")
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    pill_w = tw + 44
    pill_h = max(44, th + 22)

    draw.rounded_rectangle(
        [x, y, x + pill_w, y + pill_h],
        radius=12,
        fill=(8, 12, 22, 240),
        outline=(255, 255, 255, 32),
        width=1
    )
    draw.text((x + 16, y + (pill_h - th) // 2 - 2), "$", font=font, fill=prompt_color)
    draw.text((x + 34, y + (pill_h - th) // 2 - 2), command, font=font, fill=(203, 213, 225))
    return pill_w, pill_h

def create_desktop_browser_mockup(
    raw_path,
    window_w,
    window_h,
    corner_radius=20,
    border_color=(255, 255, 255, 30),
    url="components.elsesourav.com"
):
    """
    Renders a standalone macOS desktop browser window frame around a raw desktop screenshot.
    """
    if not os.path.exists(raw_path):
        raise FileNotFoundError(f"{raw_path} not found")

    screenshot_img = Image.open(raw_path).convert('RGBA')

    titlebar_h = max(38, int(window_h * 0.054))
    border_w = 2

    # 1. Base window canvas
    window = Image.new('RGBA', (window_w, window_h), (0, 0, 0, 0))
    w_draw = ImageDraw.Draw(window)
    w_draw.rounded_rectangle(
        [0, 0, window_w, window_h],
        radius=corner_radius,
        fill=(11, 15, 25, 255)
    )

    # 2. Viewport dimensions & scaling
    viewport_w = window_w - border_w * 2
    viewport_h = window_h - titlebar_h - border_w
    viewport_x = border_w
    viewport_y = titlebar_h

    src_w, src_h = screenshot_img.size
    scale = viewport_w / src_w
    new_w = viewport_w
    new_h = int(src_h * scale)

    resized_sc = screenshot_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    if new_h >= viewport_h:
        cropped_sc = resized_sc.crop((0, 0, viewport_w, viewport_h))
    else:
        scale_h = viewport_h / src_h
        resized_sc = screenshot_img.resize((int(src_w * scale_h), viewport_h), Image.Resampling.LANCZOS)
        cropped_sc = resized_sc.crop((0, 0, viewport_w, viewport_h))

    v_mask = Image.new('L', (viewport_w, viewport_h), 0)
    v_draw = ImageDraw.Draw(v_mask)
    bottom_r = max(4, corner_radius - border_w)
    v_draw.rectangle([0, 0, viewport_w, viewport_h - bottom_r], fill=255)
    v_draw.rounded_rectangle([0, 0, viewport_w, viewport_h], radius=bottom_r, fill=255)

    window.paste(cropped_sc, (viewport_x, viewport_y), v_mask)

    # 3. Titlebar
    t_layer = Image.new('RGBA', (window_w, titlebar_h), (0, 0, 0, 0))
    t_draw = ImageDraw.Draw(t_layer)

    for y_step in range(titlebar_h):
        t_prog = y_step / titlebar_h
        r_col = int(18 * (1 - t_prog * 0.3) + 12 * t_prog)
        g_col = int(24 * (1 - t_prog * 0.3) + 16 * t_prog)
        b_col = int(38 * (1 - t_prog * 0.3) + 26 * t_prog)
        t_draw.line([(0, y_step), (window_w, y_step)], fill=(r_col, g_col, b_col, 255))

    t_mask = Image.new('L', (window_w, titlebar_h), 0)
    tm_draw = ImageDraw.Draw(t_mask)
    tm_draw.rounded_rectangle([0, 0, window_w, window_h], radius=corner_radius, fill=255)

    window_t = Image.new('RGBA', (window_w, window_h), (0, 0, 0, 0))
    window_t.paste(t_layer, (0, 0), t_mask)
    window = Image.alpha_composite(window, window_t)

    # 4. macOS Traffic Lights
    btn_draw = ImageDraw.Draw(window)
    btn_r = max(4, int(titlebar_h * 0.15))
    btn_cy = titlebar_h // 2
    btn_gap = int(btn_r * 2.3)
    start_bx = max(16, int(window_w * 0.024))

    btn_draw.ellipse(
        [start_bx - btn_r, btn_cy - btn_r, start_bx + btn_r, btn_cy + btn_r],
        fill=(255, 95, 86, 255), outline=(224, 73, 66, 255), width=1
    )
    bx2 = start_bx + btn_gap
    btn_draw.ellipse(
        [bx2 - btn_r, btn_cy - btn_r, bx2 + btn_r, btn_cy + btn_r],
        fill=(255, 189, 46, 255), outline=(222, 161, 35, 255), width=1
    )
    bx3 = bx2 + btn_gap
    btn_draw.ellipse(
        [bx3 - btn_r, btn_cy - btn_r, bx3 + btn_r, btn_cy + btn_r],
        fill=(39, 201, 63, 255), outline=(30, 173, 51, 255), width=1
    )

    # 5. Address Bar Pill
    addr_h = max(22, int(titlebar_h * 0.62))
    addr_w = int(window_w * 0.54)
    addr_x = (window_w - addr_w) // 2
    addr_y = (titlebar_h - addr_h) // 2
    addr_r = addr_h // 2

    btn_draw.rounded_rectangle(
        [addr_x, addr_y, addr_x + addr_w, addr_y + addr_h],
        radius=addr_r,
        fill=(9, 13, 22, 230),
        outline=(255, 255, 255, 30),
        width=1
    )

    # Vector Lock Icon
    lock_size = max(8, int(addr_h * 0.42))
    lock_x = addr_x + 14
    lock_y = addr_y + (addr_h - lock_size) // 2
    btn_draw.rounded_rectangle(
        [lock_x, lock_y + lock_size // 3, lock_x + lock_size, lock_y + lock_size],
        radius=2,
        fill=(16, 185, 129, 240)
    )
    shackle_pad = 2
    btn_draw.arc(
        [lock_x + shackle_pad, lock_y, lock_x + lock_size - shackle_pad, lock_y + lock_size * 2 // 3],
        start=180, end=0, fill=(16, 185, 129, 240), width=2
    )

    # URL Text
    font_addr = get_font(FONT_REGULAR, max(11, int(addr_h * 0.45)))
    btn_draw.text(
        (lock_x + lock_size + 8, addr_y + (addr_h - 14) // 2 - 1),
        url,
        font=font_addr,
        fill=(203, 213, 225)
    )

    # Titlebar divider line
    btn_draw.line(
        [(0, titlebar_h), (window_w, titlebar_h)],
        fill=(255, 255, 255, 25),
        width=1
    )

    # 6. Outer Border & Specular highlight
    border_layer = Image.new('RGBA', (window_w, window_h), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(border_layer)
    b_draw.rounded_rectangle(
        [1, 1, window_w - 2, window_h - 2],
        radius=corner_radius,
        outline=border_color,
        width=2
    )
    b_draw.line(
        [(corner_radius, 1), (window_w - corner_radius, 1)],
        fill=(255, 255, 255, 80),
        width=1
    )

    return Image.alpha_composite(window, border_layer)

def paste_mockup_with_smooth_shadow(canvas, element, x, y, pad=120, blur_radius=32, opacity=220):
    """
    Pastes window onto canvas with a generous 120px shadow margin to guarantee zero box clipping.
    """
    ew, eh = element.size
    shadow_box = Image.new('RGBA', (ew + pad * 2, eh + pad * 2), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow_box)
    sdraw.rounded_rectangle(
        [pad + 8, pad + 16, pad + ew - 8, pad + eh + 6],
        radius=26,
        fill=(0, 0, 0, opacity)
    )
    blurred = shadow_box.filter(ImageFilter.GaussianBlur(radius=blur_radius))

    canvas.paste(blurred, (x - pad, y - pad), blurred)
    canvas.paste(element, (x, y), element)

def draw_cta_button(draw, x, y, w, h, text, fill=(16, 185, 129), text_color=(5, 15, 25), font=None):
    """
    Draws a high-contrast pill button with a crisp vector play triangle.
    """
    draw.rounded_rectangle(
        [x, y, x + w, y + h],
        radius=h // 2,
        fill=fill,
        outline=(255, 255, 255, 140),
        width=2
    )
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    arrow_sz = 14
    gap = 14
    total_w = tw + gap + arrow_sz
    start_x = x + (w - total_w) // 2
    ty = y + (h - th) // 2 - 2
    draw.text((start_x, ty), text, font=font, fill=text_color)

    ax = start_x + tw + gap
    ay = y + (h - arrow_sz) // 2
    draw.polygon(
        [(ax, ay), (ax + arrow_sz, ay + arrow_sz // 2), (ax, ay + arrow_sz)],
        fill=text_color
    )

def generate_icons(clean_icon):
    print("Generating ElseSourav App Icons (512x512)...")

    # 1. 512x512 Transparent Icon
    icon_transparent = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    scaled_icon = clean_icon.resize((480, 480), Image.Resampling.LANCZOS)
    icon_transparent.paste(scaled_icon, (16, 16), scaled_icon)
    icon_transparent.save(os.path.join(APP_ICONS_DIR, 'app-icon-512x512.png'), 'PNG')

    # 2. 512x512 Cyber Night App Icon (Seamless Squircle)
    y, x = np.ogrid[:512, :512]
    cx, cy = 256.0, 256.0
    r = np.hypot(x - cx, y - cy) / 362.0
    t = np.clip(r, 0.0, 1.0) ** 1.5
    red = (4 * (1 - t) + 2 * t).astype(np.uint8)
    green = (34 * (1 - t) + 12 * t).astype(np.uint8)
    blue = (23 * (1 - t) + 8 * t).astype(np.uint8)
    alpha = np.full((512, 512), 255, dtype=np.uint8)
    bg_core = Image.fromarray(np.dstack([red, green, blue, alpha]))

    icon_mask = Image.new('L', (512, 512), 0)
    im_draw = ImageDraw.Draw(icon_mask)
    im_draw.rounded_rectangle([0, 0, 512, 512], radius=110, fill=255)

    night_icon = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    night_icon.paste(bg_core, (0, 0), icon_mask)

    border_draw = ImageDraw.Draw(night_icon)
    border_draw.rounded_rectangle([3, 3, 509, 509], radius=108, outline=(16, 185, 129, 210), width=4)
    border_draw.rounded_rectangle([7, 7, 505, 505], radius=104, outline=(0, 240, 255, 90), width=2)

    scaled_logo = clean_icon.resize((430, 430), Image.Resampling.LANCZOS)
    night_icon.paste(scaled_logo, (41, 41), scaled_logo)
    night_icon.save(os.path.join(APP_ICONS_DIR, 'app-icon-night-512x512.png'), 'PNG')

    svg_source = os.path.join(PUBLIC_DIR, 'logo.svg')
    if not os.path.exists(svg_source):
        svg_source = os.path.join(PUBLIC_DIR, 'favicon.svg')
    if os.path.exists(svg_source):
        shutil.copyfile(svg_source, os.path.join(APP_ICONS_DIR, 'app-icon.svg'))

    print("✓ App icons generated successfully.")

# =========================================================================
# 1. 16:9 DESKTOP SCREENSHOTS (1920x1080) - NO OUTSIDE SITE/MARKETING FLUFF
# =========================================================================
def compose_16x9_desktop_screenshot(raw_filename, out_filename, url, border_accent=(16, 185, 129)):
    """
    Renders a pixel-perfect 16:9 desktop application screenshot (1920x1080).
    Features an authentic macOS desktop titlebar (traffic lights & address pill)
    integrated directly onto the native 16:9 desktop view.
    Zero outside promotional text or badges - only the true desktop application.
    """
    raw_path = os.path.join(RAW_16X9_DIR, raw_filename)
    if not os.path.exists(raw_path):
        raise FileNotFoundError(f"{raw_path} not found")

    im = Image.open(raw_path).convert('RGBA')
    w, h = 1920, 1080
    titlebar_h = 44

    canvas = Image.new('RGBA', (w, h), (10, 14, 23, 255))

    # Resize raw 16:9 screenshot into viewport (1920 x 1036)
    viewport_h = h - titlebar_h
    viewport_img = im.resize((w, viewport_h), Image.Resampling.LANCZOS)
    canvas.paste(viewport_img, (0, titlebar_h))

    # Titlebar Layer
    t_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    tdraw = ImageDraw.Draw(t_layer)

    # Sleek dark titlebar gradient
    for y in range(titlebar_h):
        prog = y / titlebar_h
        r = int(18 * (1 - prog * 0.25) + 12 * prog)
        g = int(24 * (1 - prog * 0.25) + 16 * prog)
        b = int(36 * (1 - prog * 0.25) + 26 * prog)
        tdraw.line([(0, y), (w, y)], fill=(r, g, b, 255))

    # macOS Traffic Lights (Red, Yellow, Green)
    btn_r = 6
    btn_cy = titlebar_h // 2
    btn_gap = 20
    bx = 22
    tdraw.ellipse([bx - btn_r, btn_cy - btn_r, bx + btn_r, btn_cy + btn_r], fill=(255, 95, 86), outline=(224, 73, 66), width=1)
    bx += btn_gap
    tdraw.ellipse([bx - btn_r, btn_cy - btn_r, bx + btn_r, btn_cy + btn_r], fill=(255, 189, 46), outline=(222, 161, 35), width=1)
    bx += btn_gap
    tdraw.ellipse([bx - btn_r, btn_cy - btn_r, bx + btn_r, btn_cy + btn_r], fill=(39, 201, 63), outline=(30, 173, 51), width=1)

    # Address bar pill in center
    addr_w = 540
    addr_h = 28
    addr_x = (w - addr_w) // 2
    addr_y = (titlebar_h - addr_h) // 2
    tdraw.rounded_rectangle(
        [addr_x, addr_y, addr_x + addr_w, addr_y + addr_h],
        radius=14,
        fill=(9, 13, 22, 230),
        outline=(255, 255, 255, 30),
        width=1
    )

    # Vector Lock Icon in Address Bar
    tdraw.rounded_rectangle([addr_x + 15, addr_y + 12, addr_x + 23, addr_y + 20], radius=2, fill=border_accent)
    tdraw.arc([addr_x + 16, addr_y + 8, addr_x + 22, addr_y + 14], start=180, end=0, fill=border_accent, width=2)

    font_addr = get_font(FONT_REGULAR, 13)
    tdraw.text((addr_x + 32, addr_y + 7), url, font=font_addr, fill=(185, 195, 215))

    # Divider line under titlebar
    tdraw.line([(0, titlebar_h - 1), (w, titlebar_h - 1)], fill=(255, 255, 255, 25), width=1)

    # Specular outer 1px window border
    tdraw.rectangle([0, 0, w - 1, h - 1], outline=(255, 255, 255, 20), width=1)
    tdraw.line([(0, 0), (w, 0)], fill=(255, 255, 255, 60), width=1)

    final_img = Image.alpha_composite(canvas, t_layer)
    out_path = os.path.join(SCREENSHOTS_DIR, out_filename)
    final_img.save(out_path, 'PNG', optimize=True)
    print(f"✓ Saved 16:9 Desktop Screenshot: {out_filename} (1920x1080)")

def generate_all_16x9_desktop_screenshots():
    print("\n--- Generating Clean 16:9 Desktop Screenshots (1920x1080) ---")

    # 1. Overview & Primitives Matrix
    compose_16x9_desktop_screenshot(
        raw_filename='raw_16x9_01_overview.png',
        out_filename='desktop-01-overview.png',
        url='components.elsesourav.com',
        border_accent=(16, 185, 129)
    )

    # 2. Tactile 3D Suite & Hardware Deck
    compose_16x9_desktop_screenshot(
        raw_filename='raw_16x9_02_tactile.png',
        out_filename='desktop-02-tactile-suite.png',
        url='components.elsesourav.com/?component=tactile-primitives',
        border_accent=(0, 229, 255)
    )

    # 3. Theme Engine & Live Customizer
    compose_16x9_desktop_screenshot(
        raw_filename='raw_16x9_03_theme.png',
        out_filename='desktop-03-theme-engine.png',
        url='components.elsesourav.com/?theme=customizer',
        border_accent=(168, 85, 247)
    )

    # 4. Sonner-Style 3D Kinetic Toast Stack
    compose_16x9_desktop_screenshot(
        raw_filename='raw_16x9_04_toast.png',
        out_filename='desktop-04-toast-stack.png',
        url='components.elsesourav.com/?component=toast',
        border_accent=(244, 63, 94)
    )

    # 5. Precision Image Cropper & Source Modal
    compose_16x9_desktop_screenshot(
        raw_filename='raw_16x9_05_image_crop.png',
        out_filename='desktop-05-image-crop-upload.png',
        url='components.elsesourav.com/?component=image-upload',
        border_accent=(16, 185, 129)
    )

    # 6. Data Analytics & Mono Charts Suite (Custom Cyberpunk Neon Theme)
    compose_16x9_desktop_screenshot(
        raw_filename='raw_16x9_06_charts.png',
        out_filename='desktop-06-mono-charts.png',
        url='components.elsesourav.com/?component=mono-charts&theme=cyberpunk',
        border_accent=(6, 182, 212)
    )

# =========================================================================
# 2. HERO CAROUSEL BANNERS (DESKTOP ONLY)
# =========================================================================
def generate_desktop_carousel_21x9(clean_icon):
    """
    21:9 Ultrawide Desktop Carousel Banner (2520x1080).
    Features a single, prominent, unblocked hero desktop window with disciplined typography and zero rainbow clutter.
    """
    print("\nGenerating 21:9 Ultrawide Desktop Carousel Banner (2520x1080)...")
    w, h = 2520, 1080
    banner = create_clean_banner_background(w, h, accent_glow_color=(16, 185, 129), glow_pos=(0.70, 0.50))
    draw = ImageDraw.Draw(banner)

    font_eyebrow = get_font(FONT_BOLD, 20)
    font_title = get_font(FONT_TITLE, 70)
    font_subtitle = get_font(FONT_TREBUCHET, 32)
    font_body = get_font(FONT_REGULAR, 23)
    font_pill = get_font(FONT_BOLD, 19)
    font_btn = get_font(FONT_BOLD, 22)
    font_code = get_font(FONT_BOLD, 20)

    left_x = 120

    # 1. Eyebrow Badge (Important info at top)
    draw_clean_eyebrow(draw, left_x, 160, "REACT 19 COMPONENT SUITE • 81+ PRODUCTION PRIMITIVES", font_eyebrow)

    # 2. Brand Mark + Main Headline
    icon_sz = 80
    icon_sm = clean_icon.resize((icon_sz, icon_sz), Image.Resampling.LANCZOS)
    banner.paste(icon_sm, (left_x, 235), icon_sm)
    draw.text((left_x + 98, 240), "ES React Components", font=font_title, fill=(255, 255, 255))

    # 3. Subtitle / Value Proposition
    draw.text((left_x, 345), "Tactile 3D Micro-Depth Design System", font=font_subtitle, fill=(52, 211, 153))

    # 4. Description (Concise, high-readability)
    draw.text((left_x, 405), "81+ accessible, battle-tested React 19 primitives with physical sunken wells,", font=font_body, fill=(148, 163, 184))
    draw.text((left_x, 442), "instant CSS theme engine, Sonner kinetic toasts, and zero-runtime Tailwind CSS.", font=font_body, fill=(148, 163, 184))

    # 5. Feature Badges (Single unified styling, no rainbow colors)
    pills = ["81+ Primitives", "Tactile 3D Depth", "Live CSS Theming", "React 19 Native"]
    px = left_x
    py = 505
    for p in pills:
        pw, ph = draw_unified_feature_pill(draw, px, py, p, font_pill)
        px += pw + 16

    # 6. Action Button + Terminal Install Box
    btn_y = 590
    draw_cta_button(draw, left_x, btn_y, 250, 56, "EXPLORE SUITE", fill=(16, 185, 129), text_color=(5, 15, 25), font=font_btn)
    draw_terminal_pill(draw, left_x + 276, btn_y, "npm i @elsesourav/react-ui", font_code)

    # RIGHT: TALLER, GAP-FREE HERO DESKTOP WINDOW (1260 x 820 - Optimal Height & Framing)
    win = create_desktop_browser_mockup(
        os.path.join(RAW_16X9_DIR, 'raw_16x9_01_overview.png'),
        1260, 820,
        corner_radius=22,
        border_color=(255, 255, 255, 30),
        url="components.elsesourav.com"
    )
    win_x = 1140
    win_y = (h - 820) // 2  # 130px, grand vertical framing!
    paste_mockup_with_smooth_shadow(banner, win, win_x, win_y, pad=120, blur_radius=36, opacity=230)

    out_path = os.path.join(BANNERS_DIR, 'carousel-slider-desktop-21x9.png')
    banner.save(out_path, 'PNG', optimize=True)
    print(f"✓ Saved 21:9 Desktop Carousel: {out_path}")

def generate_desktop_carousel_16x9(clean_icon):
    """
    16:9 Full HD Desktop Carousel Banner (1920x1080).
    Features single hero desktop window with balanced, uncluttered space utilization.
    """
    print("Generating 16:9 Desktop Carousel Banner (1920x1080)...")
    w, h = 1920, 1080
    banner = create_clean_banner_background(w, h, accent_glow_color=(16, 185, 129), glow_pos=(0.72, 0.50))
    draw = ImageDraw.Draw(banner)

    font_eyebrow = get_font(FONT_BOLD, 18)
    font_title = get_font(FONT_TITLE, 54)
    font_subtitle = get_font(FONT_TREBUCHET, 27)
    font_body = get_font(FONT_REGULAR, 20)
    font_pill = get_font(FONT_BOLD, 17)
    font_btn = get_font(FONT_BOLD, 20)
    font_code = get_font(FONT_BOLD, 18)

    left_x = 90

    # 1. Eyebrow Badge
    draw_clean_eyebrow(draw, left_x, 190, "REACT 19 & TAILWIND CSS", font_eyebrow)

    # 2. Brand Mark + Title
    icon_sz = 66
    icon_sm = clean_icon.resize((icon_sz, icon_sz), Image.Resampling.LANCZOS)
    banner.paste(icon_sm, (left_x, 255), icon_sm)
    draw.text((left_x + 82, 260), "ES React Components", font=font_title, fill=(255, 255, 255))

    # 3. Subtitle
    draw.text((left_x, 350), "Tactile 3D Depth UI Suite", font=font_subtitle, fill=(52, 211, 153))

    # 4. Description
    draw.text((left_x, 405), "81+ accessible, modular primitives built with physical micro-depth,", font=font_body, fill=(148, 163, 184))
    draw.text((left_x, 437), "instant CSS theme tokens, and zero runtime bloat.", font=font_body, fill=(148, 163, 184))

    # 5. Feature Badges (Single unified styling, 2 rows of 2)
    pills = [
        ("81+ Primitives", "Tactile 3D Depth"),
        ("Sonner Toasts", "Zero Bloat")
    ]
    py = 490
    for row in pills:
        px = left_x
        for p in row:
            pw, ph = draw_unified_feature_pill(draw, px, py, p, font_pill)
            px += pw + 14
        py += ph + 12

    # 6. Action + Terminal
    btn_y = 620
    draw_cta_button(draw, left_x, btn_y, 220, 52, "EXPLORE SUITE", fill=(16, 185, 129), text_color=(5, 15, 25), font=font_btn)
    draw_terminal_pill(draw, left_x + 242, btn_y, "npm i @elsesourav/react-ui", font_code)

    # RIGHT: TALLER, GAP-FREE HERO DESKTOP WINDOW (960 x 740 - Optimal Height & Prominence)
    win = create_desktop_browser_mockup(
        os.path.join(RAW_16X9_DIR, 'raw_16x9_01_overview.png'),
        960, 740,
        corner_radius=20,
        border_color=(255, 255, 255, 30),
        url="components.elsesourav.com"
    )
    win_x = 860
    win_y = (h - 740) // 2  # 170px
    paste_mockup_with_smooth_shadow(banner, win, win_x, win_y, pad=120, blur_radius=34, opacity=230)

    out_path = os.path.join(BANNERS_DIR, 'carousel-slider-desktop-16x9.png')
    banner.save(out_path, 'PNG', optimize=True)
    print(f"✓ Saved 16:9 Desktop Carousel: {out_path}")

# =========================================================================
# 3. STORE COVER & DEVLOG UPDATE BANNERS (DESKTOP ONLY)
# =========================================================================
def generate_landscape_app_cover(clean_icon):
    """
    16:9 Landscape App Cover (1600x900).
    Features single hero desktop window with high-conversion typography and balanced framing.
    """
    print("Generating Landscape App Cover (1600x900 - 16:9)...")
    w, h = 1600, 900
    banner = create_clean_banner_background(w, h, accent_glow_color=(16, 185, 129), glow_pos=(0.72, 0.50))
    draw = ImageDraw.Draw(banner)

    font_eyebrow = get_font(FONT_BOLD, 16)
    font_title = get_font(FONT_TITLE, 45)
    font_subtitle = get_font(FONT_TREBUCHET, 23)
    font_body = get_font(FONT_REGULAR, 17)
    font_pill = get_font(FONT_BOLD, 15)
    font_btn = get_font(FONT_BOLD, 18)
    font_code = get_font(FONT_BOLD, 16)

    left_x = 75

    # 1. Eyebrow Badge
    draw_clean_eyebrow(draw, left_x, 165, "ENTERPRISE UI COMPONENT LIBRARY", font_eyebrow)

    # 2. Brand Mark + Title
    icon_sz = 56
    icon_sm = clean_icon.resize((icon_sz, icon_sz), Image.Resampling.LANCZOS)
    banner.paste(icon_sm, (left_x, 220), icon_sm)
    draw.text((left_x + 70, 225), "ES React Components", font=font_title, fill=(255, 255, 255))

    # 3. Subtitle
    draw.text((left_x, 305), "Modern Tactile Design System", font=font_subtitle, fill=(52, 211, 153))

    # 4. Description
    draw.text((left_x, 350), "81+ battle-tested primitives with physical 3D keycaps,", font=font_body, fill=(148, 163, 184))
    draw.text((left_x, 378), "dynamic HSL theming, and kinetic notifications.", font=font_body, fill=(148, 163, 184))

    # 5. Feature Badges (Single unified styling, 2 rows of 2)
    pills = [
        ("81+ Primitives", "Tactile 3D Depth"),
        ("Live Theming", "Strict TypeScript")
    ]
    py = 430
    for row in pills:
        px = left_x
        for p in row:
            pw, ph = draw_unified_feature_pill(draw, px, py, p, font_pill)
            px += pw + 12
        py += ph + 10

    # 6. Action + Terminal
    btn_y = 545
    draw_cta_button(draw, left_x, btn_y, 200, 48, "EXPLORE SUITE", fill=(16, 185, 129), text_color=(5, 15, 25), font=font_btn)
    draw_terminal_pill(draw, left_x + 218, btn_y, "npm i @elsesourav/react-ui", font_code)

    # RIGHT: TALLER, GAP-FREE HERO DESKTOP WINDOW (820 x 620 - High Prominence)
    win = create_desktop_browser_mockup(
        os.path.join(RAW_16X9_DIR, 'raw_16x9_01_overview.png'),
        820, 620,
        corner_radius=18,
        border_color=(255, 255, 255, 30),
        url="components.elsesourav.com"
    )
    win_x = 710
    win_y = (h - 620) // 2  # 140px
    paste_mockup_with_smooth_shadow(banner, win, win_x, win_y, pad=120, blur_radius=32, opacity=230)

    out_path = os.path.join(BANNERS_DIR, 'app-cover-landscape-16x9.png')
    banner.save(out_path, 'PNG', optimize=True)
    print(f"✓ Saved 16:9 Landscape App Cover: {out_path}")

def generate_update_post_banner(clean_icon):
    """
    16:9 Devlog / Update Banner (1600x900).
    Features single hero desktop window showcasing tactile 3D updates with clean, disciplined typography.
    """
    print("Generating Devlog / Update Banner (1600x900 - 16:9)...")
    w, h = 1600, 900
    banner = create_clean_banner_background(w, h, accent_glow_color=(16, 185, 129), glow_pos=(0.72, 0.50))
    draw = ImageDraw.Draw(banner)

    font_eyebrow = get_font(FONT_BOLD, 16)
    font_title = get_font(FONT_TITLE, 45)
    font_subtitle = get_font(FONT_TREBUCHET, 23)
    font_body = get_font(FONT_REGULAR, 17)
    font_bullet = get_font(FONT_BOLD, 16)
    font_btn = get_font(FONT_BOLD, 18)
    font_code = get_font(FONT_BOLD, 16)

    left_x = 75

    # 1. Eyebrow Badge
    draw_clean_eyebrow(draw, left_x, 150, "RELEASE UPDATE • VERSION 2.0", font_eyebrow)

    # 2. Brand Mark + Title
    icon_sz = 56
    icon_sm = clean_icon.resize((icon_sz, icon_sz), Image.Resampling.LANCZOS)
    banner.paste(icon_sm, (left_x, 205), icon_sm)
    draw.text((left_x + 70, 210), "React UI Suite v2.0", font=font_title, fill=(255, 255, 255))

    # 3. Subtitle
    draw.text((left_x, 285), "Major Design System Evolution", font=font_subtitle, fill=(52, 211, 153))

    # 4. Description
    draw.text((left_x, 330), "Complete tactile micro-depth overhaul with physical sunken wells,", font=font_body, fill=(148, 163, 184))
    draw.text((left_x, 358), "live CSS theme engine, and kinetic toast decks.", font=font_body, fill=(148, 163, 184))

    # 5. Changelog Highlights (Clean, disciplined single-color mint dots)
    changelog = [
        "Physical 3D Tactile Suite with Sunken Wells & Keycaps",
        "Sonner-Style Kinetic Toast Stack with Solid Surfaces",
        "Precision Image Cropper Studio with 21:9 Banners",
        "Live CSS Theme Engine with Real-Time Token Tuning"
    ]
    cy = 405
    for item in changelog:
        draw.ellipse([left_x, cy + 5, left_x + 8, cy + 13], fill=(16, 185, 129))
        draw.text((left_x + 20, cy), item, font=font_bullet, fill=(226, 232, 240))
        cy += 32

    # 6. Action + Terminal
    btn_y = 555
    draw_cta_button(draw, left_x, btn_y, 200, 48, "EXPLORE SUITE", fill=(16, 185, 129), text_color=(5, 15, 25), font=font_btn)
    draw_terminal_pill(draw, left_x + 218, btn_y, "npm i @elsesourav/react-ui@latest", font_code)

    # RIGHT: TALLER, GAP-FREE HERO DESKTOP WINDOW (820 x 620 - High Prominence)
    win = create_desktop_browser_mockup(
        os.path.join(RAW_16X9_DIR, 'raw_16x9_02_tactile.png'),
        820, 620,
        corner_radius=18,
        border_color=(255, 255, 255, 30),
        url="components.elsesourav.com/?component=tactile-buttons"
    )
    win_x = 710
    win_y = (h - 620) // 2  # 140px
    paste_mockup_with_smooth_shadow(banner, win, win_x, win_y, pad=120, blur_radius=32, opacity=230)

    out_path = os.path.join(BANNERS_DIR, 'update-banner-v2-16x9.png')
    banner.save(out_path, 'PNG', optimize=True)
    print(f"✓ Saved 16:9 Devlog Update Banner: {out_path}")

def generate_mobile_carousel_3x4(clean_icon):
    """
    3:4 Portrait Mobile Carousel Banner (1200x1600).
    Features top typography block with a single prominent desktop application window below.
    """
    print("Generating 3:4 Mobile Carousel Banner (1200x1600)...")
    w, h = 1200, 1600
    banner = create_clean_banner_background(w, h, accent_glow_color=(16, 185, 129), glow_pos=(0.50, 0.68))
    draw = ImageDraw.Draw(banner)

    font_eyebrow = get_font(FONT_BOLD, 18)
    font_title = get_font(FONT_TITLE, 56)
    font_subtitle = get_font(FONT_TREBUCHET, 28)
    font_body = get_font(FONT_REGULAR, 21)
    font_pill = get_font(FONT_BOLD, 18)
    font_btn = get_font(FONT_BOLD, 22)
    font_code = get_font(FONT_BOLD, 18)

    left_x = 80

    # 1. Eyebrow Badge
    draw_clean_eyebrow(draw, left_x, 90, "REACT 19 COMPONENT SUITE • 81+ PRIMITIVES", font_eyebrow)

    # 2. Brand Mark + Title
    icon_sz = 72
    icon_sm = clean_icon.resize((icon_sz, icon_sz), Image.Resampling.LANCZOS)
    banner.paste(icon_sm, (left_x, 160), icon_sm)
    draw.text((left_x + 88, 165), "ES React Components", font=font_title, fill=(255, 255, 255))

    # 3. Subtitle
    draw.text((left_x, 260), "Tactile 3D Micro-Depth UI Suite", font=font_subtitle, fill=(52, 211, 153))

    # 4. Description
    draw.text((left_x, 310), "81+ accessible primitives with physical sunken wells,", font=font_body, fill=(148, 163, 184))
    draw.text((left_x, 344), "instant CSS theme tokens, and zero runtime overhead.", font=font_body, fill=(148, 163, 184))

    # 5. Feature Badges (Single unified styling, 2 rows)
    row1 = ["81+ Primitives", "Tactile 3D Depth", "Live Theming"]
    row2 = ["React 19 Native", "Zero Dependencies"]

    py = 405
    for row in [row1, row2]:
        px = left_x
        for p in row:
            pw, ph = draw_unified_feature_pill(draw, px, py, p, font_pill)
            px += pw + 14
        py += ph + 12

    # 6. Action + Terminal
    btn_y = 540
    draw_cta_button(draw, left_x, btn_y, 230, 52, "EXPLORE SUITE", fill=(16, 185, 129), text_color=(5, 15, 25), font=font_btn)
    draw_terminal_pill(draw, left_x + 252, btn_y, "npm i @elsesourav/react-ui", font_code)

    # 7. PROMINENT HERO DESKTOP WINDOW (1040 x 780 - Large, Crisp, Centered)
    win = create_desktop_browser_mockup(
        os.path.join(RAW_16X9_DIR, 'raw_16x9_01_overview.png'),
        1040, 780,
        corner_radius=22,
        border_color=(255, 255, 255, 30),
        url="components.elsesourav.com"
    )
    win_x = (w - 1040) // 2  # 80px, perfectly centered horizontally
    win_y = 660  # leaves 160px bottom margin
    paste_mockup_with_smooth_shadow(banner, win, win_x, win_y, pad=120, blur_radius=36, opacity=230)

    out_path = os.path.join(BANNERS_DIR, 'carousel-slider-mobile-3x4.png')
    banner.save(out_path, 'PNG', optimize=True)
    print(f"✓ Saved 3:4 Mobile Carousel Banner: {out_path}")

def generate_portrait_app_cover_3x4(clean_icon):
    """
    3:4 Portrait App Cover (1200x1600).
    Features tactile 3D hardware deck with clean, disciplined branding.
    """
    print("Generating 3:4 Portrait App Cover (1200x1600)...")
    w, h = 1200, 1600
    banner = create_clean_banner_background(w, h, accent_glow_color=(16, 185, 129), glow_pos=(0.50, 0.68))
    draw = ImageDraw.Draw(banner)

    font_eyebrow = get_font(FONT_BOLD, 18)
    font_title = get_font(FONT_TITLE, 56)
    font_subtitle = get_font(FONT_TREBUCHET, 28)
    font_body = get_font(FONT_REGULAR, 21)
    font_pill = get_font(FONT_BOLD, 18)
    font_btn = get_font(FONT_BOLD, 22)
    font_code = get_font(FONT_BOLD, 18)

    left_x = 80

    # 1. Eyebrow Badge
    draw_clean_eyebrow(draw, left_x, 90, "ENTERPRISE UI COMPONENT LIBRARY", font_eyebrow)

    # 2. Brand Mark + Title
    icon_sz = 72
    icon_sm = clean_icon.resize((icon_sz, icon_sz), Image.Resampling.LANCZOS)
    banner.paste(icon_sm, (left_x, 160), icon_sm)
    draw.text((left_x + 88, 165), "ES React Components", font=font_title, fill=(255, 255, 255))

    # 3. Subtitle
    draw.text((left_x, 260), "Modern Tactile Design System", font=font_subtitle, fill=(52, 211, 153))

    # 4. Description
    draw.text((left_x, 310), "81+ production-ready primitives with physical 3D keycaps,", font=font_body, fill=(148, 163, 184))
    draw.text((left_x, 344), "dynamic HSL theming, and kinetic notifications.", font=font_body, fill=(148, 163, 184))

    # 5. Feature Badges (Single unified styling, 2 rows)
    row1 = ["81+ Primitives", "Tactile 3D Depth", "Live Theming"]
    row2 = ["Strict TypeScript", "Zero Dependencies"]

    py = 405
    for row in [row1, row2]:
        px = left_x
        for p in row:
            pw, ph = draw_unified_feature_pill(draw, px, py, p, font_pill)
            px += pw + 14
        py += ph + 12

    # 6. Action + Terminal
    btn_y = 540
    draw_cta_button(draw, left_x, btn_y, 230, 52, "EXPLORE SUITE", fill=(16, 185, 129), text_color=(5, 15, 25), font=font_btn)
    draw_terminal_pill(draw, left_x + 252, btn_y, "npm i @elsesourav/react-ui", font_code)

    # 7. PROMINENT HERO DESKTOP WINDOW SHOWCASING HARDWARE DECK (1040 x 780)
    win = create_desktop_browser_mockup(
        os.path.join(RAW_16X9_DIR, 'raw_16x9_02_tactile.png'),
        1040, 780,
        corner_radius=22,
        border_color=(255, 255, 255, 30),
        url="components.elsesourav.com/?component=tactile-buttons"
    )
    win_x = (w - 1040) // 2
    win_y = 660
    paste_mockup_with_smooth_shadow(banner, win, win_x, win_y, pad=120, blur_radius=36, opacity=230)

    out_path = os.path.join(BANNERS_DIR, 'app-cover-portrait-3x4.png')
    banner.save(out_path, 'PNG', optimize=True)
    print(f"✓ Saved 3:4 Portrait App Cover: {out_path}")

def main():
    print("=== Starting Generation of Showcase Assets (Desktop & 3:4 Portrait) ===")
    clean_icon = clean_source_icon()

    # 1. 1:1 App Icons
    generate_icons(clean_icon)

    # 2. 16:9 Desktop Application Screenshots (1920x1080)
    generate_all_16x9_desktop_screenshots()

    # 3. Hero Carousel Banners (21:9 Ultrawide & 16:9 Desktop & 3:4 Mobile)
    generate_desktop_carousel_21x9(clean_icon)
    generate_desktop_carousel_16x9(clean_icon)
    generate_mobile_carousel_3x4(clean_icon)

    # 4. Cover & Update Banners (16:9 Landscape & 3:4 Portrait)
    generate_landscape_app_cover(clean_icon)
    generate_portrait_app_cover_3x4(clean_icon)
    generate_update_post_banner(clean_icon)

    print("\n=== All Showcase Assets (Desktop & 3:4 Portrait) Generated Successfully! ===")

if __name__ == '__main__':
    main()
