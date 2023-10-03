const path = require('path')
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/index.js',
  mode: 'development',
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
        { from: "src/assets/css/bootstrap.min.css.map", to: "bootstrap.min.css.map" },
      ],
    }),
  ],
  devtool: 'source-map',
  devServer: {
    static: './demo',
    host: '127.0.0.1',
    port: 4000,
    hot: true,
  },
  experiments: {
    outputModule: true
  },
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'datatable.js',
    library: {
      type: "module",
    },
    assetModuleFilename: '[name][ext]' // remove this if want filenames as hashes
  },
  module: {
    rules: [
      {
        test: /\.s?[c|a]ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } }, 
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true }}
        ],
        resolve: {
          modules: [
            path.resolve('./src'),
            path.resolve('./scss'),
          ],
        },
        resolve: {
          extensions: ['', '.scss', '.css'],
        },
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
  optimization: {
    // modulesId: "named",
    // mangleExports: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
        minify: TerserPlugin.uglifyJsMinify,
        terserOptions: {
          compress: false,
          mangle: false,
          output: {
            comments: false,
            beautify: true
          }
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
};
