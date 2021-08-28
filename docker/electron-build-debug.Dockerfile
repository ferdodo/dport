from dport-electron-base
RUN npm run build-electron-main
RUN npm run build-debug-electron
RUN cp /dport/dist/dport-*.AppImage /dport/dport.AppImage