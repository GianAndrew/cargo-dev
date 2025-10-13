import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 8080,
		allowedHosts: ['cargorental.me'],
	},
	plugins: [
		react(),
		tailwindcss(),
		ViteImageOptimizer({
			jpg: {
				quality: 80,
			},
			png: {
				quality: 80,
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	base: '/cargo-dev',
});
