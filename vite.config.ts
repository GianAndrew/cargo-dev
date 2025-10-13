import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 8080,
		allowedHosts: ['cargo-ix88r.ondigitalocean.app', 'cargorental.me'],
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
	base: '/',
	build: {
		outDir: 'dist',
		sourcemap: true,
		chunkSizeWarningLimit: 1600,
		rollupOptions: {
			output: {
				entryFileNames: 'assets/[name].[hash].js',
				chunkFileNames: 'assets/[name].[hash].js',
				assetFileNames: 'assets/[name].[hash].[ext]',
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
		},
	},
});
