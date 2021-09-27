const path = require("path");

const environment = JSON.stringify(process.env.NODE_ENV) || 'none';

module.exports = {
  mode: environment,
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    // library: {
    //   name: "nextjsUploadcare",
    //   type: "umd",
    // },
  },
  externals: {
    "next/image": "next/image"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ],
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
