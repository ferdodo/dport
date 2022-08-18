#!/usr/bin/env zx

import shell from "shelljs";
import assert from "assert/strict";
import { config } from "dotenv";

const { find, cp, mkdir, echo } = shell;

function copyToDist() {
	mkdir('-p', 'dist');
	cp('static/*', 'dist');

	mkdir('-p', 'dist/style98');
	cp('node_modules/98.css/dist/98.css', 'dist/style98');
	cp('node_modules/98.css/dist/ms_sans_serif.woff2', 'dist/style98');
	cp('node_modules/98.css/dist/ms_sans_serif_bold.woff2', 'dist/style98');

	mkdir('-p', 'dist/spectre');
	cp('node_modules/spectre.css/dist/spectre.min.css', 'dist/spectre');
	cp('node_modules/spectre.css/dist/spectre-icons.min.css', 'dist/spectre');

	mkdir('-p', 'dist/nes');
	cp('node_modules/nes.css/css/nes.min.css', 'dist/nes');

	mkdir('-p', 'dist/tailwind');
	cp('node_modules/tailwindcss/dist/tailwind.min.css', 'dist/tailwind');
}

async function buildVueTemplates() {
	const templates = find('app')
		.filter(file => file.match("/\\.html$/"));

	function outfile(fileName) {
		return fileName.replace("/\\.html$/", '.js');
	}

	async function buildTemplates(infile, outfile) {
		const processOutput =  $`
			npx --no-install vue-compiler-dom-cli \
				--infile ${ infile } \
				--outfile ${ outfile } \
				--custom-element-regexp dport- \
				--mode module
		`

		processOutput.quiet();
		processOutput.stdout.pipe(process.stdout);
		processOutput.stderr.pipe(process.stderr);
		await processOutput;
	}

	for (const template of templates) {
		await buildTemplates(template, outfile(template));
	}
}

async function buildTemplates() {
	const templates = find('.')
		.filter(file => file.match(/template\.html$/))
		.filter(file => !file.includes('node_modules'));

	function outfile(fileName) {
		return fileName.replace(/\.html$/, '.js');
	}

	async function buildTemplates(infile, outfile) {
		await $`npx --no-install esbuild --loader:.html=text ${ infile } --outfile=${ outfile }`.quiet();
	}

	for (const template of templates) {
		await buildTemplates(template, outfile(template));
	}
}

async function bundleJs() {
	const processOutput = $`
		npx --no-install esbuild --bundle app/index.ts \
			--define:DPORT_WINDOW_WIDTH=${ process.env.DPORT_WINDOW_WIDTH } \
			--define:DPORT_WINDOW_HEIGHT=${ process.env.DPORT_WINDOW_HEIGHT } \
			--define:DPORT_DESIGN_SYSTEM=${ process.env.DPORT_DESIGN_SYSTEM } \
			--target=chrome80 \
			--external:electron \
			--outfile=dist/bundle.js \
			--sourcemap
	`;

	processOutput.quiet();
	processOutput.stderr.pipe(process.stderr);
	await processOutput;
}

async function lintTypescriptFiles() {
	const processOutput = $`
		npx --no-install eslint \
			--max-warnings 0 \
			--parser @typescript-eslint/parser \
			--plugin @typescript-eslint/tslint \
			--config eslintrc.yml \
			--ext .ts .
	`;

	processOutput.quiet();
	processOutput.stdout.pipe(process.stdout);
	processOutput.stderr.pipe(process.stderr);
	await processOutput;
}

function createVersion() {
	echo(`${ new Date().toISOString() }`)
		.toEnd('dist/version');
}

config({ path: 'dport.config.env' });

assert(process.env.DPORT_WINDOW_WIDTH);
assert(process.env.DPORT_WINDOW_HEIGHT);
assert(process.env.DPORT_DESIGN_SYSTEM);

copyToDist();
await buildVueTemplates();
await buildTemplates();
await lintTypescriptFiles();
await bundleJs();
//createVersion();
