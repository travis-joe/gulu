<template>
    <div class="tabs-item">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "GuluTabsItem",
    inject: ['eventBus'],
    data() {
      return {
        active: false
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
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
    .tabs-item {
        flex-shrink: 0;
        padding: 0 2em;
    }
</style>