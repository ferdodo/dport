


default:

test:
	docker build -f test.Dockerfile -t dport-test ..

build:
	docker build -f build.Dockerfile -t dport-build ..

get_app_image: build
	docker run --rm dport-build cat /dport/dist/dport-0.3.0.AppImage > ../dport-0.3.0.AppImage
	# Successfully built AppImage.