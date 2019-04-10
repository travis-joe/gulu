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
      },
      autoPlay: {
        type: Boolean,
        default: true
      }
    },
    mounted() {
      this.updateChildren()
      this.playAutomatically()
    },
    updated() {
      this.updateChildren()
    },
    methods: {
      playAutomatically() {
        const names = this.$children.map(vm => vm.name)
        const run = () => {
          let index = names.indexOf(this.getSelected())
          let newIndex = index - 1
          if (newIndex === -1) {
            newIndex = names.length - 1
          }
          if (newIndex === names.length) {
            newIndex = 0
          }
          this.$emit('update:selected', names[newIndex])
          setTimeout(run, 3000)
        }
        setTimeout(run, 3000)
      },
      getSelected() {
        return this.selected || this.$children[0].name
      },
      updateChildren() {
        this.$children.forEach(vm => {
          vm.selected = this.getSelected()
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .g-slides {
        display: inline-block;

        &-window {

        }

        &-wrapper {
            position: relative;
        }
    }
</style>
