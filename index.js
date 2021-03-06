var extend = require('lodash/extend');
var Backend = require('./backend.js');

module.exports = function() {
	var options = {
		xml: null,
		metatile: 1,
		resolution: 4,
		bufferSize: 128,
		tileSize: 256,
		scale: 1,
		format: 'png',
		interactivity: false,
		autoLoadFonts: true
	};

	for (var i = 0, n = arguments.length; i < n; i++) {
		extend(options, arguments[i]);
	}

	var source;

	/**
	 * Initializes the mapnik datasource.
	 *
	 * @param {TileServer} server
	 * @param {function} callback(err, fn)
	 * @return {void}
	 */
	function initialize(server, callback) {
		source = new Backend(server, options);
		source.initialize(callback);
	}

	/**
	 * Renders a tile and returns the result as a buffer (PNG),
	 * plus the headers that should accompany it.
	 *
	 * @param {TileServer} server
	 * @param {TileRequest} req
	 * @param {function} callback(err, buffer, headers)
	 * @return {void}
	 */
	function serve(server, req, callback) {
		source.getTile(req, callback);
	}

	return {
		name: 'vtile-raster',
		init: initialize,
		serve: serve
	};
};
