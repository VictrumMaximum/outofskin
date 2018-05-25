const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../../../client/webpack.dev.server.config');
import * as dataRoutes from "./DataRouters/dataRoutes";

const port = 3001;

const proxy = {};
const keys = Object.keys(dataRoutes);
keys.forEach((key) => {
	proxy[dataRoutes[key]] = "http://localhost:3000"
});

new WebpackDevServer(webpack(config), {
	// send index.html when route is not found
	historyApiFallback: true,
	inline: true,
	hot: true,
	proxy
}).listen(port);
console.log('Listening at port: ' + port);
