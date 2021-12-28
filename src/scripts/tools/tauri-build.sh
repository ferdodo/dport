#!/bin/bash
set -e

npx --no-install tauri build > $LOG_OUTPUT 2> $ERR_OUTPUT
