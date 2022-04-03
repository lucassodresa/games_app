import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgrPlugin from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [eslint(), svgrPlugin(), reactRefresh(), react()],
  server: {
    open: true
  }
});
