from dport-base



# tauri setup

# -- generate config
RUN npm run tauri init

# -- merge with personnal settings
COPY tauri.conf.json src-tauri/tauri.conf.json.merge
RUN jq -s '.[0] * .[1]' src-tauri/tauri.conf.json src-tauri/tauri.conf.json.merge > src-tauri/tauri.conf.json.new
RUN mv src-tauri/tauri.conf.json.new src-tauri/tauri.conf.json
RUN rm src-tauri/tauri.conf.json.merge

# -- grab version from package.json
RUN jq -s '[.[0], {package: {version: .[1].version }}] | .[0] * .[1]' src-tauri/tauri.conf.json package.json > src-tauri/tauri.conf.json.new
RUN mv src-tauri/tauri.conf.json.new src-tauri/tauri.conf.json

# -- validate config
RUN npm run tauri info

# -- do a blank build to speedup the real build
RUN mkdir -p /dport/src/app/dist
RUN touch /dport/src/app/dist/index.html
RUN npm run build-tauri

# -- set icon
COPY icon.png icon.png
RUN npm run tauri icon --icon icon.png



# build app
COPY src src
COPY tsconfig.json .
COPY webpack.config.js .
RUN npm run build