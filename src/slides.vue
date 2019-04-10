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
        let index = names.indexOf(this.getSelected())
        const run = () => {
          if(index === names.length) {
            index = 0
          }
          this.$emit('update:selected', names[index + 1])
          index++
          setTimeout(run, 3000)
        }
        setTimeout(run, 3000)
      },
      getSelected() {
        return (this.selected || this.$children[0].name).toString()
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
