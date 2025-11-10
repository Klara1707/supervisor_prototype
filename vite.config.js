
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/supervisor_prototype/', // 👈 Required for GitHub Pages
    plugins: [react()],
});
