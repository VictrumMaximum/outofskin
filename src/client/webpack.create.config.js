const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = function createConfig(dir, deploy) { // deploy is a boolean value
    let plugins = [
            // use only the english locale for moment js (english language)
            new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
            new HTMLWebpackPlugin({
                template: "./"+dir+"/index.html"
            }),
            new ExtractTextPlugin("style.css")
        ];

    let devtool = "inline-source-map";

    if (deploy === true) {
        // add plugins to minify bundle size
        const deployPlugins = [
            new webpack.DefinePlugin({ // <-- key to reducing React's size
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin(), //minify everything
            new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
            new ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
            // new BundleAnalyzerPlugin(),
        ];
        plugins = plugins.concat(deployPlugins);

        // disable devtool
        // https://webpack.js.org/configuration/devtool/
        devtool = "";
    }
    return {
        context: __dirname,
        entry: "./"+dir+"/index.tsx",
        output: {
            filename: dir+".bundle.js",
            path: __dirname + "/../../build/server/client/"+dir+"/"
        },
        plugins: plugins,
        // Enable sourcemaps for debugging webpack's output.
        devtool: devtool,

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
                    test: /\.xml$/,
                    loader: 'file-loader',
                    options: {
                        name: './[name].[ext]'
                    }
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/,
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
};
