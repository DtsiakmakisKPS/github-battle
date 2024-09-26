const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: './app/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.[contenthash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
            { test: /\.(png|jpg|gif|svg)$/, type: 'asset/resource' }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js']
    },
    mode: isProduction ? 'production' : 'development',
    optimization: {
        minimize: isProduction,
        minimizer: [new TerserPlugin()]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            minify: isProduction ? {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            } : false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ]
};

// Only add GenerateSW plugin in production mode
if (isProduction) {
    config.plugins.push(
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [{
                urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
                handler: 'CacheFirst',
                options: {
                    cacheName: 'images',
                    expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
                    }
                }
            }, {
                urlPattern: /^https:\/\/api\.github\.com\/search\/repositories/,
                handler: 'NetworkFirst',
                options: {
                    cacheName: 'api',
                    expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 5 * 60 // 5 Minutes
                    }
                }
            }]
        })
    );
}

module.exports = config;