import chai, {expect} from "chai";
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {mount} from '@vue/test-utils'
chai.use(sinonChai)
import Nav from '@/nav/nav.vue'
import NavItem from '@/nav/nav-item.vue'
import SubNav from '@/nav/sub-nav.vue'
import Vue from "vue";


describe('Nav', () => {
  it('存在.', () => {
    expect(Nav).to.exist
  })
  it('支持selected属性', (done) => {
    Vue.component('GNavItem', NavItem)
    Vue.component('GSubNav', SubNav)
    const wrapper = mount(Nav, {
      propsData: {
        selected: 'home'
      },
      slots: {
        default: `
            <g-nav-item name="home">首页</g-nav-item>
            <g-sub-nav name="about">
                <template slot="title">关于</template>
                <g-nav-item name="culture">企业文化</g-nav-item>
                <g-nav-item name="develops">开发团队</g-nav-item>
                <g-sub-nav name="contacts">
                    <template slot="title">联系电话</template>
                    <g-nav-item name="wechat">微信</g-nav-item>
                    <g-nav-item name="qq">qq</g-nav-item>
                    <g-sub-nav name="phone">
                        <template slot="title">手机</template>
                        <g-nav-item name="cn">电信</g-nav-item>
                        <g-nav-item name="cu">联通</g-nav-item>
                        <g-nav-item name="cm">移动</g-nav-item>
                    </g-sub-nav>
                </g-sub-nav>
            </g-sub-nav>
            <g-nav-item name="hire">招聘</g-nav-item>
        `
      }
    })
    setTimeout(()=>{
      expect(wrapper.find('[data-name="home"].selected').exists()).to.be.true
      done()
    })
  })

  it('触发 update:selected 事件', (done) => {
    Vue.component('GNavItem', NavItem)
    Vue.component('GSubNav', SubNav)
    const callback = sinon.fake()
    const wrapper = mount(Nav, {
      propsData: {
        selected: 'home'
      },
      listeners: {
        'update:selected': callback
      },
      slots: {
        default: `
            <g-nav-item name="home">首页</g-nav-item>
            <g-sub-nav name="about">
                <template slot="title">关于</template>
                <g-nav-item name="culture">企业文化</g-nav-item>
                <g-nav-item name="develops">开发团队</g-nav-item>
                <g-sub-nav name="contacts">
                    <template slot="title">联系电话</template>
                    <g-nav-item name="wechat">微信</g-nav-item>
                    <g-nav-item name="qq">qq</g-nav-item>
                    <g-sub-nav name="phone">
                        <template slot="title">手机</template>
                        <g-nav-item name="cn">电信</g-nav-item>
                        <g-nav-item name="cu">联通</g-nav-item>
                        <g-nav-item name="cm">移动</g-nav-item>
                    </g-sub-nav>
                </g-sub-nav>
            </g-sub-nav>
            <g-nav-item name="hire">招聘</g-nav-item>
        `
      }
    })

      wrapper.find('[data-name="develops"]').trigger('click')
      expect(callback).to.have.been.calledWith('develops')
      done()
  })
})
