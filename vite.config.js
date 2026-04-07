import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'build',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Tách vendor libraries thành chunks riêng
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'antd-core': ['antd'],
          'antd-icons': ['@ant-design/icons'],
          'ui-vendor': ['react-icons', 'react-bootstrap-icons'],
          'utils-vendor': ['moment', 'dayjs', 'query-string', 'styled-components'],
          'editor-vendor': ['@tiptap/react', '@tiptap/starter-kit']
        }
      }
    },
    chunkSizeWarningLimit: 1500 // Tăng limit lên 1500 kB cho vendor libraries lớn như antd
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
