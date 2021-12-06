from dport-tauri-base

COPY src /dport
RUN ./scripts/copy-to-dist.sh
RUN ./scripts/build-templates.sh
RUN ./scripts/bundle-js.sh --bundler tauri --design-system win98
RUN ./scripts/tauri-build.sh
RUN ./scripts/create-version.sh
RUN cp /dport/src-tauri/target/release/bundle/appimage/dport_*_amd64.AppImage /dport/dport.AppImage
RUN cp /dport/src-tauri/target/release/bundle/deb/dport_*_amd64.deb /dport/dport.deb
