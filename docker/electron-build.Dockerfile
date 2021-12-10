from dport-electron-base
COPY src /dport
WORKDIR /dport
RUN ./scripts/copy-to-dist.sh
RUN ./scripts/build-templates.sh
RUN ./scripts/build-vue-templates.sh
RUN ./scripts/bundle-js.sh --bundler electron --design-system win98
RUN ./scripts/build-main.sh
RUN ./scripts/create-version.sh
RUN ./scripts/build-electron.sh
RUN cp /dport/electron-dist/dport.AppImage /dport/dport.AppImage
RUN cp /dport/electron-dist/dport.deb /dport/dport.deb
