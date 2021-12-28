#!/bin/bash
set -e

npx --no-install electron-builder --publish=never --config electron-builder.yml > $LOG_OUTPUT
