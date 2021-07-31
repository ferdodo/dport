const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	mode: "production",
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	plugins: [new HtmlWebpackPlugin({ title: "dport" })],
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
	target: "web",
	resolve: {
		alias: {
			vue$: "vue/dist/vue.esm.js"
		}
	},
	externals: createExternals()
};

function createExternals() {
	const modulesDir = "../node_modules";
	const allowlist = ["vue"];
	return nodeExternals({ modulesDir, allowlist });
}
