<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible = !popoverVisible">
            <slot></slot>
        </div>
        <div class="popover" v-if="popoverVisible">
            <div v-for="item in source">
                <cascader-item :sourceItem="item"></cascader-item>
            </div>
        </div>
    </div>
</template>

<script>
  import CascaderItem from './cascader-items'

  export default {
    name: "GuluCascader",
    components: {CascaderItem},
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
            width: 80px;
        }
    }
</style>
