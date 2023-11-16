const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    target: 'web',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            entities: path.resolve(__dirname, 'src/entities/'),
            actions: path.resolve(__dirname, 'src/actions/'),
            plugins: path.resolve(__dirname, 'src/plugins/'),
            states: path.resolve(__dirname, 'src/states/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            css: path.resolve(__dirname, 'src/css/'),
        }
    },
    output: {
        filename: 'drawall.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'drawall',
        libraryTarget:'umd',
        umdNamedDefine: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Example',
            template: 'examples/index.html' })
    ],
    devServer: {
        static: path.join(__dirname, "example"),
        compress: true,
        port: 4000,
    },
};
