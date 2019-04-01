<template>
    <div class="cascaderItems" :style="{height:height}">
        <div class="left">
            <div class="label" v-for="item in items" @click="onClickLabel(item)">
                <span class="name">{{item.name}}</span>
                <icon name="right" v-if="rightArrowVisible(item)" class="icon"></icon>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <Cascader-Items
                :items="rightItems"
                :height="height"
                :level="level + 1"
                :selected="selected"
                @update:selected="onUpdateSelected"
                :loadData="loadData"
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
      },
      loadData: {
        type: Function
      }
    },
    data() {
      return {
        leftSelected: null
      }
    },
    computed: {
      rightItems() {
        if(this.selected[this.level]) {
          const selectedItem = this.items.filter(i => i.name === this.selected[this.level].name)
          if(selectedItem[0] && selectedItem[0].children && selectedItem[0].children.length > 0) {
            return selectedItem[0].children
          }
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
      },
      rightArrowVisible(item){
        return this.loadData ? !item.isLeaf : item.children
      },
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
                padding: .5em 1em;
                cursor: pointer;
                white-space: nowrap;
                display: flex;
                align-items: center;
                &:hover {
                    background: $grey;
                }
                .name {
                    margin-right: 1em;
                    user-select: none;
                }
                .icon {
                    margin-left: auto;
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
