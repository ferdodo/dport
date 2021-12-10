from dport-electron-base
RUN npm audit --audit-level critical
COPY src /dport
RUN ./scripts/copy-to-dist.sh
RUN ./scripts/build-vue-templates.sh
RUN ./scripts/build-templates.sh
RUN ./scripts/bundle-js.sh --bundler electron --design-system win98
RUN npx --no-install tsc --declaration --emitDeclarationOnly
