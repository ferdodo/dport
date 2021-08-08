# dport

![demo](/demo.png "Work in progress")

GUI for SSH port forwarding.

## Build on Windows

    /!\ This is a work in progress /!\

## Build on Linux

Follow Tauri setup instructions to install Node.js and Rust.

Install `Jq`.

Install node modules.

    ./dport/app$ npm install

Setup this project for tauri

    ./dport/app$ ./scripts/tauri-setup.sh

Build the app (Choose any of the following)

    ./dport/app$ npm run build
    ./dport/app$ npm run build-debug-appimage

## Build on Linux (using Docker)

Install Docker and Makefile.

This will copy the `.AppImage` or `.deb` files directly in your filesystem in the `/tmp` folder.

    ./dport/docker$ make get_debug_app_image
    ./dport/docker$ make get_app_image
    ./dport/docker$ make get_deb
