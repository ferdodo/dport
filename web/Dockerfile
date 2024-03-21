FROM node
WORKDIR /dport/web
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=moderate

FROM dport-core
FROM dport-app

FROM node
WORKDIR /dport/web
COPY --from=0 /dport/web/node_modules /dport/web/node_modules
COPY --from=1 /dport/core /dport/core
COPY --from=2 /dport/app /dport/app
COPY . .
CMD npm run start
