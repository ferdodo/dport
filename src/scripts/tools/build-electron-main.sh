#!/bin/bash
set -e

npx --no-install esbuild electron-main.ts \
	--log-level=$ESBUILD_LOG_LEVEL \
	--bundle \
	--platform=node \
	--external:electron \
	--outfile=dist/main.js
