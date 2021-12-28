from dport-electron-base
COPY src /dport
WORKDIR /dport
RUN ./scripts/build.sh --platform linux --bundler electron --design-system win98
RUN cp /dport/electron-dist/dport.deb /dport/dport.deb
