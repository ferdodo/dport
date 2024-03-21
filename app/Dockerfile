FROM node
WORKDIR /dport/app
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=moderate

FROM dport-core

FROM node
WORKDIR /dport/app
COPY --from=0 /dport/app/node_modules /dport/app/node_modules
COPY --from=1 /dport/core /dport/core
COPY . .
RUN npm run build
