from dport-electron-base
RUN npm run build-electron-main
RUN npm run build-electron
RUN cp /dport/dist/dport-*.AppImage /dport/dport.AppImage
RUN cp /dport/dist/dport-*.deb /dport/dport.deb