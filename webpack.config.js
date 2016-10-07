var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
  // devtool: 'eval',
  entry: {
    app: './app/app',
    vendor: [ 'react', 'react-dom', 'immutable' ]
  },
  output: {
    path: 'build',
    filename: '[name].bundle.js',
    publicPath: '/dist/',
    chunkFilename: '[name]-[chunkhash].js'
  },
  devServer: {
    inline: true,
    publicPath: '/build/',
    port: 3000
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    //new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    // new webpack.DefinePlugin({
    //     __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    // })
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')//这是妮第三方库打包生成的文件
    //new ExtractTextPlugin("css/app.css")
  ],
  //devtool: '#cheap-module-eval-source-map',
  eslint: {
    configFile: '.eslintrc'
  },
  /**
   * If need eslint, add it in loaders.
   *
   */
  module: {
      loaders:[
          {
              test: /\.js|.jsx$/,
              loader: 'babel'
          },
          {
            test: /\.jsx$/,
            loader: "eslint-loader"
          },
          {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader","css-loader")
          },
          {
              test: /\.eot|.svg|.ttf|.woff|.woff2$/,
              loader: "file-loader?name=font/[name].[ext]"
          }
      ]
  }
};
