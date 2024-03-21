import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig(({mode}) => ({
	plugins: [svelte()],
	test: {
		environment: 'jsdom',
		alias: [{
			find: /^svelte$/,
			replacement: 'svelte/internal'
		}]
	}
}));
