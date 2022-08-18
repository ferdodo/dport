from dport-electron-base
COPY src /dport
WORKDIR /dport
RUN npx --no-install zx ./scripts/build.mjs --platform linux --bundler electron --design-system win98
