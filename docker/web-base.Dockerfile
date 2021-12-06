from node:lts

RUN npm install -g http-server

WORKDIR /dport
COPY src/package.json /dport
COPY src/npm-shrinkwrap.json /dport
RUN npm install

COPY src /dport
RUN ./scripts/copy-to-dist.sh
RUN ./scripts/build-templates.sh
RUN ./scripts/bundle-js.sh --bundler web --design-system win98
