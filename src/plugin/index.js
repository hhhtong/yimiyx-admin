// - MyPlugin
import helper from './helper'

const MyPlugin = {
  /**
   * 自定义方法
   * 组件内使用：this.$helper
   * 全局使用：Vue.helper
   */
  install (Vue) {
    const $helper = {
      configurable: false,
      writable: true,
      enumerable: false,
      value: helper
    }

    Object.defineProperties(Vue.prototype, { $helper })
    Object.defineProperties(Vue, { helper: $helper })
  }
}

export default MyPlugin
