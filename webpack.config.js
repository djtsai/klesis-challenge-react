var webpack = require('webpack')
var path = require('path')

var PUBLIC_DIR = path.resolve(__dirname, 'public')
var BUILD_DIR = path.resolve(__dirname, 'public/dist')
var APP_DIR = path.resolve(__dirname, 'src')
var ASSET_DIR = path.resolve(__dirname, 'src/assets')

module.exports = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.json' ]
    },
    module: {
        loaders : [
            {
                test: /\.jsx?/,
                include : APP_DIR,
                loader : 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(jpe?g|png)$/i,
                include: ASSET_DIR,
                loader: 'file-loader'
            }
        ]
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        inline: true,
        contentBase: PUBLIC_DIR
    }
}
