const rules = require('./webpack.rules');

rules.push({
  test: /\.(sa|sc|c)ss$/,
  use: ["style-loader", "css-loader", "sass-loader"],
  // test: /\.css$/,
  // use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.json']
  },
  module: {
    rules,
  }
};