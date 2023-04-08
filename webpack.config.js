const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    ]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
        publicPath: 'http://localhost:3000/dist/',
        hotOnly: true,
    },
};
