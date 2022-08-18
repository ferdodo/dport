from dport-web-base
COPY src /dport
WORKDIR /dport
RUN npx --no-install zx ./scripts/build.mjs --platform linux --bundler web --design-system win98
RUN cp -r dist/* .
CMD http-server -a 0.0.0.0 .
