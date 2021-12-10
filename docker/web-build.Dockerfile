from dport-web-base
COPY src /dport
WORKDIR /dport
RUN ./scripts/copy-to-dist.sh
RUN ./scripts/build-vue-templates.sh
RUN ./scripts/build-templates.sh
RUN ./scripts/bundle-js.sh --bundler web --design-system win98
RUN ./scripts/create-version.sh
RUN cp -r dist/* .
CMD http-server -a 0.0.0.0 .
