const path = require('path');

module.exports = {
  mode: 'production',
  watch: true,
  watchOptions: {
    aggregateTimeout: 200, // espera 200ms antes de recompilar
  },
  entry: '/public/js/workflow/codemirror.js',
  output: {
    path: path.resolve(__dirname, 'public/js/workflow'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
