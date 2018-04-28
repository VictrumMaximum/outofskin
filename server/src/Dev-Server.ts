const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../../client/webpack.dev.server.config');

const port = 8081;
new WebpackDevServer(webpack(config), {
	// send index.html when route is not found
	historyApiFallback: true,
	inline: true,
	hot: true,
	proxy: {
		"/tourData": "http://localhost:8080"
	}
}).listen(port);
console.log('Listening at port: ' + port);
