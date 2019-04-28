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
        this.$parent.setSelected && this.$parent.setSelected()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/var";
  .g-nav-item{
    padding: 14px 20px;
    position: relative;
    &.selected {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left:0;
        border-bottom: 2px solid $blue;
        width: 100%;
      }
    }
  }
  .g-sub-nav .g-nav-item {
    &.selected {
      background: $grey;
      color: black;
      &::after{
        display: none;
      }
    }
  }
</style>
