from node


# apt dependencies
RUN apt-get update
RUN apt-get install libwebkit2gtk-4.0-dev build-essential curl wget libssl-dev libgtk-3-dev squashfs-tools jq -y


# Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN echo 'source /root/.cargo/env' >> $HOME/.bashrc
RUN rustc --version


# node_modules
WORKDIR /dport/app
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm install


# tauri setup
COPY scripts scripts
COPY tauri.conf.json .
COPY icon.png .
RUN ./scripts/tauri-setup.sh --build-rust-cache


# sources
COPY src src
COPY tsconfig.json .
COPY webpack.config.js .