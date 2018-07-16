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
Vue.use(plugin);

new Vue({
  el: "#app",
  data: {
    loading1: true,
    message: 'Hi',
  },
  methods: {
    inputChange(e) {
      console.log(e)
    },
    showToast() {
      this.$toast(`<p>${parseInt(Math.random()*100)}</p><p>我是toast</p>`, {
        position:'top',
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