#!/bin/bash
set -e
mkdir -p dist
cp index.html style.css dist
cp -r node_modules/98.css/dist dist/style98
