# dport

![demo](/demo.png "Work in progress")

GUI for SSH port forwarding.

## Build with Node.js and Rust

Follow Tauri setup instructions to install Node.js and Rust.

Install `Jq`.

Install node modules.

    ./dport/app$ npm install

Setup this project for tauri

    ./dport/app$ ./scripts/setup-tauri.sh

Build the app (Choose any of the following)

    ./dport/app$ npm run build
    ./dport/app$ npm run build-debug

## Build with Docker and Makefile

Install Docker and Makefile.

Build, and copy to your filesystem.

    ./dport/docker$ make build
    ./dport/docker$ make get_app_image
    ./dport/docker$ make get_deb

AppImage and debs file will be copied into your /tmp folder.