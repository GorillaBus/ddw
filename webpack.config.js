module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: "source-map",
  output: {
    path: __dirname + '/dist',
    filename: 'ddw.js'
  }
}
