const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const pkg = require('./package.json');
const fullPath = path.resolve.bind(path, __dirname);
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	mode: isDev ? 'development' : 'production',
	devtool: isDev ? 'eval-source-map' : false,
	devServer: {
		port: 3000,
		compress: true,
		static: {
			directory: fullPath('dist')
		}
	},
	entry: ['./src/bootstrap/index.ts', './src/styles/orejime.scss'],
	output: {
		filename: 'orejime.js',
		chunkFilename: (pathData) => {
			// strips file names from generated chunk names
			return pathData.chunk.name.replace(/(\-index\-ts|\-yml)$/, '.js');
		},
		path: fullPath('dist'),
		publicPath: '',
		clean: {
			keep: /example-assets|\.html/
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: fullPath('node_modules/react-modal'),
				use: 'babel-loader'
			},
			{
				test: /\.tsx?$/,
				include: fullPath('src'),
				use: ['babel-loader', 'ts-loader']
			},
			{
				test: /\.ya?ml$/,
				use: 'yaml-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			}
		]
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		alias: {
			react: 'preact/compat',
			'react-dom': 'preact/compat',
			'react-lifecycles-compat': fullPath(
				'src/stubs/react-lifecycles-compat.js'
			)
		}
	},
	optimization: {
		// Prevents webpack from splitting anything more than
		// the explicit chunks created from dynamic imports.
		splitChunks: false
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'orejime.css'
		}),
		new CopyPlugin({
			patterns: [{from: 'src/styles'}]
		}),
		new webpack.BannerPlugin({
			banner:
				pkg.name +
				' v' +
				pkg.version +
				' - ' +
				pkg.license +
				' license, ' +
				'original work Copyright (c) 2018 DPKit, ' +
				'modified work Copyright (c) 2019 Empreinte Digitale, ' +
				'all rights reserved.'
		})
	]
};
