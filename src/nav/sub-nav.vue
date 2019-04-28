<template>
  <div class="g-sub-nav">
    <span @click="onClick">
      <slot name="title"></slot>
    </span>
    <div class="g-sub-nav-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GuluSubNav",
    data() {
      return {
        open: false
      }
    },
    methods: {
      onClick() {
        this.open = true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/var";
  .g-sub-nav{
    position: relative;
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
