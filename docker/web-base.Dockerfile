from node:lts

RUN npm install -g http-server

WORKDIR /dport
COPY src/package.json /dport
COPY src/npm-shrinkwrap.json /dport
RUN npm install

COPY src /dport
RUN ./scripts/build.sh --platform linux --bundler web --design-system win98
