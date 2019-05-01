<template>
  <div class="g-nav" :class="{vertical}" >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "GuluNav",
    data() {
      return {
        items: [],
        namePath: []
      }
    },
    provide(){
      return {
        root: this,
      }
    },
    props: {
      selected: {
        type: String,
        default: '',
      },
      vertical: {
        type: Boolean,
        default: false,
      }
    },
    mounted () {
      this.updateChildren()
      this.listenToChildren()
    },
    updated () {
      this.updateChildren()
    },
    methods: {
      addItem(vm){
        this.items.push(vm)
      },
      updateChildren () {
        this.items.forEach(vm => {
          vm.selected = this.selected === vm.name;
        })
      },
      listenToChildren () {
        this.items.forEach(vm => {
          vm.$on('update:selected', (name) => {
            this.$emit('update:selected', name)
          })
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/var";
  .g-nav{
    display: flex;
    border: 1px solid $grey;
    color: $color;
    cursor: default;
    user-select: none;
    &.vertical {
      flex-direction: column;
      border: 1px solid $grey;
    }
  }
</style>
