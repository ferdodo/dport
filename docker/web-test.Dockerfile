from dport-web-base
RUN npm audit --audit-level critical
COPY src /dport
RUN npx --no-install zx ./scripts/build.mjs --platform linux --bundler web --design-system win98
RUN npx --no-install tsc --declaration --emitDeclarationOnly
