const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin')

const pages = ['index', 'setup', 'joystick']

module.exports = {
	mode: 'production',
	entry: pages.reduce((config, page) => {
		config[page] = `./src/js/${page}/index.ts`
		return config
	}, {}),
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	plugins: [new CleanTerminalPlugin()].concat(
		pages.map(
			(page) =>
				new HtmlWebpackPlugin({
					inject: true,
					minify: false,
					template: `./src/${page}.html`,
					filename: `${page}.html`,
					chunks: [page]
				})
		)
	)
}
