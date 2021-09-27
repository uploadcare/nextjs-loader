const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    library: {
      name: "nextjsUploadcare",
      type: "umd",
    },
  },
  externals: {
    react: "react",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
};
