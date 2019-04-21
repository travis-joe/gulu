<template>
  <div class="g-nav">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "GuluNav",
    props: {
      selected: {
        type: Array,
        default: () => []
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      
    }
  }
</script>

<style scoped lang="scss">
  .g-nav{
    display: flex;
    border: 1px solid red;
  }
</style>
