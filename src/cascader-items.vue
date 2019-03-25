<template>
    <div class="cascaderItems" :style="{height:height}">
        <div class="left">
            <div class="label" v-for="item in items" @click="leftSelected = item">
                {{item.name}}
                <icon name="right" v-if="item.children" class="icon"></icon>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <Cascader-Items :items="rightItems" :height="height"></Cascader-Items>
        </div>
    </div>
</template>

<script>
  import Icon from './icon'

  export default {
    name: "CascaderItems",
    components: {Icon},
    props: {
      items: {
        type: Array
      },
      height: {
        type: String
      }
    },
    data() {
      return {
        leftSelected: null
      }
    },
    computed: {
      rightItems() {
        if (this.leftSelected && this.leftSelected.children) {
          return this.leftSelected.children
        } else {
          return null
        }
      }
    }
  }

</script>

<style scoped lang="scss">
    @import "var";

    .cascaderItems {
        display: flex;
        height: 100px;

        .left {
            padding: .3em 0;

            .label {
                padding: .3em 1em;
                cursor: pointer;
                white-space: nowrap;
                display: flex;
                align-items: center;
                .icon {
                    margin-left: 1em;
                    transform: scale(.5);
                    opacity: 0.5;
                }
            }
        }

        .right {
            border-left: 1px solid lighten($border-color, 35%);
        }

    }
</style>
