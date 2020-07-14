const path = require("path");
const nodeExternals = require("webpack-node-externals");
const externals = nodeExternals({ modulesDir: "../node_modules" });

module.exports = {
	mode: "development",
	entry: "./index.js",
	output: {
		path: path.resolve(__dirname),
		filename: "main.js",
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ["ts-loader"],
			},
		],
	},
	target: "electron-main",
	externals,
};
