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
Vue.component('g-tabs-head', TabsBody)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-pane', TabsPane)


describe('Tabs', () => {
  it('存在.', () => {
    expect(Tabs).to.exist
  })
  it('接受selected属性', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <g-tabs>
        <div>hi</div>
      </g-tabs>
      `
  })
})