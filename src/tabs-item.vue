<template>
    <div class="tabs-item" :class="classes" @click="change">
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
    computed: {
      classes() {
        return {
          active: this.active,
          disabled: this.disabled,
        }
      }
    },
    created() {
      this.eventBus.$on('update:selected', name => {
        this.active = name === this.name;
      })
    },
    methods: {
      change() {
        if(this.disabled) { return }
        this.eventBus.$emit('update:selected', this.name, this)
      }
    }
  }
</script>

<style scoped lang="scss">
    $blue: #1890ff;
    .tabs-item {
        flex-shrink: 0;
        padding: 0 2em;
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        &.active{
            color: $blue;
            font-weight: bold;
        }
        &.disabled{
            color: #ddd;
            cursor: not-allowed;
        }
    }
</style>