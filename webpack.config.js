"use strict";
const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

const nodeEnv = process.env.NODE_ENV || 'development';

const PORT = 3000;
const publicPath = `http://localhost:${PORT}/`, HOST = publicPath;

const rules = [
  {
    test: /\.(js|jsx)$/,
    include: [ path.resolve(__dirname, "app") ],
    exclude: [ path.resolve(__dirname, "node_modules") ],
    loader: "babel-loader",
  },
  {
    test: /\.css$/,
    include: [ path.resolve(__dirname, "app/css") ],
    use: ["style-loader", "css-loader"]
  }
];

const resolve = {
  extensions: [".js", ".jsx"],
  modules: [
    "node_modules",
    path.resolve(__dirname, "app"),
  ],
  alias: {
    "@": path.resolve(__dirname, "app/css"),
  },
  extensions: [".js", ".json", ".jsx", ".css"],
};

const performance = {
  hints: nodeEnv === 'production' ? "warning" : false,
  maxAssetSize: 200000,
  maxEntrypointSize: 400000,
  assetFilter (assetFilename) {
    return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
  }
};

const devServer = {
  //proxy: {},
  open: true,
  contentBase: path.join(__dirname, "public"),
  compress: true,
  historyApiFallback: true,
  hot: true,
  https: false,
  noInfo: true,
  port: PORT,
  host: "localhost",
  stats: {
    assets: true,
    children: false,
    chunks: true,
    hash: false,
    modules: true,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    colors: {
      green: '\u001b[32m]'
    },
  }
};

const plugins = [
  new HtmlWebpackPlugin({
    title: "react todos",
    template: path.resolve(__dirname, "app/index.tmpl.html"),
    filename: "index.html",
  }),
  new DashboardPlugin({
    port: PORT
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendorReact'],
    minChunks: function(module, count) {
      return /node_modules/.test(module.resource);
    }
  }),
];

if (nodeEnv == 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      }
    }),
    new ExtractTextWebpackPlugin('styles-[hash].css'),
    new webpack.NamedModulesPlugin()
  )
} else {
  plugins.push(
    new ExtractTextWebpackPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  );
}

const output = {
  path: path.resolve(__dirname, "dist"),
  filename: "[name]-[hash].js",
  publicPath: publicPath,
}

module.exports = {
  entry: {
    vendorReact: ['react', 'react-dom'],
    main: "./app",
  },
  output,
  resolve,
  devtool: "source-map",
  context: __dirname,
  target: "web",
  devServer,
  module: {
    rules,
  },
  performance,
  plugins
};
