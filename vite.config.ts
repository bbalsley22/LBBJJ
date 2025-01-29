import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/LBBJJ/',
  publicDir: 'public',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    sourcemap: true,
    copyPublicDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          const extType = assetInfo.name.split('.')[1] || '';
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            const dirname = path.dirname(assetInfo.name);
            return dirname === '.' ? `[name][extname]` : `${dirname}/[name][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
