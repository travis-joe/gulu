<template>
    <div class="cascaderItems" :style="{height:height}">
        <div class="left">
            <div class="label" v-for="item in items" @click="onClickLabel(item)">
                {{item.name}}
                <icon name="right" v-if="item.children" class="icon"></icon>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <Cascader-Items
                :items="rightItems"
                :height="height"
                :level="level + 1"
                :selected="selected"
                @update:selected="onUpdateSelected"
            ></Cascader-Items>
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
      },
      selected: {
        type: Array,
        default: () => []
      },
      level: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        leftSelected: null
      }
    },
    computed: {
      rightItems() {
        const selectedItems = this.selected[this.level]
        if (selectedItems && selectedItems.children) {
          return selectedItems.children
        } else {
          return null
        }
      }
    },
    methods: {
      onClickLabel(item) {
        let copy = JSON.parse(JSON.stringify(this.selected))
        copy[this.level] = item
        copy.splice(this.level + 1)
        this.$emit('update:selected', copy)
      },
      onUpdateSelected(selected) {
        this.$emit('update:selected', selected)
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
