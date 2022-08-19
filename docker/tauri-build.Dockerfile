from dport-tauri-base

COPY src /dport
RUN npx --no-install zx ./scripts/build.mjs --platform linux --bundler tauri --design-system win98
