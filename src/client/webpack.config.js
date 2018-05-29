const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const modulesConfig = require("./webpack.modules.config");

const siteConfig = {
    context: __dirname,
    entry: "./site/index.tsx",
    output: {
        filename: "site.bundle.js",
        path: __dirname + "/../../build/server/client/site/"
    },
    plugins: [
        new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new BundleAnalyzerPlugin(),
        new HTMLWebpackPlugin({
            template: "./site/index.html"
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.ProvidePlugin({
            React: "React", react: "React", "window.react": "React", "window.React": "React"
        })
    ]
};

const menuConfig = {
    context: __dirname,
    entry: "./menu/index.tsx",
    output: {
        filename: "menu.bundle.js",
        path: __dirname + "/../../build/server/client/menu/"
    },
    plugins: [
        new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new BundleAnalyzerPlugin(),
        new HTMLWebpackPlugin({
            template: "./menu/index.html"
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.ProvidePlugin({
            React: "React", react: "React", "window.react": "React", "window.React": "React"
        })
    ]
};

module.exports = [
    Object.assign({}, modulesConfig, siteConfig),
    Object.assign({}, modulesConfig, menuConfig)
];
