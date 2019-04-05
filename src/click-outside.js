let callbacks = []
const onCLickDocument = e => {
  let {target} = e
  callbacks.forEach(item => {
    if(target === item.el || item.el.contains(target)) {
      return
    } else {
      item.callback()
    }

  })
}
const closeListen = document.addEventListener('click', onCLickDocument)
export default {
  bind: function (el, binding, vnode) {
    callbacks.push({el, callback: binding.value})
  },
  removeListener : function () {
    document.removeEventListener('click', onCLickDocument)
  }
}


