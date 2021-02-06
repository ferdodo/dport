from node
RUN apt update
RUN apt install p7zip-full -y
WORKDIR /dport
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install
RUN npm outdated
RUN npm audit
COPY electron-builder.yml electron-builder.yml
RUN ./node_modules/app-builder-bin/linux/x64/app-builder prefetch-tools
RUN ./node_modules/app-builder-bin/linux/x64/app-builder download-electron --configuration=[{\"platform\":\"linux\",\"version\":\"9.1.0\",\"arch\":\"x64\"}]
COPY src src
RUN npm run --prefix=src/electron-main build-types 
RUN npm run --prefix=src/electron-renderer build-types 
RUN npm run build
RUN npm run test