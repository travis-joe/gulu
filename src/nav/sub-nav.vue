<template>
  <div class="g-sub-nav" :class="{active}" v-click-outside="close">
    <span class="g-sub-nav-label" @click="onClick">
      <slot name="title"></slot>
      <span class="g-sub-nav-icon" :class="{open}">
        <g-icon name="right"></g-icon>
      </span>
    </span>
    <template v-if="vertical">
      <transition @enter="enter" @leave="leave" @after-leave="afterLeave" @after-enter="afterEnter">
        <div class="g-sub-nav-popover" v-show="open" :class="{vertical}">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-else>
      <div class="g-sub-nav-popover" v-show="open" :class="{vertical}">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>
  import ClickOutside from '../click-outside'
  import GIcon from '../icon'
  export default {
    name: "GuluSubNav",
    inject:['root'],
    directives: {ClickOutside},
    components: {GIcon},
    props: {
      name: {
        type: String,
        required: true
      }
    },
    computed: {
      active() {
        return this.root.namePath.includes(this.name)
      },
      vertical() {
        return this.root.vertical
      }
    },
    data() {
      return {
        open: false,
      }
    },
    methods: {
      enter(el, done) {
        let {height} = el.getBoundingClientRect()
        el.style.height = 0
        el.getBoundingClientRect()
        el.style.height = `${height}px`
        el.addEventListener('transitionend', ()=> {
          done()
        })
      },
      afterEnter(el){
        el.style.height = 'auto'
      },
      leave(el) {
        let {height} = el.getBoundingClientRect()
        el.style.height = `${height}px`
        el.getBoundingClientRect()
        el.style.height = 0
      },
      afterLeave(el){
        el.style.height = 'auto'
      },
      onClick() {
        this.open = !this.open
      },
      close() {
        this.open = false
      },
      updateNamePath() {
        this.root.namePath.unshift(this.name)
        this.$parent.updateNamePath && this.$parent.updateNamePath()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/var";
  .g-sub-nav{
    position: relative;
    &.active {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left:0;
        border-bottom: 2px solid $blue;
        width: 100%;
      }
    }
    &-icon{
      display: none;
    }
    &-label {
      padding: 14px 20px;
      display: block;
    }
    &-popover{
      position: absolute;
      top: 100%;
      left: 0;
      white-space: nowrap;
      background: white;
      margin-top: 4px;
      box-shadow: 0 0 3px fade_out(black, 0.8);
      border-radius: $border-radius;
      color: $light-color;
      font-size: $small-font-size;
      min-width: 8em;
      transition: height .25s;
      &.vertical{
        position: static;
        border-radius: 0;
        border: none;
        box-shadow: none;
        overflow-y: hidden;
      }
    }
  }
  .g-sub-nav .g-sub-nav {
    &.active {
      &::after {
        display: none;
      }
    }
    .g-sub-nav-popover {
      top:0;
      left: 100%;
      margin-left: 8px;
    }
    .g-sub-nav-label{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
    }
    .g-sub-nav-icon{
      display: inline-flex;
      margin-left: 1em;
      transition: all .3s;
      svg{fill: $light-color}
      &.open {
        transform: rotate(180deg);
      }
    }
  }
</style>
