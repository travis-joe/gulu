<template>
    <div class="tabs-pane">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "tabs-pane",
    inject: ['eventBus'],
    data() {
      return {
        active: false
      }
    },
    props: {
      name: {
        type: String | Number,
        require: true
      },
    },
    created() {
      this.eventBus.$on('update:selected', name => {
        this.active = name === this.name;
      })
    }
  }
</script>

<style scoped lang="scss">
    .tabs-pane {
    }
</style>