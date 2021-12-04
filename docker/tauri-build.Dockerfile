from dport-tauri-base

COPY app /dport
RUN ./scripts/copy-to-dist.sh
RUN ./scripts/build-templates.sh
RUN ./scripts/bundle-js.sh --bundler tauri --design-system win98
RUN ./scripts/tauri-build.sh
RUN ./scripts/create-version.sh
RUN cp /dport/src-tauri/target/debug/bundle/appimage/dport_*_amd64.AppImage /dport/dport.AppImage

