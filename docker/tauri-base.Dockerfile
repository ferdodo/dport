from node:lts


# apt dependencies
RUN apt-get update
RUN apt-get install libwebkit2gtk-4.0-dev build-essential curl wget libssl-dev libgtk-3-dev squashfs-tools jq -y


# Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN echo 'source /root/.cargo/env' >> $HOME/.bashrc
RUN rustc --version


WORKDIR /dport
COPY app/package.json /dport
COPY app/npm-shrinkwrap.json /dport
RUN npm install

COPY app /dport
RUN ./scripts/copy-to-dist.sh
RUN ./scripts/build-templates.sh
RUN ./scripts/bundle-js.sh --bundler tauri
RUN ./scripts/tauri-setup.sh
RUN ./scripts/tauri-build.sh
