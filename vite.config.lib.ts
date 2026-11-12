import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    dts({
      include: ['src/components/ui', 'src/theme', 'src/lib', 'src/hooks', 'src/index.ts'],
      exclude: ['src/showcase', 'src/main.tsx', 'src/App.tsx'],
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist-lib',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ESReactComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      cssFileName: 'style',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-aria-components',
        'motion',
        'motion/react',
        'lucide-react',
        'recharts',
        'katex',
        'gsap',
        'clsx',
        'tailwind-merge',
        '@hugeicons/react',
        '@hugeicons/core-free-icons',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
