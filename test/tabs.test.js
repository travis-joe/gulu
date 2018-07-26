const expect = chai.expect;
import Vue from 'vue'
import Tabs from '../src/tabs'
import TabsHead from '../src/tabs-head'
import TabsBody from '../src/tabs-body'
import TabsItem from '../src/tabs-item'
import TabsPane from '../src/tabs-pane'
Vue.config.productionTip = false
Vue.config.devtools = false
Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-pane', TabsPane)


describe('Tabs', () => {
  it('存在.', () => {
    expect(Tabs).to.exist
  })
  it('子组件只能是tabs-head和tabs-body', (done) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <g-tabs selected="finance">
          <g-tabs-head>
              <template slot="actions">设置</template>
              <g-tabs-item name="beauty" disabled>美女</g-tabs-item>
              <g-tabs-item name="finance">财经</g-tabs-item>
              <g-tabs-item name="sports">体育</g-tabs-item>
          </g-tabs-head>
          <g-tabs-body>
              <g-tabs-pane name="beauty">美女相关内容</g-tabs-pane>
              <g-tabs-pane name="finance">财经相关内容</g-tabs-pane>
              <g-tabs-pane name="sports">体育相关内容</g-tabs-pane>
          </g-tabs-body>
      </g-tabs>
      `
    let vm = new Vue({
      el:div
    })
    setTimeout(() => {
      let x = vm.$el.querySelector('.tabs-item[data-name="finace"]');
      expect(x.classList.contains('active')).to.be.true;
      done();
    }, 1000);
  })
})