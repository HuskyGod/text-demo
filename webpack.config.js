"use strict";
const path = require('path');
const fs = require('fs');
const util = require('util');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootDir = __dirname;
const pkg = require('./package.json');

const isDebug = process.env.NODE_ENV !== 'production';
var entry = {
    index: isDebug ? [`webpack-hot-middleware/client?path=http://${pkg.devConfig.host}:${pkg.devConfig.port}/__webpack_hmr`, __dirname + '/src/index.js']
        : __dirname + '/src/index.js'
};
let cssLoader;
let fileLoader = `file-loader?name=[path][name]-[hash:8].[ext]&context=${rootDir}`;

let plugins = [
    new webpack.optimize.CommonsChunkPlugin('lib', isDebug ? '[name].js' : "[name]-[hash:8].js"),
    new ExtractTextPlugin('[name]-[chunkhash:8].css', {
        allChunks: true
    })
];

if (!isDebug) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        }
    }));
    plugins.push(new webpack.optimize.DedupePlugin());
} else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(isDebug ? 'DEV' : 'production')
}));

plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
    chunks: ["lib", 'index']
}));

entry['lib'] = ['react', 'react-dom', 'redux', 'react-redux'];

if (isDebug) {
    cssLoader = [
        'style-loader',
        'css-loader',
    ].join('!');
} else {
    cssLoader = ExtractTextPlugin.extract('style-loader', [
        'css-loader',
    ].join('!'));
}

const alias = {};
["EventPluginHub", "EventConstants", "EventPluginUtils", "EventPropagators",
 "SyntheticUIEvent", "CSSPropertyOperations", "ViewportMetrics"].forEach(function(filename) {
    alias["react/lib/" + filename] = path.join(__dirname, "./node_modules/react-dom/lib", filename);
});

module.exports = {
    entry: entry,
    output: {
        filename: isDebug ? "[name].js" : "[name]-[chunkhash:8].js",
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.(jsx?|es6)$/,
                exclude: /node_modules/,
                query: {
                    cacheDirectory: isDebug,
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: cssLoader
            },
            {
                test: /\.jpe?g$|\.id="titleinput"$|\.png$|\.ico$|\.svg$|\.woff$|\.ttf$|\.eot$/,
                loader: fileLoader
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    resolve: {
        alias: alias
    },
    devtool: isDebug ? 'inline-source-map' : false,
    plugins: plugins,
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true,
        noInfo: false,
        inline: true,
        stats: {colors: true},
        historyApiFallback: true,
        proxy: {
            '/api/*': 'http://127.0.0.1:3000'
        }
    }
};
