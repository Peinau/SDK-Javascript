const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/'],
    resolve: {
        extensions: ['.js', '.ts'],
    },
    output: {
        path: __dirname,
        filename: './dist/peinau.min.js',
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
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ]
};