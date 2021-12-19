from node:lts

WORKDIR /dport
COPY src/package.json /dport
COPY src/npm-shrinkwrap.json /dport
RUN npm install

COPY src /dport
RUN ./scripts/apply-config.sh
RUN ./scripts/copy-to-dist.sh
RUN ./scripts/build-vue-templates.sh
RUN ./scripts/build-templates.sh
RUN ./scripts/bundle-js.sh --bundler electron --design-system win98
RUN ./scripts/build-main.sh
RUN ./scripts/build-electron.sh
