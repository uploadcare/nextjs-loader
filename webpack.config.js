const path = require("path");

module.exports = (env) => {
  const mode = env.production ? 'production' : 'development';

  return {
    mode,
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "index.js",
      // library: {
      //   name: "nextjsUploadcare",
      //   type: "umd",
      // },
    },
    externals: {
      "next": "next",
      "react": "react",
      "next/image": "next/image",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"],
    }
  };
};
