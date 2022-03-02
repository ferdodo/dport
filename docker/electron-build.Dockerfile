from dport-electron-base
COPY src /dport
WORKDIR /dport
RUN ./scripts/build.sh --platform linux --bundler electron --design-system win98
