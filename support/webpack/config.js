/* eslint-disable import/no-commonjs */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const NamedModulesPlugin = webpack.NamedModulesPlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const IS_PROD = process.env.NODE_ENV === 'production';
const IS_DEV = !IS_PROD;

const config = {
    entry: ['react-hot-loader/patch', './examples/index.js'],
    output: {
        path: path.resolve(__dirname, '../../build'),
        filename: '[name]-[hash].js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './examples',
        publicPath: '/',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'source-map-loader',
                enforce: 'pre'
            },
            {
                test: /\.js?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        forceEnv: 'webpack'
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Slate Sensible',
            template: HtmlWebpackTemplate,
            inject: false,
            scripts: ['https://cdn.polyfill.io/v2/polyfill.min.js'],
            links: [
                'https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&subset=latin-ext',
                'https://fonts.googleapis.com/icon?family=Material+Icons'
            ]
        }),
        IS_PROD && new UglifyJSPlugin({ sourceMap: true }),
        IS_DEV && new NamedModulesPlugin(),
        IS_DEV && new HotModuleReplacementPlugin()
    ].filter(Boolean)
};

module.exports = config;
