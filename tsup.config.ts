import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  external: [
    'react',
    'react-dom',
    '@radix-ui/react-accordion',
    '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-icons',
    '@radix-ui/react-select',
    '@radix-ui/react-switch',
    '@radix-ui/react-tabs',
    '@radix-ui/react-toast',
    '@radix-ui/react-toolbar',
    '@radix-ui/react-tooltip',
    'framer-motion',
    'lucide-react'],
});
