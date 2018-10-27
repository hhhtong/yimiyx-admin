const path = require('path')
const fs = require('fs')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const env = process.env.NODE_ENV || 'development'
fs.writeFileSync(path.join(__dirname, './config/env.js'), `export default '${env}'\n`)

const OUPUT_DIR = resolve('../yimiyx-server/public/static')
// - 静态资源(js、css、img、fonts)的链接前缀
const BASE_URL = env === 'production' ? '//cdn.haohaihongtong.com/admin/static/' : '/'
// - html文件生成的位置以及名字
const FILENAME = resolve('../yimiyx-server/app/view/index.html')

/**
 * vue-cli配置项
 * @see https://cli.vuejs.org/zh/config
 */
module.exports = {
  // - 部署应用时的基本 URL。
  // - 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // - 例如 https://www.my-app.com/。
  // - 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
  // - 例如，如果你的应用被部署在 https://www.my-app.com/my-app/
  // - 则设置 baseUrl 为 /my-app/。
  baseUrl: BASE_URL,
  // - 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  // - 注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  outputDir: OUPUT_DIR,
  // - @see https://cli.vuejs.org/zh/guide/webpack.html#简单的配置方式
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // - 为生产环境修改配置...
      config.plugins
        .find(item => item.constructor.name === 'HtmlWebpackPlugin')
        .options
        .filename = FILENAME
    } else {
      // - 为开发环境修改配置...
    }
  },
  // - tweak internal webpack configuration.
  // - see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // - key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_comp', resolve('src/components'))
      .set('_conf', resolve('config'))
  },
  devServer: {
    allowedHosts: [
      '.haohaihongtong.com'
    ],
    port: 7000, // - 启动端口
    // - 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，
    // - 你需要在开发环境下将 API 请求代理到 API 服务器。
    // - 这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
    // - devServer.proxy 可以是一个指向开发环境 API 服务器的字符串：
    proxy: 'http://localhost:7001'
  },
  // - 打包时不生成.map文件
  productionSourceMap: false
}
