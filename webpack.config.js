const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('./css/style.css');

module.exports = {
	entry: path.join(__dirname, 'src', 'index'),
	plugins: [
		extractSass
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			include: path.join(__dirname, 'src')
		},
		{
			test: /.s(c|a)ss$/,
			loader: extractSass.extract({
				fallback: 'style-loader',
				use:
				[
					'css-loader',
					'postcss-loader',
					{
						loader: 'sass-loader', options: {
							includePaths: ['node_modules/bulma']
						},
					},
				]
			})
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};
