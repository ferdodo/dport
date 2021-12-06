#!/bin/bash
set -e

npx --no-install esbuild electron-main.ts \
	--bundle \
	--platform=node \
	--external:electron \
	--outfile=dist/main.js
