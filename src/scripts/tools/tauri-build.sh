#!/bin/bash
set -e

case $PLATFORM in
	linux)
		npx --no-install tauri build > $LOG_OUTPUT 2> $ERR_OUTPUT
		;;
	windows)
		cmd.exe /C "npx --no-install tauri build"
		;;
esac
