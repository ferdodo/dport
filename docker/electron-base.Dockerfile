from node


# apt dependencies
RUN apt update
RUN apt install p7zip-full -y


# node_modules
WORKDIR /dport
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install


# prefetch electron-builder stuff with undocumented procedure (┛✧Д✧)┛彡┻━┻
COPY electron-builder.yml electron-builder.yml
RUN ./node_modules/app-builder-bin/linux/x64/app-builder prefetch-tools
RUN ./node_modules/app-builder-bin/linux/x64/app-builder download-electron --configuration=[{\"platform\":\"linux\",\"version\":\"13.2.1\",\"arch\":\"x64\"}]


# sources
COPY src src
COPY tsconfig.json .
COPY webpack.config.js .
COPY icon.png .
