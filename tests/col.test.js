const expect = chai.expect;
import Vue from "vue";
import Row from "../src/row";
import Col from "../src/col";
Vue.config.productionTip = false;
Vue.config.devtools = false;

describe("Col", () => {
  it("存在.", () => {
    expect(Col).to.exist;
  });
  it("接受 span 属性", () => {
    const Constructor = Vue.extend(Col);
    const div = document.createElement("div");
    document.body.appendChild(div);
    const vm = new Constructor({
      propsData: {
        span: 1
      }
    }).$mount(div);
    // console.log(vm.$el.classList)
    expect(vm.$el.classList.contains("col-1")).to.eq(true);
    div.remove();
    vm.$destroy();
  });
  it("接受 offset 属性", () => {
    const Constructor = Vue.extend(Col);
    const div = document.createElement("div");
    document.body.appendChild(div);
    const vm = new Constructor({
      propsData: {
        offset: "1"
      }
    }).$mount(div);
    // console.log(vm.$el.classList)
    expect(vm.$el.classList.contains("offset-1")).to.eq(true);
    div.remove();
    vm.$destroy();
  });
  it("接受 pc 属性", () => {
    const Constructor = Vue.extend(Col);
    const div = document.createElement("div");
    document.body.appendChild(div);
    const vm = new Constructor({
      propsData: {
        pc: { span: 1, offset: 2 }
      }
    }).$mount(div);
    expect(vm.$el.classList.contains("col-pc-1")).to.eq(true);
    expect(vm.$el.classList.contains("offset-pc-2")).to.eq(true);
    div.remove();
    vm.$destroy();
  });
  it("接受 ipad 属性", () => {
    const Constructor = Vue.extend(Col);
    const div = document.createElement("div");
    document.body.appendChild(div);
    const vm = new Constructor({
      propsData: {
        ipad: { span: 1, offset: 2 }
      }
    }).$mount(div);
    expect(vm.$el.classList.contains("col-ipad-1")).to.eq(true);
    expect(vm.$el.classList.contains("offset-ipad-2")).to.eq(true);
    div.remove();
    vm.$destroy();
  });
  it("接受 narrow-pc 属性", () => {
    const Constructor = Vue.extend(Col);
    const div = document.createElement("div");
    document.body.appendChild(div);
    const vm = new Constructor({
      propsData: {
        narrowPc: { span: 1, offset: 2 }
      }
    }).$mount(div);
    expect(vm.$el.classList.contains("col-narrowPc-1")).to.eq(true);
    expect(vm.$el.classList.contains("offset-narrowPc-2")).to.eq(true);
    div.remove();
    vm.$destroy();
  });
  it("接受 wide-pc 属性", () => {
    const Constructor = Vue.extend(Col);
    const div = document.createElement("div");
    document.body.appendChild(div);
    const vm = new Constructor({
      propsData: {
        widePc: { span: 1, offset: 2 }
      }
    }).$mount(div);
    expect(vm.$el.classList.contains("col-widePc-1")).to.eq(true);
    expect(vm.$el.classList.contains("offset-widePc-2")).to.eq(true);
    div.remove();
    vm.$destroy();
  });
});
