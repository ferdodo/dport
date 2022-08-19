default:

tauri-base:
	docker build -f tauri-base.Dockerfile -t dport-tauri-base ..

electron-base:
	docker build -f electron-base.Dockerfile -t dport-electron-base ..

web-base:
	docker build -f web-base.Dockerfile -t dport-web-base ..

electron-test:
	docker build -f electron-test.Dockerfile -t dport-electron-test ..

all: web-base web-build electron-base electron-build tauri-base tauri-build

tauri-build:
	docker build -f tauri-build.Dockerfile -t dport-tauri-build ..
	docker run --rm dport-tauri-build cat /dport/dport.deb > /tmp/dport.deb

electron-build:
	docker build -f electron-build.Dockerfile -t dport-electron-build ..
	docker run --rm dport-electron-build cat /dport/dport.deb > /tmp/dport.deb

web-build:
	docker build -f web-build.Dockerfile -t dport-web-build ..
	-docker stop -t 1 dport-web
	-docker rm dport-web
	docker run --name dport-web -d -p 8080:8080 dport-web-build

clean:
	-docker rmi dport-electron-base
	-docker rmi dport-electron-build
	-docker rmi dport-electron-test
	-docker rmi dport-tauri-base
	-docker rmi dport-tauri-build
	-docker rmi dport-tauri-test
