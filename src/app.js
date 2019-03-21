import Vue from "vue";
import Button from "./button";
import Icon from "./icon";
import ButtonGroup from "./button-group";
import Input from "./input";
import Row from './row'
import Col from './col'
import Layout from './layout'
import Header from './header'
import Footer from './footer'
import Content from './content'
import Sider from './sider'
import plugin from './plugin'
import Tabs from './tabs'
import TabsHead from './tabs-head'
import TabsBody from './tabs-body'
import TabsPane from './tabs-pane'
import TabsItem from './tabs-item'
import TabsAntd from './tabs-antd'
import Popover from './popover'
import Collapse from './collapse'
import CollapseItem from './collapse-item'

Vue.component("g-button", Button);
Vue.component("g-button-group", ButtonGroup);
Vue.component("g-input", Input);
Vue.component("g-row", Row);
Vue.component("g-col", Col);
Vue.component("g-layout", Layout);
Vue.component("g-header", Header);
Vue.component("g-footer", Footer);
Vue.component("g-content", Content);
Vue.component("g-sider", Sider);
Vue.component("g-tabs", Tabs);
Vue.component("g-tabs-head", TabsHead);
Vue.component("g-tabs-item", TabsItem);
Vue.component("g-tabs-body", TabsBody);
Vue.component("g-tabs-pane", TabsPane);
Vue.component("g-tabs-antd", TabsAntd);
Vue.component("g-popover", Popover);
Vue.component("g-collapse", Collapse);
Vue.component("g-collapse-item", CollapseItem);
Vue.use(plugin);

new Vue({
  el: "#app",
  data: {
    loading1: true,
    message: 'Hi',
    selectedTab: 'sports',
    selected: ['2']
  },
  methods: {
    inputChange(e) {
      console.log(e)
    },
    showToast() {
      this.$toast(`<p>${parseInt(Math.random()*100)}</p><p>我是toast</p>`, {
        position:'bottom',
        enableHtml: true,
        closeButton:{
          text: '好的',
          callback:(toast)=>{
            console.log('好的关了吧')
          }
        }
      })
    },
  }
});