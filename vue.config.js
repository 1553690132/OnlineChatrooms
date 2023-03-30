const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = defineConfig({
  chainWebpack: config => {
    // 关闭预先加载模块，减少损耗
    config.plugins.delete('prefetch')
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
    })
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      maxEntrypointSize: 50000000, // 生成文件的最大体积
      maxAssetSize: 30000000, // 只对js文件给出性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.map.baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new MiniCssExtractPlugin({
        ignoreOrder: true
      }),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon'
          })
        ],
      }),

      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            enabledCollections: ['ep']
          })
        ],
      }),

      Icons({
        autoInstall: true
      })
    ]
  },
  css: {
    extract: { ignoreOrder: true }
  }
})
