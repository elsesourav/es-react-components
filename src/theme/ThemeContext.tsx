import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ThemeColors {
  primary: string; // Hex (e.g. #6366f1)
  background: string; // Hex (e.g. #0a0b14)
  surface: string; // Hex (e.g. #111322)
  foreground: string; // Hex (e.g. #fafafa)
  border: string; // Hex (e.g. #1e2238)
  accent: string; // Hex (e.g. #818cf8)
  radius: number; // in pixels (e.g. 12)
}

export type ThemePresetKey =
  | 'midnight'
  | 'minimal-light'
  | 'cyberpunk'
  | 'emerald'
  | 'sunset'
  | 'ocean'
  | 'custom';

export interface ThemePreset {
  name: string;
  isDark: boolean;
  colors: ThemeColors;
}

export const THEME_PRESETS: Record<Exclude<ThemePresetKey, 'custom'>, ThemePreset> = {
  midnight: {
    name: 'Midnight Space',
    isDark: true,
    colors: {
      primary: '#6366f1',
      background: '#0a0b14',
      surface: '#111322',
      foreground: '#fafafa',
      border: '#1e2238',
      accent: '#818cf8',
      radius: 12,
    },
  },
  'minimal-light': {
    name: 'Clean Light',
    isDark: false,
    colors: {
      primary: '#4f46e5',
      background: '#f8fafc',
      surface: '#ffffff',
      foreground: '#0f172a',
      border: '#e2e8f0',
      accent: '#6366f1',
      radius: 10,
    },
  },
  cyberpunk: {
    name: 'Cyberpunk Neon',
    isDark: true,
    colors: {
      primary: '#06b6d4',
      background: '#070913',
      surface: '#0e1224',
      foreground: '#f1f5f9',
      border: '#1a233d',
      accent: '#f43f5e',
      radius: 8,
    },
  },
  emerald: {
    name: 'Emerald Matrix',
    isDark: true,
    colors: {
      primary: '#10b981',
      background: '#06120e',
      surface: '#0b1e17',
      foreground: '#ecfdf5',
      border: '#15382b',
      accent: '#34d399',
      radius: 14,
    },
  },
  sunset: {
    name: 'Sunset Glow',
    isDark: true,
    colors: {
      primary: '#f97316',
      background: '#120b0b',
      surface: '#1d1213',
      foreground: '#fff1f2',
      border: '#331d20',
      accent: '#f43f5e',
      radius: 12,
    },
  },
  ocean: {
    name: 'Oceanic Abyss',
    isDark: true,
    colors: {
      primary: '#0284c7',
      background: '#050f1e',
      surface: '#0b1b34',
      foreground: '#f0f9ff',
      border: '#152e54',
      accent: '#38bdf8',
      radius: 12,
    },
  },
};

// Converts #RRGGBB hex to "H S% L%" string for Tailwind HSL variables
export function hexToHslString(hex: string): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return '0 0% 50%';

  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
}

// Determines if text on this hex should be dark or white for optimal WCAG contrast
export function getContrastTextColor(hex: string): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return '0 0% 100%';

  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  // Relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '240 10% 3.9%' : '0 0% 100%';
}

// Adjust lightness of an HSL string
export function adjustHslLightness(hslStr: string, deltaPercent: number): string {
  const parts = hslStr.split(' ');
  if (parts.length < 3) return hslStr;
  const h = parts[0];
  const s = parts[1];
  let l = parseFloat(parts[2].replace('%', ''));
  l = Math.min(100, Math.max(0, l + deltaPercent));
  return `${h} ${s} ${l.toFixed(1)}%`;
}

export interface ThemeContextType {
  preset: ThemePresetKey;
  setPreset: (preset: ThemePresetKey) => void;
  colors: ThemeColors;
  updateColor: (key: keyof ThemeColors, value: string | number) => void;
  isDark: boolean;
  toggleDark: () => void;
  resetTheme: () => void;
  tactileShadows: boolean;
  setTactileShadows: (active: boolean) => void;
  toggleTactileShadows: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preset, setPresetState] = useState<ThemePresetKey>(() => {
    // Check URL search params first (e.g. ?theme=cyberpunk)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get('theme') as ThemePresetKey;
      if (urlTheme && (urlTheme in THEME_PRESETS || urlTheme === 'custom')) {
        return urlTheme;
      }
    }
    return (localStorage.getItem('es-theme-preset') as ThemePresetKey) || 'midnight';
  });

  const [colors, setColors] = useState<ThemeColors>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get('theme') as ThemePresetKey;
      if (urlTheme && urlTheme in THEME_PRESETS && urlTheme !== 'custom') {
        return THEME_PRESETS[urlTheme].colors;
      }
    }
    const saved = localStorage.getItem('es-theme-colors');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return THEME_PRESETS.midnight.colors;
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get('theme') as ThemePresetKey;
      if (urlTheme && urlTheme in THEME_PRESETS && urlTheme !== 'custom') {
        return THEME_PRESETS[urlTheme].isDark;
      }
    }
    const saved = localStorage.getItem('es-theme-dark');
    return saved !== null ? saved === 'true' : true;
  });

  const [tactileShadows, setTactileShadows] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('es-tactile-shadows');
      if (saved !== null) return saved === 'true';
    }
    return true; // enabled by default
  });

  const applyColorsToDOM = (c: ThemeColors, dark: boolean) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    const primaryHsl = hexToHslString(c.primary);
    const bgHsl = hexToHslString(c.background);
    const surfaceHsl = hexToHslString(c.surface);
    const fgHsl = hexToHslString(c.foreground);
    const borderHsl = hexToHslString(c.border);
    const accentHsl = hexToHslString(c.accent);

    const primaryFgHsl = getContrastTextColor(c.primary);

    // Derived surface & border layers
    const surfaceSubtleHsl = dark
      ? adjustHslLightness(surfaceHsl, -3)
      : adjustHslLightness(surfaceHsl, -4);
    const surfaceElevatedHsl = dark
      ? adjustHslLightness(surfaceHsl, 4)
      : '0 0% 100%';
    const surfaceSunkenHsl = dark
      ? adjustHslLightness(bgHsl, -2)
      : adjustHslLightness(surfaceHsl, -7);

    const borderSubtleHsl = dark
      ? adjustHslLightness(borderHsl, -5)
      : adjustHslLightness(borderHsl, 4);
    const borderStrongHsl = dark
      ? adjustHslLightness(borderHsl, 10)
      : adjustHslLightness(borderHsl, -10);

    root.style.setProperty('--primary', primaryHsl);
    root.style.setProperty('--primary-foreground', primaryFgHsl);
    root.style.setProperty('--ring', primaryHsl);

    root.style.setProperty('--background', bgHsl);
    root.style.setProperty('--foreground', fgHsl);

    root.style.setProperty('--surface', surfaceHsl);
    root.style.setProperty('--surface-subtle', surfaceSubtleHsl);
    root.style.setProperty('--surface-elevated', surfaceElevatedHsl);
    root.style.setProperty('--surface-overlay', surfaceElevatedHsl);
    root.style.setProperty('--surface-sunken', surfaceSunkenHsl);

    root.style.setProperty('--card', surfaceHsl);
    root.style.setProperty('--card-foreground', fgHsl);
    root.style.setProperty('--popover', surfaceElevatedHsl);
    root.style.setProperty('--popover-foreground', fgHsl);

    root.style.setProperty('--border', borderHsl);
    root.style.setProperty('--border-subtle', borderSubtleHsl);
    root.style.setProperty('--border-strong', borderStrongHsl);
    root.style.setProperty('--input', borderHsl);

    root.style.setProperty('--accent', accentHsl);

    root.style.setProperty('--radius', `${c.radius}px`);
    root.style.setProperty('--radius-sm', `${Math.max(4, c.radius - 4)}px`);
    root.style.setProperty('--radius-md', `${Math.max(6, c.radius - 2)}px`);
    root.style.setProperty('--radius-lg', `${c.radius}px`);
    root.style.setProperty('--radius-xl', `${c.radius + 4}px`);
    root.style.setProperty('--radius-2xl', `${c.radius + 8}px`);
  };

  useEffect(() => {
    applyColorsToDOM(colors, isDark);
    document.documentElement.setAttribute('data-tactile-shadows', tactileShadows ? 'true' : 'false');
    localStorage.setItem('es-theme-preset', preset);
    localStorage.setItem('es-theme-colors', JSON.stringify(colors));
    localStorage.setItem('es-theme-dark', String(isDark));
    localStorage.setItem('es-tactile-shadows', String(tactileShadows));

    // Keep URL parameter in sync if present
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('theme', preset);
      window.history.replaceState({}, '', url.toString());
    }
  }, [preset, colors, isDark, tactileShadows]);

  const toggleTactileShadows = () => {
    setTactileShadows((prev) => !prev);
  };

  const setPreset = (newPreset: ThemePresetKey) => {
    setPresetState(newPreset);
    if (newPreset !== 'custom') {
      const p = THEME_PRESETS[newPreset];
      setColors(p.colors);
      setIsDark(p.isDark);
    }
  };

  const updateColor = (key: keyof ThemeColors, value: string | number) => {
    setPresetState('custom');
    setColors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleDark = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark && preset === 'minimal-light') {
      setPreset('midnight');
    } else if (!nextDark && preset === 'midnight') {
      setPreset('minimal-light');
    }
  };

  const resetTheme = () => {
    setPreset('midnight');
  };

  return (
    <ThemeContext.Provider
      value={{
        preset,
        setPreset,
        colors,
        updateColor,
        isDark,
        toggleDark,
        resetTheme,
        tactileShadows,
        setTactileShadows,
        toggleTactileShadows,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
