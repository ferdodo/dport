const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	mode: "development",
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.js",
	},
	plugins: [new HtmlWebpackPlugin({ title: "dport" })],
	module: {
		rules: [
			{
				test: /\.html$/,
				use: ["raw-loader"],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.ts$/,
				use: ["ts-loader"],
			},
			{
				test: /\.(woff|woff2)$/i,
				use: ["file-loader"],
			},
		],
	},
	target: "electron-renderer",
	resolve: {
		alias: {
			vue$: "vue/dist/vue.esm.js",
		},
	},
	externals: createExternals(),
};

function createExternals() {
	const modulesDir = "../node_modules";
	const allowlist = ["vue", "electron"];
	return nodeExternals({ modulesDir, allowlist });
}
