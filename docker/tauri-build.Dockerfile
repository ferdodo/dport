from dport-tauri-base

COPY src /dport
RUN ./scripts/build.sh --platform linux --bundler tauri --design-system win98
RUN cp /dport/src-tauri/target/release/bundle/deb/dport_*_amd64.deb /dport/dport.deb
