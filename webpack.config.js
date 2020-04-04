module.exports = {
	entry: './index.js',
	mode: 'production', //'development',
	devtool: "source-map",
	output: {
		path: __dirname + '/dist',
		filename: 'ddw.js',
		library: 'ddw'
	}
}
