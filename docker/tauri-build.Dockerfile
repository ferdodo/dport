from dport-tauri-base

COPY src /dport
RUN ./scripts/build.sh --platform linux --bundler tauri --design-system win98
