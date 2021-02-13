


default:

base:
	docker build -f base.Dockerfile -t dport-base ../dport

test: base
	docker build -f test.Dockerfile -t dport-test ../dport

build: base
	docker build -f build.Dockerfile -t dport-build ../dport

get_app_image: build
	docker run --rm dport-build cat /dport/dist/dport-0.4.0.AppImage > /tmp/dport-0.4.0.AppImage
	# Successfully built AppImage.


get_deb: build
	docker run --rm dport-build cat /dport/dist/dport-0.4.0.deb > /tmp/dport-0.4.0.deb
	# Successfully built deb package.