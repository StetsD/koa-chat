const webpack = require('webpack');
const path = require('path');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HWP = new HtmlWebpackPlugin({
	path: config.paths.public,
	template: `${config.paths.public}/index.html`
});


module.exports = {
	entry: './frontend/index.js',
	devtool: 'cheap-eval-source-map',
	output: {
		path: config.paths.public,
		filename: 'app.bundle.js'
	},
	module:{
		loaders: [
			{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
			{test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
			{test: /\.scss$/, use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]}
		]
	},
	plugins: [
		HWP
	]
};
