module.exports = [
  // Add support for native node modules
  {
    // We're specifying native_modules in the test because the asset relocator loader generates a
    // "fake" .node file which is really a cjs file.
    test: /native_modules[/\\].+\.node$/,
    use: 'node-loader',
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    // test: /\.(m?js|node)$/u,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  // {
  //   // We're specifying native_modules in the test because the asset
  //   // relocator loader generates a "fake" .node file which is really
  //   // a cjs file.
  //   test: /native_modules\/.+\.node$/,
  //   use: 'node-loader',
  // },
  // {
  //   test: /\.(m?js|node)$/,
  //   parser: { amd: false },
  //   use: {
  //     loader: '@vercel/webpack-asset-relocator-loader',
  //     options: {
  //       outputAssetBase: 'native_modules',
  //     },
  //   },
  // },
  {
    test: /\.(js|jsx)$/, // .js and .jsx files
    use: {
      loader: 'babel-loader',
      options: {
        exclude: /node_modules/,
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    },
    // exclude: /node_modules/, // excluding the node_modules folder
  },
  {
    // test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
    test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/,
    use: ['file-loader', 'url-loader'],
  //   loader: "url-loader",
  //   options: { limit: false },
  // },
  // {
  //   test: /\.(png|jpe?g|gif)$/i,
  //   use: [
  //     {
  //       loader: 'file-loader',
  //     },
  //   ],
  },
  {
    test: /\.svg$/,
    use: ['@svgr/webpack', 'url-loader'],
  }
];
