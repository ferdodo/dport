FROM node:lts

RUN npm install -g http-server

WORKDIR /dport
COPY src/package.json .
COPY src/npm-shrinkwrap.json .
RUN npm install

COPY src /dport
RUN npx --no-install zx ./scripts/build.mjs -v --platform linux --bundler web --design-system win98 -v
