const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('../../client/webpack.dev.server.config');

const port = 8080;
new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	historyApiFallback: true,
	inline: true,
	hot: true
}).listen(port);
console.log('Listening at port: ' + port);
