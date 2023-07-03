const path = require("path");

module.exports = {
  entry: "./src/server.js",
  target: "node",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/i,
        loader: "babel-loader",
        exclude: ["/node_modules/"],
      },
    ],
  },
};
