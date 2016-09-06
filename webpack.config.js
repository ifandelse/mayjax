const pkg = require( "./package.json" );
const _ = require( "lodash" );
const webpack = require( "webpack" );
const banner = [
	" * <%= pkg.name %> - <%= pkg.description %>",
	" * Author: <%= pkg.author %>",
	" * Version: v<%= pkg.version %>",
	" * Url: <%= pkg.homepage %>",
	" * License(s): <%= pkg.license %>"
].join( "\n" );
const header = _.template( banner )( { pkg } );

module.exports = {
	entry: [ "./src" ],
	output: {
		path: "./lib",
		library: "mayjax",
		libraryTarget: "umd",
		filename: "mayjax.js"
	},
	devtool: "#inline-source-map",
	externals: [
		{
			jquery: true
		}
	],
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				loader: "babel",
				query: {
					presets: [ "es2015-without-strict", "stage-0" ],
					plugins: [ "transform-runtime", "add-module-exports" ]
				}
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin( header )
	]
};
