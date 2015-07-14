var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/app.js']
    },
    output: {
        path: './build',
        filename: 'app.bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!' + 'css?sourceMap' + '!sass?sourceMap'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?optional[]=runtime'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'React Deep-Dive'
        })
    ],

    devtool: 'source-map'

};