from dport-web-base
COPY src /dport
WORKDIR /dport
RUN ./scripts/build.sh --platform linux --bundler web --design-system win98
RUN cp -r dist/* .
CMD http-server -a 0.0.0.0 .
