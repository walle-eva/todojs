const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'none' : 'source-map',
        watch: true,
        entry: ['./script.js', './css/style.scss'],
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'script.js',
			publicPath: 'auto',
        },
		
		 module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env']
                      }
                   }
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                    ]
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                  },
            ]
        },
		plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            })
        ]
    }

    return config;
}


