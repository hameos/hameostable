const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "datatable.css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "data/data.10000.json", to: "data.json" },
        { from: "src/assets/index.html", to: "index.html" },
        { from: "src/assets/script.js", to: "script.js" },
        { from: "src/assets/css/bootstrap.min.css", to: "bootstrap.min.css" },
      ],
    }),
  ],
  experiments: {
    outputModule: true
  },
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'datatable.js',
    library: {
      type: "module",
    },
    assetModuleFilename: '[name][ext]'
  },
  optimization: {
    mangleExports: true,
    minimize: true, // true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: true,
          mangle: true,
          keep_fnames: false,
          keep_classnames: undefined,
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.s?[c|a]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ],
      },
      {
        test: /.(png|jpe?g|gif|svg|ico)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        resolve: {
          extensions: ['', '.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
        }
      },
      // {
      //   test: /.(eot|ttf|woff|woff2)$/,
      //   //exclude: [/images//],
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]'
      //   }
      // },
      // {
    ]
  },
};
