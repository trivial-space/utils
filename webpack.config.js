const {
	resolve
} = require('path')


module.exports = {
	mode: 'production',

	entry: resolve(__dirname, "lib", "index.ts"),

	output: {
		path: resolve(__dirname, "dist"),
		filename: "tvs-utils.js",
		library: 'tvsUtils',
		libraryTarget: "umd"
	},

	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			loader: 'ts-loader',
			options: {
				compilerOptions: {
					"outDir": "",
					"declaration": false
				}
			}
		}]
	},

	resolve: {
		extensions: ['.ts', '.js', '.json'],
		modules: [
			'node_modules',
			resolve(__dirname, "lib")
		]
	}
}
