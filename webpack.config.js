/* eslint-disable */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpack = require('webpack');
const deps = require('./package.json').dependencies;
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: 'https://main.d3asah4ucetr1l.amplifyapp.com/',
  },
  stats: {
    errorDetails: true,
    children: true,
  },
  devServer: {
    port: 3001,

    historyApiFallback: {
      index: '/index.html',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin({
      activeModules: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new ModuleFederationPlugin({
      name: 'SubappOne',
      filename: 'remoteEntry.js',
      exposes: {
        // "./Shell":'./build/src_App_tsx.bundle.js',
        // './Shell': __dirname+'/src/App.tsx',
        './Shell': path.resolve(__dirname, './src/App.tsx'),
        //the shell is not getting exposed properly
        // "./Shell" : path.resolve(__dirname, './build/bundle.js',),
        // "./Shell":'./build/App.tsx',
        // "./Shell": './build/bundle.js',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
      // shared: {
      //   ...deps,
      //   react: { singleton: true, eager: true },
      //   "react-dom": {
      //     singleton: true,
      //     eager: true,

      //   },
      //   "react-router-dom": {
      //     singleton: true,
      //     eager: true,
      //   },
      // },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.json'),
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
};
