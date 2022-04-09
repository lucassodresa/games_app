import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  plugins: [EnvironmentPlugin(['BASE_URL']), svgrPlugin(), react()],
  server: {
    open: true
  }
});
