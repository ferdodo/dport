#!/bin/bash
set -e

case $PLATFORM in
	linux)
		npx --no-install esbuild electron-main.ts \
			--log-level=$ESBUILD_LOG_LEVEL \
			--bundle \
			--platform=node \
			--external:electron \
			--outfile=dist/main.js
		;;
	windows)
		cmd.exe /C "npx --no-install esbuild electron-main.ts \
			--log-level=$ESBUILD_LOG_LEVEL \
			--bundle \
			--platform=node \
			--external:electron \
			--outfile=dist/main.js"
		;;
esac