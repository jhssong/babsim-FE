import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '/assets' URL을 'src/assets' 폴더로 매핑
      '/assets': 'src/assets',
    },
  },
});
