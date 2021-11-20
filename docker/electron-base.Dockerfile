from node:lts

WORKDIR /dport
COPY app/package.json /dport
COPY app/npm-shrinkwrap.json /dport
RUN npm install

COPY app /dport
RUN ./scripts/copy-to-dist.sh
RUN ./scripts/build-templates.sh
RUN ./scripts/bundle-js.sh --bundler electron
RUN ./scripts/build-main.sh
RUN ./scripts/build-electron.sh
