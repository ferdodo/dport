from dport-base
RUN npm install
RUN npm outdated
RUN npm audit
COPY src src
RUN npm run --prefix=src/electron-main build-types 
RUN npm run --prefix=src/electron-renderer build-types 
RUN npm run --prefix=src/electron-main build
RUN npm run --prefix=src/electron-renderer build
RUN npm run test