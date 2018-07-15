/**
 * Created by qzy on 2018/7/16.
 * File description:
 */
import Toast from './toast'
export default {
  install(Vue, options) {
    Vue.prototype.$toast = function (message) {
      let constructor = Vue.extend(Toast)
      let toast = new constructor()
      toast.$slots.default = [message]
      toast.$mount()

      document.body.appendChild(toast.$el)
    }
  }
}