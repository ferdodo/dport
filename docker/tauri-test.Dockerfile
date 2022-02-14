from dport-tauri-base
RUN npm audit --audit-level critical
COPY src /dport
RUN ./scripts/build.sh --platform linux --bundler tauri --design-system win98
RUN npx --no-install tsc --declaration --emitDeclarationOnly
