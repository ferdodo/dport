#!/bin/bash
set -e

while [[ $# -gt 0 ]]; do
	case $1 in
		--verbose | -v)
			VERBOSE=true
			shift
			;;

		--bundler)
			case $2 in
				tauri | electron | web)
					BUNDLER=$2
					;;

				*)
					echo "Error: Unknown bundler $2 !"
					exit -1
					;;
			esac

			shift
			shift
			;;

		--design-system)
			case $2 in
				win98 | spectre | nes)
					DESIGN_SYSTEM=$2
					;;

				*)
					echo "Error: Unknown design system $2 !"
					exit -1
					;;
			esac

			shift
			shift
			;;

		--platform)
			case $2 in
				windows | linux)
					PLATFORM=$2
					;;

				*)
					echo "Error: Unknown platform $2 !"
					exit -1
					;;
			esac

			shift
			shift
			;;

		*)
			echo "Error: Unknown parameter $1 !"
			exit -1
			;;
	esac
done

if [ -z "$BUNDLER" ]; then
        echo "Error: bundler must be specified with the --bundler flag !"
        exit -1
fi

if [ -z "$DESIGN_SYSTEM" ]; then
        echo "Error: design system must be specified with the --design-system flag !"
        exit -1
fi

if [ -z "$PLATFORM" ]; then
        echo "Error: platform must be specified with the --platform flag !"
        exit -1
fi

if [ -n "$VERBOSE" ]; then
	ESBUILD_LOG_LEVEL=info
	LOG_OUTPUT=/dev/stdout
	ERR_OUTPUT=/dev/stderr
else
	ESBUILD_LOG_LEVEL=error
	LOG_OUTPUT=/dev/null
	ERR_OUTPUT=/dev/null
fi

export VERBOSE
export ESBUILD_LOG_LEVEL
export LOG_OUTPUT
export ERR_OUTPUT
export BUNDLER
export DESIGN_SYSTEM
export PLATFORM

./scripts/tools/apply-config.sh
./scripts/tools/copy-to-dist.sh
./scripts/tools/build-vue-templates.sh
./scripts/tools/build-templates.sh
./scripts/tools/bundle-js.sh
./scripts/tools/create-version.sh

case $BUNDLER in
	electron)
		./scripts/tools/build-electron-main.sh
		./scripts/tools/build-electron.sh
		;;
	tauri)
		./scripts/tools/tauri-setup.sh
		./scripts/tools/tauri-build.sh
		;;
esac
