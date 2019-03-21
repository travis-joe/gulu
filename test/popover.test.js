const expect = chai.expect;
import Vue from 'vue'
import Popover from '../src/popover'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover', () => {
  it('存在.', () => {
    expect(Popover).to.exist
  })

  it('可以设置position', (done) => {

    Vue.component('g-popover', Popover)
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
        <g-popover position="bottom" ref="a">
          <template slot="content">
              <div>popover内容</div>
              <button>关闭</button>
          </template>
          <button>点我</button>
        </g-popover>
    `
    const vm = new Vue({
      el: div
    })
    vm.$nextTick(() => {
      vm.$el.querySelector('button').click()
      vm.$nextTick(() => {
        expect(vm.$refs.a.$refs.contentWrapper.classList.contains('position-bottom')).to.be.true;
        done()
      })
    })
  })
  // fix
  xit('可以设置trigger', (done) => {

    Vue.component('g-popover', Popover)
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
        <g-popover position="bottom" ref="a" trigger="hover">
          <template slot="content">
              <div>popover内容</div>
              <button>关闭</button>
          </template>
          <button>点我</button>
        </g-popover>
    `
    const vm = new Vue({
      el: div
    })
    vm.$nextTick((done) => {
      let event = new Event('mouseenter')
      vm.$el.dispatchEvent(event)
      vm.$nextTick(() => {
        expect(vm.$refs.a.$refs.contentWrapper).to.exist;
        done()
      })
    })
  })
})