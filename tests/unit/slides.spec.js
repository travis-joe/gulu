import chai, {expect} from "chai";
import Slides from '@/slides.vue'
import SlidesItem from '@/slides-item.vue'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {mount} from '@vue/test-utils'
import Vue from 'vue'
chai.use(sinonChai)


describe('Slides', () => {
  it('存在.', () => {
    expect(Slides).to.exist
  })

  it('接受GuluSlidesItem', (done) => {
    Vue.component('GSlidesItem', SlidesItem)
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false
      },
      slots: {
        default: `
            <g-slides-item name="1">
                <div class="box1">
                    1
                </div>
            </g-slides-item>
            <g-slides-item name="2">
                <div class="box2">
                    2
                </div>
            </g-slides-item>
            <g-slides-item name="3">
                <div class="box3">
                    3
                </div>
            </g-slides-item>
        `
      }
    })
    setTimeout(()=>{
      expect(wrapper.find('.box1').exists()).to.be.true
      done()
    })
  })
  it('selected是多少，选中是多少', (done) => {
    Vue.component('GSlidesItem', SlidesItem)
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false,
        selected: '2'
      },
      slots: {
        default: `
            <g-slides-item name="1">
                <div class="box1">
                    1
                </div>
            </g-slides-item>
            <g-slides-item name="2">
                <div class="box2">
                    2
                </div>
            </g-slides-item>
            <g-slides-item name="3">
                <div class="box3">
                    3
                </div>
            </g-slides-item>
        `
      }
    })
    setTimeout(()=>{
      expect(wrapper.find('.box2').element).to.be.exist
      done()
    })
  })
  it('点击index展示对应的slideItem', (done) => {
    Vue.component('GSlidesItem', SlidesItem)
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false,
        selected: '1'
      },
      slots: {
        default: `
            <g-slides-item name="1">
                <div class="box1">
                    1
                </div>
            </g-slides-item>
            <g-slides-item name="2">
                <div class="box2">
                    2
                </div>
            </g-slides-item>
            <g-slides-item name="3">
                <div class="box3">
                    3
                </div>
            </g-slides-item>
        `
      },
      listeners: {
        'update:selected': (x) => {
          expect(x).to.eq('2')
          done()
        }
      }
    })

    wrapper.find('[data-index="1"]').trigger('click')
  })
  it('会自动播放', (done) => {
    Vue.component('GSlidesItem', SlidesItem)
    const callback = sinon.fake()
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: true,
        selected: '1',
        delay: 20,
      },
      slots: {
        default: `
            <g-slides-item name="1">
                <div class="box1">
                    1
                </div>
            </g-slides-item>
            <g-slides-item name="2">
                <div class="box2">
                    2
                </div>
            </g-slides-item>
            <g-slides-item name="3">
                <div class="box3">
                    3
                </div>
            </g-slides-item>
        `
      },
      listeners: {
        'update:selected': callback
      }
    })
    setTimeout(() => {
      expect(callback).to.have.been.calledWith('2')
      done()
    },20)
  })
})
