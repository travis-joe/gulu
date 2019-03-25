<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible = !popoverVisible">
            <slot></slot>
        </div>
        <div class="popover" v-if="popoverVisible">
            <cascader-items :items="source"></cascader-items>
        </div>
    </div>
</template>

<script>
  import CascaderItems from './cascader-items'

  export default {
    name: "GuluCascader",
    components: {CascaderItems},
    props: {
      source: {
        type: Array
      }
    },
    data() {
      return {
        popoverVisible: false
      }
    }

  }
</script>

<style scoped lang="scss">
    @import "var";

    .cascader {
        height: $input-height;
        .trigger{
            border: 1px solid $red;
            height: $input-height;
            width: 100px;
        }
        .popover{
            border: 1px solid $red;
            height: 200px;
        }
    }
</style>
