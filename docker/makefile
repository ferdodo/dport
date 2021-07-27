


default:

base:
	docker build -f base.Dockerfile -t dport-base ../app

test: base
	docker build -f test.Dockerfile -t dport-test ../app

build: base
	docker build -f build.Dockerfile -t dport-build ../app

get_app_image: build
	docker run --rm dport-build cat /dport/src-tauri/target/release/bundle/appimage/dport_0.5.0_amd64.AppImage > /tmp/dport-0.5.0.AppImage
	# Successfully built AppImage.


get_deb: build
	docker run --rm /dport/src-tauri/target/release/bundle/deb/dport_0.5.0_amd64.deb > /tmp/dport-0.5.0.deb
	# Successfully built deb package.