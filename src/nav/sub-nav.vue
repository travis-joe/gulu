<template>
  <div class="g-sub-nav">
    <span>
      <slot name="title"></slot>
    </span>
    <div class="g-sub-nav-popover">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GuluSubNav"
  }
</script>

<style scoped lang="scss">
  .g-sub-nav{
    position: relative;
    padding: 14px 20px;
    .g-sub-nav-popover{
      position: absolute;
      top: 100%;
      left: 0;
      border: 1px solid black;
      white-space: nowrap;
    }
  }
</style>
