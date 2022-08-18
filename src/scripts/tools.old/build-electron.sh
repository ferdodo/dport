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


case $PLATFORM in
	linux)
		cp electron-dist/dport.deb dport.deb
		;;
	windows)
		cp electron-dist/dport.msi dport.msi
		;;
esac
