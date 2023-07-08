const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pages = ['index', 'setup', 'joystick']
const entry = pages.reduce((config, page) => {
	config[page] = `./src/js/${page}/index.ts`
	return config
}, {})

const cleanTerminalPlugin = new CleanTerminalPlugin()
const copyPlugin = new CopyWebpackPlugin({ patterns: [{ from: 'public' }] })
const htmlPlugins = pages.map((page) => {
	return new HtmlWebpackPlugin({
		inject: true,
		minify: {
			collapseWhitespace: true,
			keepClosingSlash: true,
			removeComments: true,
			removeRedundantAttributes: false,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			useShortDoctype: true
		},
		template: `./src/${page}.html`,
		filename: `${page}.html`,
		chunks: [page]
	})
})

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	entry: entry,
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
	optimization: { splitChunks: { chunks: 'all' } },
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	},
	plugins: [cleanTerminalPlugin, copyPlugin, ...htmlPlugins],
	devServer: {
		port: Number(process.env.PORT) || 3000,
		allowedHosts: 'all',
		client: { webSocketURL: { port: process.env.CLOUDSHELL_ENVIRONMENT ? 443 : undefined } },
		compress: true
	}
}
