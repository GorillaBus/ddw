module.exports = {
	entry: './index.js',
	mode: 'production',
	devtool: "source-map",
	output: {
		path: __dirname + '/dist',
		filename: 'ddw.js',
		library: 'ddw',
		libraryTarget: 'umd',
		globalObject: 'typeof self !== \'undefined\' ? self : this'
	}
}
