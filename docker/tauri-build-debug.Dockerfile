from dport-tauri-base
RUN npm run build-debug-tauri
RUN cp /dport/app/src-tauri/target/debug/bundle/appimage/dport_*_amd64.AppImage /dport/dport.AppImage