<template>
    <div class="g-slides">
        <div class="g-slides-window">
            <div class="g-slides-wrapper">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "g-slides",
    props: {
      selected: {
        type: String,
      }
    },
    mounted() {
      this.updateChildren()
    },
    updated() {
      this.updateChildren()
    },
    methods: {
      updateChildren() {
        let first = this.$children[0]
        this.$children.forEach(vm => {
          vm.selected = this.selected || first.name
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .g-slides{
        display: inline-block;
        &-window{

        }
        &-wrapper{
            position: relative;
        }
    }
</style>
