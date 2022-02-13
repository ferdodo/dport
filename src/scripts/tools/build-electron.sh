#!/bin/bash
set -e

case $PLATFORM in
	linux)
		npx --no-install electron-builder --publish=never --config electron-builder.yml > $LOG_OUTPUT
		;;
	windows)
		cmd.exe /C "npx --no-install electron-builder --publish=never --config electron-builder.yml"
		;;
esac
