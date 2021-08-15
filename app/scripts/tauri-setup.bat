Rem generate config
call npm run tauri init -- --ci || exit /b 1

Rem merge with personnal settings
call npm run --silent -- jq-win -s ".[0] * .[1]" src-tauri/tauri.conf.json tauri.conf.json > tmp.json || exit /b 1
type tmp.json > src-tauri/tauri.conf.json

Rem grab version from package.json
call npm run --silent -- jq-win -s "[.[0], {package: {version: \"v\(.[1].version)\" }}] | .[0] * .[1]" src-tauri/tauri.conf.json package.json > tmp.json || exit /b 1
type tmp.json > src-tauri/tauri.conf.json

Rem set icon
call npm run tauri icon --icon icon.png || exit /b 1

Rem validate config
call npm run tauri info || exit /b 1