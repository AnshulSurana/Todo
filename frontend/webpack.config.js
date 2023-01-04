const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-react-loader',
                        options: {
                            limit: 10000,
                            encoding: "base64",
                            // fallback defaults to file-loader
                        }
                    }
                ]
            },
            {
                test: /\.ttf$/,
                loader: "url-loader", // or directly file-loader
                include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html.ejs",
            filename: "./index.html",
            favicon: "./src/assets/favicon.gif"
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        hot: true
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: 'http://localhost:8080/home'
    }
}
