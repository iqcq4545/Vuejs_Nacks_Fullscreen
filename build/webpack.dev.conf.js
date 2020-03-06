
const utils = require('./utils')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    publicPath: config.publicPathDev
  },
  optimization: {
    minimize: false
  },
  devServer: {
    contentBase: utils.resolve(config.buildDirectory),
    allowedHosts: [
      '0.0.0.0'
    ],
    port: config.devPort,
    open: true,
    proxy: {
      '/api': {
        target: `http://0.0.0.0:${config.mockPort}`,
        changeOrigin: true,
        pathRewrite: function (_path, req) {
          //可查看http-proxy-middleware插件中对pathRewrite属性的说明
          //return _path.replace(/\/api\/.*\/([^?]+)(\?.*)?/, '/api/$1.json')
        }
      },
      // '/': {
      //   target: `http://nacks.asuncloud.com`,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/': '/'   //重写接口
      //   },
      // },
      '/': {
        target: `http://device.nacks.com:9002`,
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'   //重写接口
        },
      },
    }
  }
})

