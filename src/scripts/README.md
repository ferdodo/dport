NAME
====

**build.sh** — Builds the project into deb and msi files.

SYNOPSYS
========

build.sh -p (windows|linux) -b (tauri|electron|web) -d (win98|spectre|css)

DESCRIPTION
===========

-v, --verbose

Prints build logs.

-p, --platform (windows|linux)

Platform on which dort is built/build for. When on windows, build.sh require to be launched from WSL to support bash and other linux utilities used in the script. Everything else (node_modules, npm scripts) that you would need to setup must be compatible with Windows, therefore, run through native command line, cmd.exe or PowerShell (build.sh uses cmd.exe to run commands from WSL).

-b, --bundler (tauri|electron|web)

The bundler is the tool used to create executable or installer files (deb, msi). web is a phony bundler that starts a web server used for development.

-d, --design-system (win98|spectre|nes)

Changes the user interface appearance. win98 is a Windows 98 look-alike. Spectre is a lightweight css-only framework. And nes is a framework designed to feel like a retro video games.
