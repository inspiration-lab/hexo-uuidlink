const path = require('path');
const NodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
    mode: 'production',
    entry: './src/uuidlink.ts',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'uuidlink.js',
    },
    externalsPresets: { node: true },
    module: {
        rules: [{ test: /\.ts$/, exclude: /node_modules/, use: 'ts-loader' }],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [new CleanWebpackPlugin()],
    externals: [NodeExternals()],
};