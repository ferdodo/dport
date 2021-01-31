from node
WORKDIR /dport
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
COPY src src
RUN npm run build