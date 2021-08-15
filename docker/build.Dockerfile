from dport-base
RUN npm run build
RUN cp /dport/app/src-tauri/target/release/bundle/appimage/dport_*_amd64.AppImage /dport/dport.AppImage
RUN cp /dport/app/src-tauri/target/release/bundle/deb/dport_*_amd64.deb /dport/dport.deb