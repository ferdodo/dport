#!/bin/bash
set -e

npx --no-install esbuild src/electron-main.ts \
	--bundle \
	--platform=node \
	--external:electron \
	--outfile=dist/main.js