from dport-tauri-base
RUN npm audit --audit-level critical
RUN npm run build-types 
RUN npm run test