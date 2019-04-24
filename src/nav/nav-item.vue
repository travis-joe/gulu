<template>
  <div class="g-nav-item" :class="{selected}" @click="onClick">
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
    },
    data() {
      return {
        selected: false
      }
    },
    inject: ['root'],
    created() {
      this.root.addItem(this);
    },
    methods: {
      onClick() {
        this.$emit('update:selected', this.name)
      }
    }
  }
</script>

<style scoped lang="scss">
  .g-nav-item{
    padding: 14px 20px;
    &.selected {
      background: red;
    }
  }
</style>
