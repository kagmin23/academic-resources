import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});
