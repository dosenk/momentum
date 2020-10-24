const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
  entry: {
    index: ['@babel/polyfill','./src/index.js']
  },
  output: {
    filename: '[name].[contenthash].js',
    path: isDev ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'momentum'),
  },
  devServer: {
    port: 4200,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      // chunks: ['main'],
    }),
    // new HTMLWebpackPlugin({
    //   filename: 'pets.html',
    //   template: './src/pages/pets/pets.html',
    //   chunks: ['petsPage'],
    // }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
    }),
    new CopyPlugin(
      {
      patterns: [
        { from: './src/assets/images/icons', to: './images/icons' },
      ],
    }
    ),
  ],
  module: {
    rules: [
      {
        test: /\.css$/u,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.s[ca]ss$/u,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]',
        //   // outputPath: 'images',
        // },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
            ],
          },
        }
      }
    ],
  },
};
