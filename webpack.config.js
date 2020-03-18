module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  devtool: 'source-map',
  module: {
    rules: [
    {
      test: /\.(js|mjs)$/,
      exclude: /(node_modules)/,
      use: { loader: 'babel-loader' }
    }
  ]
  },
  watchOptions: {
    ignored: [/node_modules/],
  },
  devServer: {
    proxy: {
      '/rtc': {
        target: {
          host: "0.0.0.0",
          protocol: 'http:',
          port: 8082,
          ws: true
        },
        pathRewrite: {
          '^/rtc': ''
        }
      }
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
