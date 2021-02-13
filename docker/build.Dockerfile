from dport-base
COPY src/lib src/lib
COPY src/electron-main src/electron-main
RUN npm run --prefix=src/electron-main build
COPY src/electron-renderer src/electron-renderer
RUN npm run --prefix=src/electron-renderer build
RUN npx electron-builder