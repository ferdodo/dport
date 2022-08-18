from node:lts

WORKDIR /dport
COPY src/package.json /dport
COPY src/npm-shrinkwrap.json /dport
RUN npm install

COPY src /dport
RUN npx --no-install zx ./scripts/build.mjs -v --platform linux --bundler electron --design-system win98
