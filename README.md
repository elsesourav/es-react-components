# ES React Components (`@elsesourav/react-ui`)

> A modular, physical 3D micro-depth React 19 + TypeScript UI component library and interactive documentation showcase website styled with Tailwind CSS and dynamic HSL design tokens.

---

## 📸 Showcase & Platform Presentation Manifest

All assets are generated with pixel-perfect precision following the **ElseSourav Apps [DESKTOP]** specification, strictly framed in pure **16:9 Desktop Application Mode** (`1920 × 1080 px`) with authentic macOS titlebars (traffic light controls, URL address pill) and zero distracting side marketing text. Banners feature deep non-clipped Gaussian drop shadows ($\ge 120$px margin) and two-line typography headers with verified zero window clipping.

### 1. Hero Carousel Banners (Desktop & Mobile)
| Asset File | Ratio | Resolution | Purpose | Preview |
| :--- | :---: | :---: | :--- | :---: |
| [`carousel-slider-desktop-21x9.png`](showcase/banners/carousel-slider-desktop-21x9.png) | 21:9 | 2520 × 1080 | Desktop Hero Ultrawide Banner (Hero Desktop Window & Unified Typography) | [View](showcase/banners/carousel-slider-desktop-21x9.png) |
| [`carousel-slider-desktop-16x9.png`](showcase/banners/carousel-slider-desktop-16x9.png) | 16:9 | 1920 × 1080 | Desktop Hero 16:9 Carousel Banner (Hero Desktop Window & Balanced Space) | [View](showcase/banners/carousel-slider-desktop-16x9.png) |
| [`carousel-slider-mobile-3x4.png`](showcase/banners/carousel-slider-mobile-3x4.png) | 3:4 | 1200 × 1600 | Mobile / Portrait 3:4 Carousel Banner (Desktop App in Centered Viewport) | [View](showcase/banners/carousel-slider-mobile-3x4.png) |

### 2. Cover & Update Banners (Landscape 16:9 & Portrait 3:4)
| Asset File | Ratio | Resolution | Purpose | Preview |
| :--- | :---: | :---: | :--- | :---: |
| [`app-cover-landscape-16x9.png`](showcase/banners/app-cover-landscape-16x9.png) | 16:9 | 1600 × 900 | Landscape Store / Platform Cover (Clean Desktop Window & Cohesive Palette) | [View](showcase/banners/app-cover-landscape-16x9.png) |
| [`app-cover-portrait-3x4.png`](showcase/banners/app-cover-portrait-3x4.png) | 3:4 | 1200 × 1600 | Portrait 3:4 App Cover Card (Tactile Hardware Deck & Centered Viewport) | [View](showcase/banners/app-cover-portrait-3x4.png) |
| [`update-banner-v2-16x9.png`](showcase/banners/update-banner-v2-16x9.png) | 16:9 | 1600 × 900 | Devlog & V2.0 Release Update Banner (Tactile 3D Suite Showcase & Changelog) | [View](showcase/banners/update-banner-v2-16x9.png) |

### 3. Pure 16:9 Desktop Application Screenshots (1920 × 1080)
| Screenshot File | Ratio | Resolution | View / Component Inspected | Titlebar Target |
| :--- | :---: | :---: | :--- | :--- |
| [`desktop-01-overview.png`](showcase/screenshots/desktop-01-overview.png) | 16:9 | 1920 × 1080 | Showcase Dashboard, Component Matrix & Filters | `components.elsesourav.com` |
| [`desktop-02-tactile-suite.png`](showcase/screenshots/desktop-02-tactile-suite.png) | 16:9 | 1920 × 1080 | Physical Hardware Deck, 3D Keycaps & Sunken Wells | `components.elsesourav.com/?component=tactile-buttons` |
| [`desktop-03-theme-engine.png`](showcase/screenshots/desktop-03-theme-engine.png) | 16:9 | 1920 × 1080 | Live Theme Engine & Preset Switcher Drawer | `components.elsesourav.com` |
| [`desktop-04-toast-stack.png`](showcase/screenshots/desktop-04-toast-stack.png) | 16:9 | 1920 × 1080 | Sonner-Style 3D Kinetic Card-Deck Toast Stack | `components.elsesourav.com/?component=toast` |
| [`desktop-05-image-crop-upload.png`](showcase/screenshots/desktop-05-image-crop-upload.png) | 16:9 | 1920 × 1080 | Precision Image Cropper Studio Modal | `components.elsesourav.com/?component=image-upload` |
| [`desktop-06-mono-charts.png`](showcase/screenshots/desktop-06-mono-charts.png) | 16:9 | 1920 × 1080 | Monochrome Data & Analytics Suite (Recharts) | `components.elsesourav.com/?component=mono-charts` |

### 4. Platform App Icons (1:1)
| Icon File | Ratio | Resolution | Style | Preview |
| :--- | :---: | :---: | :--- | :---: |
| [`app-icon-512x512.png`](showcase/app-icons/app-icon-512x512.png) | 1:1 | 512 × 512 | Clean Branded Transparent Icon | [View](showcase/app-icons/app-icon-512x512.png) |
| [`app-icon-night-512x512.png`](showcase/app-icons/app-icon-night-512x512.png) | 1:1 | 512 × 512 | Cyber Night Elevated Chamfer Squircle | [View](showcase/app-icons/app-icon-night-512x512.png) |
| [`app-icon.svg`](showcase/app-icons/app-icon.svg) | Vector | Scalable | Master Vector SVG Emblem | [View](showcase/app-icons/app-icon.svg) |

---

## 🏛️ Ecosystem Purpose & Custom Architecture

**ES React Components (`@elsesourav/react-ui`)** is the primary design system and modular component suite engineered specifically for **[ElseSourav](https://elsesourav.com)** web applications, portals, and platforms.

The library was created to solve three fundamental challenges across ElseSourav projects:
1. **Dynamic Theme Customization**: Complete decoupling of visual styling from hardcoded classes. The entire suite operates on live HSL and elevation CSS custom properties, allowing instant theme switching and custom palette creation without DOM re-renders or CSS-in-JS runtime penalties.
2. **Tactile 3D Micro-Depth**: Bringing physical hardware aesthetics (sunken well depression, specular hairline highlights, tactile push keycaps) to modern flat web interfaces while avoiding noisy, heavy blur artifacts.
3. **Unified Interaction & Accessibility**: Standardizing keyboard navigation, WAI-ARIA compliance, and spring gesture physics across 81+ production-ready primitives.

---

## 🧩 Provenance, Open-Source Foundations & Custom Modifications

To deliver world-class ergonomics, several primitives in this library build upon or adapt concepts from industry-standard open-source foundations. However, **every adapted component has been extensively re-engineered, refactored, and enhanced** to integrate with the ElseSourav design token system and tactile 3D principles:

| Domain / Primitive | Foundational Inspiration | Custom Modifications & Architectural Enhancements |
| :--- | :--- | :--- |
| **Tactile 3D Suite**<br>*(Keycaps, Wells, Tabs)* | Physical Hardware Decks & Skeuomorphic Primitives | Custom-engineered CSS depth tokens (`--shadow-lift`, `--shadow-well`, `--shadow-cap`), active 1.5px translate-y travel physics, and specular 1px hairline highlights. |
| **Theme Engine**<br>*(Presets & Customizer)* | Tailwind CSS & CSS Custom Properties | Re-engineered all 81+ primitives to bind directly to reactive CSS variables (`--primary`, `--background`, `--surface`, `--well`, `--panel`), allowing instantaneous real-time theme shifts without re-rendering. |
| **Kinetic Toast Deck**<br>*(Sonner-Style Stack)* | Sonner Card-Stack Physics | Replaced translucent styling with 100% solid, opaque surfaces (`--panel`), added physical 3D elevation shadows, and implemented multi-dock positioning with rubberband drag inertia. |
| **Image Studio**<br>*(Upload & Crop)* | Standard HTML5 Canvas Croppers | Added direct clipboard paste (`Cmd+V`), customized 21:9 Ultrawide & 16:9 Landscape ratio locks, and designed responsive desktop modal scaling. |
| **Monochrome Charts**<br>*(Recharts Suite)* | Recharts SVG Primitives | Unified Line, Bar, Area, Donut, and Stream charts under a high-contrast minimalist monochrome design that synchronizes automatically with active theme tokens. |
| **Headless Accessibility**<br>*(Dialogs, Overlays)* | Radix UI / WAI-ARIA Patterns | Refactored with strict TypeScript 5.9 typings, native React 19 hooks, and zero heavy external vendor lock-ins. |

---

## 🌐 Publishing & Portfolio Integration (`elsesourav.com`)

For publishing, portfolio displays, and dynamic consumption on **[elsesourav.com](https://elsesourav.com)**, complete structured project data is maintained in [`showcase/publishing_manifest.json`](showcase/publishing_manifest.json).

### Quick Manifest Overview
- **Package Name**: `@elsesourav/react-ui`
- **Documentation Showcase**: `https://components.elsesourav.com`
- **Total Primitives**: 81+ accessible components across 8 categories
- **Base Bundle Runtime**: `< 18 KB`
- **React Compatibility**: `^19.0.0`

---

## 🚀 Features

- **🎨 Dynamic Theming Engine**: Live color pickers and preset switchers (Midnight Space, Clean Light, Cyberpunk Neon, Emerald Matrix, Sunset Glow, Oceanic Abyss). Any color tweak immediately recalculates HSL tokens and refreshes all components in real time.
- **📚 Interactive Showcase & Docs**:
  - Live interactive playground with real-time prop controllers (variants, sizes, states, icons).
  - One-click copyable usage code snippets.
  - Comprehensive Props & API reference tables.
  - Linked CSS variables and theme tokens for each component.
- **🧩 81+ Core Primitives**:
  - **Tactile 3D Suite**: `TactileButton`, `TactileInput`, `TactileTextarea`, `TactileSelect`, `TactileCard`, `TactileTabs`, `TactileBadge`
  - **General**: `Button`, `Badge`, `Avatar`, `ArcadeButton`, `TextLoop`, `SplitFlapText`, `MarkdownRenderer`
  - **Forms & Inputs**: `Input`, `FloatingLabelInput`, `PasswordInput`, `OtpInput`, `TagInput`, `ExpandingSearch`, `Textarea`, `Select`, `Switch`, `SquishSwitch`, `Checkbox`, `QuantityCounter`
  - **Media & Studio**: `ImageUpload`, `ImageCropUpload`, `BlurUpImage`, `Lightbox`, `CardCoverflow`, `CardCarousel`
  - **Surfaces & Layout**: `Card`, `Stat`, `LeaderboardTable`, `TreeView`, `ReorderList`, `LiquidGlassSheet`
  - **Feedback & Overlays**: `Dialog`, `Modal`, `Alert`, `Toast` (Sonner 3D Card Stack), `Spinner`, `MotionLoaders`, `CollapsibleBanner`, `Tooltip`
  - **Data & Charts**: `MonoCharts`, `MonoLineChart`, `MonoBarChart`, `MonoAreaChart`, `MonoDonutChart`, `MonoStreamChart`
  - **AI & Agentic UX**: `AIPromptBar`, `AIApprovalCard`, `AIFineTuneCard`, `AICodeBlock`
- **⚡ Modern Stack**: React 19, TypeScript 5.9, Vite 6, Tailwind CSS 3.4, Lucide Icons.

---

## 🛠️ Quick Start

### 1. Install dependencies

```bash
pnpm install
# or npm install
```

### 2. Start the Interactive Showcase Dev Server

```bash
pnpm dev
```

Open `http://localhost:5173` to explore the live interactive component showcase and theme customizer.

### 3. Build for Production

```bash
pnpm build
```

---

## 🎨 Theme Variables & Design Tokens

Every component consumes CSS custom properties mapped in `tailwind.config.ts`:

```css
:root {
  --primary: 238.7 83.5% 66.7%;
  --background: 240 18% 4.5%;
  --surface: 240 16% 7%;
  --foreground: 0 0% 98%;
  --border: 240 14% 16%;
  --radius: 12px;
}
```

Use the floating **Theme Editor** in the bottom-right corner to test colors dynamically or export custom CSS.

---

## 📦 Component Usage Example

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from 'es-react-components';

export function MyView() {
  return (
    <Card variant="interactive">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary" size="md">
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}
```
