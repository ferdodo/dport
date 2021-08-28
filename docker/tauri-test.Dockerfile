from dport-tauri-base
RUN npm outdated
RUN npm audit
RUN npm run build-types 
RUN npm run test