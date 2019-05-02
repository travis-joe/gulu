<template>
  <div class="g-nav-item" :class="{selected, vertical}" @click="onClick" :data-name="name">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "GuluNavItem",
    inject: ['root'],
    props: {
      name: {
        type: String,
        require: true
      }
    },
    computed: {
      vertical() {
        return this.root.vertical
      }
    },
    data() {
      return {
        selected: false
      }
    },
    created() {
      this.root.addItem(this);
    },
    methods: {
      onClick() {
        this.root.namePath = []
        this.$parent.updateNamePath && this.$parent.updateNamePath()
        this.$emit('update:selected', this.name)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/var";
  .g-nav-item{
    padding: 14px 20px;
    position: relative;
    &:not(.vertical) {
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
    &.vertical {
      &.selected{
        color: $blue;
      }
    }
  }
  a{
    color: inherit;
    text-decoration: none;
  }
  .g-sub-nav .g-nav-item:not(.vertical) {
    &.selected {
      background: $grey;
      color: black;
      &::after{
        display: none;
      }
    }
  }
</style>
