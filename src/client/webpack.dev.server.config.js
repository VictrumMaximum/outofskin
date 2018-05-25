const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const siteConfig = {
    context: path.join(__dirname),
    entry: "./site/src/index.tsx",
    output: {
        filename: "site.bundle.js",
        path: __dirname + "/../build/server/client/site/"
    },
    plugins: [
        new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        // new BundleAnalyzerPlugin(),
        new HTMLWebpackPlugin({
            template: "./site/src/index.html"
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.ProvidePlugin({
            React: "React", react: "React", "window.react": "React", "window.React": "React"
        }),
        new webpack.HotModuleReplacementPlugin({})
    ]
};

const menuConfig = {
    context: path.join(__dirname),
    entry: "./menu/src/index.tsx",
    output: {
        filename: "menu.bundle.js",
        path: __dirname + "/../build/server/client/menu/"
    },
    plugins: [
        new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        // new BundleAnalyzerPlugin(),
        new HTMLWebpackPlugin({
            template: "./menu/src/index.html"
        }),
        new ExtractTextPlugin("style.css"),
        new webpack.ProvidePlugin({
            React: "React", react: "React", "window.react": "React", "window.React": "React"
        })
    ]
};

const config = {
    // Enable sourcemaps for debugging webpack's output.
    devtool: "inline-source-map",

    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json", ".css"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.(tsx|ts)$/,
                loader: "ts-loader"
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'style-loader'
                    }],
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    }, {
                        loader: 'less-loader'
                    }]
                })
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
					]
			},
            {
                test: /\.(jpe?g|png|svg|ico)$/,
                loader: 'file-loader',
                options: {
                    name: './images/[name].[ext]'
                }
            },
            {
                test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
				options: {
					name: './fonts/[name].[ext]'
				}
            }

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "axios": "axios",
        "moment": "moment"
    }
};

module.exports = Object.assign({}, config, siteConfig);
