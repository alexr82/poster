const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['@babel/polyfill','./src/index.js'],
    output: {
        path: __dirname+'/dist',
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {
        static: './'
    },
    plugins: [
        new HTMLPlugin({
            fileName: 'index.html',
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
            }
        }
        ]
    }
}