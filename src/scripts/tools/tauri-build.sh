#!/bin/bash
set -e

case $PLATFORM in
	linux)
		npx --no-install tauri build --debug > $LOG_OUTPUT 2> $ERR_OUTPUT
		;;
	windows)
		cmd.exe /C "npx --no-install tauri build"
		;;
esac

cp src-tauri/target/debug/bundle/deb/dport_*_amd64.deb dport.deb
