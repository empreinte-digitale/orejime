const path = require('path');
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
	entry: ['./src/migrations/index.ts'],
	output: {
		filename: 'migrations.js',
		path: fullPath('dist/example-assets')
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
							parser: {
								syntax: 'typescript',
								tsx: true
							}
						}
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.ts'],
		fallback: {
			fs: false
		}
	},
	optimization: {
		splitChunks: false
	}
};
