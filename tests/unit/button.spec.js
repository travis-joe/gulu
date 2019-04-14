import chai, {expect} from "chai";
import Button from '@/button.vue'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {mount} from '@vue/test-utils'
chai.use(sinonChai)


describe('Button', () => {
  it('存在.', () => {
    expect(Button).to.exist
  })
  it('可以设置icon.', () => {
    const wrapper = mount(Button,{
      propsData: {
        icon: 'settings',
      }
    })
    const useElement = wrapper.find('use')
    expect(useElement.attributes()['href']).to.equal('#i-settings')
  })
  it('可以设置loading.', () => {
    const {vm} = mount(Button,{
      propsData: {
        icon: 'settings',
        loading: true
      }
    })
    const useElements = vm.$el.querySelectorAll('use')
    expect(useElements.length).to.equal(1)
    expect(useElements[0].getAttribute('xlink:href')).to.equal('#i-loading')
  })
  xit('icon 默认的 order 是 1', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const {vm} = mount(Button,{
      propsData: {
        icon: 'settings',
      }
    })
    const icon = vm.$el.querySelector('svg')
    expect(getComputedStyle(icon).order).to.eq('1')
  })
  xit('设置 iconPosition 可以改变 order', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const {vm} = mount(Button,{
      propsData: {
        icon: 'settings',
        iconPosition: 'right'
      }
    })
    const icon = vm.$el.querySelector('svg')
    expect(getComputedStyle(icon).order).to.eq('2')
  })
  it('点击 button 触发 click 事件', () => {
    const {vm} = mount(Button,{
      propsData: {
        icon: 'settings',
      }
    })

    const callback = sinon.fake();
    vm.$on('click', callback)
    vm.$el.click()
    expect(callback).to.have.been.called

  })
})