const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const webpack = require('webpack');

module.exports = function (env) {
	const bundler = parseBundler(env);
	const target = parseTarget(bundler);

	return {
		mode: "production",
		entry: "./src/index.js",
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "bundle.js"
		},
		plugins: [
			new HtmlWebpackPlugin({ title: "dport" }),
			new webpack.NormalModuleReplacementPlugin(
				/(.*)BUNDLER(\.*)/,
				function (resource) {
					resource.request = resource.request.replace(/BUNDLER/, `${bundler}`);
				}
			)
		],
		module: {
			rules: [
				{
					test: /\.html$/,
					use: ["raw-loader"]
				},
				{
					test: /\.css$/,
					use: ["style-loader", "css-loader"]
				},
				{
					test: /\.(woff|woff2)$/i,
					use: ["file-loader"]
				}
			]
		},
		target,
		resolve: {
			alias: {
				vue$: "vue/dist/vue.esm.js"
			}
		},
		externals: createExternals()
	}
};

function createExternals() {
	const modulesDir = "../node_modules";
	const allowlist = ["vue", "electron"];
	return nodeExternals({ modulesDir, allowlist });
}

function parseBundler (env) {
	const { BUNDLER: bundler } = env;

	switch(bundler){
		case 'tauri':
		case 'electron':
			return bundler;

		case undefined:
			throw new Error('Bundler option was not provided !');

		default:
			throw new Error('Bundler option has incorrect value !');
	}
}

function parseTarget(bundler) {
	switch (bundler) {
		case 'tauri':
			return "web";

		case 'electron':
			return "electron-renderer";

		default:
			throw new Error("Unknown bundler !");
	}
}