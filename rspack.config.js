const path = require('path');
const pkg = require('./package.json');
const {rspack} = require('@rspack/core');
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
	entry: ['./src/umd.ts', './src/styles/orejime.scss'],
	output: {
		filename: 'orejime.js',
		chunkFilename: (pathData) => {
			// strips file names from generated chunk names
			return isDev
				? pathData.chunk.name
				: pathData.chunk.name.replace(/(\-ts|\-index\-ts)$/, '.js');
		},
		path: fullPath('dist'),
		publicPath: 'auto'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				include: fullPath('src'),
				type: 'javascript/auto',
				use: {
					loader: 'builtin:swc-loader',
					options: {
						jsc: {
							externalHelpers: true,
							parser: {
								syntax: 'typescript',
								tsx: true
							}
						}
					}
				}
			},
			{
				test: /\.ya?ml$/,
				use: 'yaml-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				type: 'javascript/auto',
				use: [
					rspack.CssExtractRspackPlugin.loader,
					'css-loader',
					'sass-loader'
				]
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
		// Prevents rspack from splitting anything more than
		// the explicit chunks created from dynamic imports.
		splitChunks: false
	},
	plugins: [
		new rspack.CssExtractRspackPlugin({
			filename: 'orejime.css'
		}),
		new rspack.CopyRspackPlugin({
			patterns: [{from: 'src/styles'}]
		}),
		new rspack.BannerPlugin({
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
