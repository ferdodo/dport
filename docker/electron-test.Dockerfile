from dport-electron-base
RUN npm audit --audit-level critical
COPY app /dport
RUN ./scripts/copy-to-dist.sh
RUN ./scripts/build-templates.sh
RUN ./scripts/bundle-js.sh --bundler electron
RUN npx --no-install tsc --declaration --emitDeclarationOnly
