import HtmlWebPackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./index.html", 
  filename: "./index.html"
});
const processPlugin = new webpack.ProvidePlugin({
  process: 'process/browser.js',
});
const dirname = import.meta.url.split("///")[1].split("/").slice(0, -1).join("/");
export default {
  entry: "./app/src/main.js",
  output: {
    path: path.join(dirname, 'app/dist'),
    filename: "[name].js"
  },
  plugins: [htmlPlugin, processPlugin],
  resolve: {
    fallback: {
      path: dirname + "/node_modules/path-browserify",
      stream: dirname + "/node_modules/stream-browserify",
      http: dirname + "/node_modules/stream-http",
      crypto: dirname + "/node_modules/crypto-browserify",
      zlib: dirname + "/node_modules/browserify-zlib",
      url: dirname + "/node_modules/url/",
      util: dirname + "/node_modules/util/",
      buffer: dirname + "/node_modules/buffer/",
      string_decoder: dirname + "/node_modules/string_decoder/",
      assert: dirname + "/node_modules/assert",
      fs: false
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },{
        test: /\.styl$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "stylus-loader"
          }
        ]
      }
    ]
  }
};