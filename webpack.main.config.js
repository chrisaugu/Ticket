module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/main.js',
  // Put your normal webpack config below here
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json']
  },
  module: {
    rules: require('./webpack.rules')
  }
}