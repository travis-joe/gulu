<template>
  <div class="g-nav-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "GuluNavItem",
    props: {
      name: {
        type: String,
        require: true
      }
    }
  }
</script>

<style scoped lang="scss">
  .g-nav-item{
    padding: 14px 20px;
  }
</style>
