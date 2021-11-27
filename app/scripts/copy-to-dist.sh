#!/bin/bash
set -e
mkdir -p dist
cp index.html style.css dist

mkdir -p dist/style98
cp node_modules/98.css/dist/98.css dist/style98
cp node_modules/98.css/dist/ms_sans_serif.woff2 dist/style98
cp node_modules/98.css/dist/ms_sans_serif_bold.woff2 dist/style98

mkdir -p dist/spectre
cp node_modules/spectre.css/dist/spectre.min.css dist/spectre
cp node_modules/spectre.css/dist/spectre-icons.min.css dist/spectre

mkdir -p dist/tailwind
cp node_modules/tailwindcss/dist/tailwind.min.css dist/tailwind
