const webpack = require('webpack');
const path = require('path');
const WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;

module.exports = function (env) {

    let settings = (function () {

        if (env.debug) {
            return {
                devtool: "source-map",
                plugins: [
                    new WebpackBundleSizeAnalyzerPlugin('./dist/plain-report.txt')
                ]
            };
        }

        if (env.production) {
            return {
                output: {
                    filename: './dist/peinau.min.js'
                },
                plugins: [
                    new webpack.optimize.UglifyJsPlugin({
                        parallel: true,
                        minimize: true
                    }),
                    new WebpackBundleSizeAnalyzerPlugin('./dist/plain-report.txt')
                ]
            };
        }

        return {};
    })();


    var config = Object.assign({
            entry: ['babel-polyfill', './src/'],
            resolve: {
                extensions: ['.js', '.ts'],
                alias: {
                    joi: 'joi-browser'
                }
            },
            output: {
                path: __dirname,
                filename: './dist/peinau.js',
                library: 'Peinau'
            },
            module: {
                // Webpack doesn't understand TypeScript files and a loader is needed.
                // `node_modules` folder is excluded in order to prevent problems with
                // the library dependencies, as well as `__tests__` folders that
                // contain the tests for the library
                loaders: [{
                    test: /\.ts$/,
                    loaders: ['babel-loader', 'ts-loader'],
                    exclude: [
                        /node_modules/
                    ]
                }]
            }
        },
        settings
    );

    return config;
};