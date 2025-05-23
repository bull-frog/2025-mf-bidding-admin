import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueDevTools()
	],
	build: {
		outDir: 'docs'
	},
	base: process.env.NODE_ENV === 'production'
		? '/2025-mf-bidding-admin/' // GitHub Pagesのルートパス
		: '/',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		},
	},
})
