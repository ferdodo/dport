from dport-tauri-base
RUN npm audit --audit-level critical
COPY src /dport
RUN rm node_modules/@tauri-apps/api/window.ts
RUN rm node_modules/@tauri-apps/api/window.d.ts
RUN ./scripts/build.sh --platform linux --bundler tauri --design-system win98
RUN npx --no-install tsc --declaration --emitDeclarationOnly
