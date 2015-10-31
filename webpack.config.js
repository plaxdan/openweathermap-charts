module.exports = {
  entry: {
    app: [`${__dirname}/app/js/index.js`],
  },
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js'
  },
  resolve: {
    // Allows us to omit file name extensions when requiring these files
    extensions: [
      '',
      '.css',
      '.js'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
