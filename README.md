# ES React Components (`es-react-components`)

> A modular, theme-driven React 19 + TypeScript component library and interactive documentation showcase website styled with Tailwind CSS and dynamic HSL design tokens.

---

## 🚀 Features

- **🎨 Dynamic Theming Engine**: Live color pickers and preset switchers (Midnight Space, Clean Light, Cyberpunk Neon, Emerald Matrix, Sunset Glow, Oceanic Abyss). Any color tweak immediately recalculates HSL tokens and refreshes all components in real time.
- **📚 Interactive Showcase & Docs**:
  - Live interactive playground with real-time prop controllers (variants, sizes, states, icons).
  - One-click copyable usage code snippets.
  - Comprehensive Props & API reference tables.
  - Linked CSS variables and theme tokens for each component.
- **🧩 15+ Core Primitives**:
  - **General**: `Button`, `Badge`, `Avatar`
  - **Forms**: `Input`, `Textarea`, `Select`, `Switch`, `Checkbox`
  - **Surfaces & Layout**: `Card`, `Stat`
  - **Feedback & Overlays**: `Dialog`, `Alert`, `Toast`, `Spinner`, `Skeleton`
  - **Navigation**: `Tabs`
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
