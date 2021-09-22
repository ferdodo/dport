default:

tauri-base:
	docker build -f tauri-base.Dockerfile -t dport-tauri-base ../app

electron-base:
	docker build -f electron-base.Dockerfile -t dport-electron-base ../app

tauri-test: tauri-base
	docker build -f tauri-test.Dockerfile -t dport-tauri-test ../app

electron-test: electron-base
	docker build -f electron-test.Dockerfile -t dport-electron-test ../app

test: electron-test tauri-test

tauri-build: tauri-base 
	docker build -f tauri-build.Dockerfile -t dport-tauri-build ../app

electron-build: electron-base
	docker build -f electron-build.Dockerfile -t dport-electron-build ../app

electron-build-debug: electron-base
	docker build -f electron-build-debug.Dockerfile -t dport-electron-build-debug ../app

tauri-build-debug: tauri-base
	docker build -f tauri-build-debug.Dockerfile -t dport-tauri-build-debug ../app

tauri-get-debug-appimage: tauri-build-debug
	docker run --rm dport-tauri-build-debug cat /dport/dport.AppImage > /tmp/dport.AppImage

electron-get-debug-appimage: electron-build-debug
	docker run --rm dport-electron-build-debug cat /dport/dport.AppImage > /tmp/dport.AppImage

tauri-get-appimage: tauri-build
	docker run --rm dport-tauri-build cat /dport/dport.AppImage > /tmp/dport.AppImage

tauri-get-deb: tauri-build
	docker run --rm dport-tauri-build cat /dport/dport.deb > /tmp/dport.deb

electron-get-appimage: electron-build
	docker run --rm dport-electron-build cat /dport/dport.AppImage > /tmp/dport.AppImage

electron-get-deb: electron-build
	docker run --rm dport-electron-build cat /dport/dport.deb > /tmp/dport.deb

tauri-print-config:
	docker run --rm dport-tauri-base cat /dport/app/src-tauri/tauri.conf.json
	docker run --rm dport-tauri-base npm run tauri info

clean:
	-docker rmi dport-tauri-build-debug
	-docker rmi dport-electron-build-debug
	-docker rmi dport-tauri-build
	-docker rmi dport-electron-build
	-docker rmi dport-tauri-test
	-docker rmi dport-electron-test
	-docker rmi dport-tauri-base
	-docker rmi dport-electron-base