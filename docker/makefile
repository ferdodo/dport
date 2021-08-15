default:

base:
	docker build -f base.Dockerfile -t dport-base ../app

test: base
	docker build -f test.Dockerfile -t dport-test ../app

build: base
	docker build -f build.Dockerfile -t dport-build ../app

build-debug-appimage: base
	docker build -f build-debug-appimage.Dockerfile -t dport-build-debug-appimage ../app

get_debug_app_image: build-debug-appimage
	docker run --rm dport-build-debug-appimage cat /dport/dport.AppImage > /tmp/dport.AppImage

get_app_image: build
	docker run --rm dport-build cat /dport/dport.AppImage > /tmp/dport.AppImage

get_deb: build
	docker run --rm dport-build cat /dport/dport.deb > /tmp/dport.deb

print_tauri_config:
	docker run --rm dport-base cat /dport/app/src-tauri/tauri.conf.json
	docker run --rm dport-base npm run tauri info

exec: base
	docker run --rm -ti dport-base /bin/bash

clean:
	-docker rmi dport-build
	-docker rmi dport-build-debug-appimage
	-dport-test