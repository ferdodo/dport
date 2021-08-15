# dport

![demo](/demo.png "Work in progress")

GUI for SSH port forwarding.

## Build

Follow Tauri setup instructions to setup your environment.

Install node modules.

    ./dport/app$ npm install

Setup Tauri configuration.

    ./dport/app$ ./scripts/tauri-setup.sh (tauri-setup.bat on Windows)

Build the app.

    ./dport/app$ npm run build

## Build using Docker

Install Docker and Makefile.

This will copy the `.AppImage` or `.deb` files directly in your filesystem in the `/tmp` folder.

    ./dport/docker$ make get_app_image
    ./dport/docker$ make get_deb
