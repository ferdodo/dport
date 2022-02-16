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
COPY src/package.json /dport
COPY src/npm-shrinkwrap.json /dport
RUN npm install

COPY src /dport
RUN ./scripts/build.sh -v --platform linux --bundler tauri --design-system win98
