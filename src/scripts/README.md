
	NAME
		build.sh - Builds the project into deb and msi files.

	SYNOPSYS
		build.sh [-v] --platform PLATFORM --bundler BUNDLER --design-system DESIGN-SYSTEM

	DESCRIPTION
		-v, --verbose
			print build logs

		--platform
			windows, or linux. When on windows, build.sh require to be launched from
			WSL to support bash and other linux utilities used in the script. Everything
			else (node_modules, npm scripts) that you would need to setup must be compatible
			with Windows, therefore, run through native command line, cmd.exe or
			PowerShell (build.sh uses cmd.exe to run commands from WSL - TODO).

		--bundler
			tauri, electron, or web. The bundler is the tool used to create executable or
			installer files (deb, msi). web is a phony bundler that starts a web server
			used for development.

		--design-system
			win98, spectre, or nes. Changes the user interface appearance. win98 is a Windows 98
			look-alike. Spectre is a lightweight css-only framework. And nes is a framework
			designed to feel like a retro video games.
