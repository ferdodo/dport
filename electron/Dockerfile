FROM dport-core
FROM dport-app

FROM node

WORKDIR /dport/electron
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm audit --audit-level=moderate

COPY electron-app-template .

RUN npm run build

COPY --from=0 /dport/core /dport/core
COPY --from=1 /dport/app /dport/app

COPY . .

RUN npm run build


CMD sleep infinity
