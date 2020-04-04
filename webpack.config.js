var webpack = require('webpack')
var path = require('path')

var PUBLIC_DIR = path.resolve(__dirname, 'public')
var BUILD_DIR = path.resolve(__dirname, 'public/dist')
var APP_DIR = path.resolve(__dirname, 'src')
var ASSET_DIR = path.resolve(__dirname, 'src/assets')

var PROD = process.env.NODE_ENV || 'production'

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
        rules : [
            {
                test: /\.jsx?/,
                include : APP_DIR,
                loader : 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(jpe?g|png)$/i,
                include: ASSET_DIR,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(PROD)
            }
        })
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
        inline: true,
        contentBase: PUBLIC_DIR
    }
}
