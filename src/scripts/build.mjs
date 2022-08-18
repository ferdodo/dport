#!/usr/bin/env zx

import shell from "shelljs";
import assert from "assert/strict";
import { config } from "dotenv";
import { hideBin } from 'yargs/helpers';
import yargs from "yargs";

const { find, cp, mkdir, echo } = shell;


function getOptions(){
	const args = hideBin(process.argv);

	return yargs(args)
		.usage("$0", "Compile vue templates to render functions.")
		.options({
			bundler: {
				type: "string",
				choices: ["web", "electron", "tauri"],
				requiresArg: true,
				description: `
					The bundler is the tool used to create
					executable or installer files (deb, msi).
					web is a phony bundler that starts a web
					server used for development.
				`
			},
			'design-system': {
				type: "string",
				choices: ["win98", "nes", "spectre"],
				requiresArg: true,
				description: `
					Changes the user interface appearance. win98
					is a Windows 98 look-alike. Spectre is a
					lightweight css-only framework. And nes is a
					framework designed to feel like a retro video
					games.
				`
			}
		})
		.parse();
}



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

async function bundleJs(designSystem, bundler) {
	const processOutput = $`
		npx --no-install esbuild --bundle app/index.ts \
			--define:DPORT_WINDOW_WIDTH=${ process.env.DPORT_WINDOW_WIDTH } \
			--define:DPORT_WINDOW_HEIGHT=${ process.env.DPORT_WINDOW_HEIGHT } \
			--define:DPORT_DESIGN_SYSTEM=${ designSystem } \
			--define:DPORT_BUNDLER=${ bundler } \
			--target=chrome80 \
			--external:electron \
			--outfile=dist/bundle.js \
			--sourcemap
	`;

	processOutput.quiet();
	processOutput.stderr.pipe(process.stderr);

	switch(os.platform()) {
		case "linux":
			cp('electron-dist/dport.deb', 'dport.deb');
			break;
		case "win32":
			cp('electron-dist/dport.msi', 'dport.msi');
			break;
	}

	await processOutput;
}

async function verifyTypings() {
	const processOutput = $`npx --no-install tsc`;
	processOutput.quiet();
	processOutput.stdout.pipe(process.stdout);
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

async function buildElectron() {
	const processOutput = $`npx --no-install electron-builder \
		--publish=never \
		--config electron-builder.yml
	`;

	processOutput.quiet();
	processOutput.stdout.pipe(process.stdout);
	processOutput.stderr.pipe(process.stderr);
	await processOutput;
}

async function buildElectionMain() {
	const processOutput = $`npx --no-install esbuild electron-main.ts \
		--bundle \
		--platform=node \
		--external:electron \
		--outfile=dist/main.js
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

const options = await getOptions();
assert(process.env.DPORT_WINDOW_WIDTH);
assert(process.env.DPORT_WINDOW_HEIGHT);

copyToDist();
await buildVueTemplates();
await buildTemplates();
await verifyTypings();
await lintTypescriptFiles();
await bundleJs(options.designSystem, options.bundler);
createVersion();


switch(options.bundler) {
	case "electron":
		await buildElectionMain();
		await buildElectron();
		break;

}
