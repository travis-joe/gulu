<template>
  <div class="g-sub-nav" :class="{active}" v-click-outside="close">
    <span @click="onClick">
      <slot name="title"></slot>
      <span v-if="open">-</span>
      <span v-else>+</span>
    </span>
    <div class="g-sub-nav-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import ClickOutside from '../click-outside'

  export default {
    name: "GuluSubNav",
    inject:['root'],
    directives: {ClickOutside},
    props: {
      name: {
        type: String,
        required: true
      }
    },
    computed: {
      active() {
        return this.root.namePath.includes(this.name)
      }
    },
    data() {
      return {
        open: false,
      }
    },
    methods: {
      onClick() {
        this.open = true
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
    > span {
      padding: 14px 20px;
      display: block;
      vertical-align: top;
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
    }
  }
  .g-sub-nav .g-sub-nav .g-sub-nav-popover {
    top:0;
    left: 100%;
    margin-left: 8px;
  }
</style>
