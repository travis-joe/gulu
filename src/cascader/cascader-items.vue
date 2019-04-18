<template>
  <div class="cascaderItems" :style="{ height: height }">
    <div class="left">
      <div class="label" v-bind:class="{selected: isSelected(item)}" v-for="item in items" @click="onClickLabel(item)">
        <span class="name">{{ item.name }}</span>
        <span class="icons">
          <template v-if="item.name === loadingItem.name">
            <icon name="loading" class="loading"></icon>
          </template>
          <template v-else>
            <icon
              name="right"
              class="arrow"
              v-if="rightArrowVisible(item)"
            ></icon>
          </template>
        </span>
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
        :loading-item="loadingItem"
      ></Cascader-Items>
    </div>
  </div>
</template>

<script>
import Icon from "../icon";

export default {
  name: "CascaderItems",
  components: { Icon },
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
    },
    loadingItem: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      leftSelected: null
    };
  },
  computed: {
    rightItems() {
      if (this.selected[this.level]) {
        const selectedItem = this.items.filter(
          i => i.name === this.selected[this.level].name
        );
        if (
          selectedItem[0] &&
          selectedItem[0].children &&
          selectedItem[0].children.length > 0
        ) {
          return selectedItem[0].children;
        }
      }
    }
  },
  methods: {
    isSelected(item) {
      if(item && this.selected.length > 0 && this.selected[this.level]) {
        return item.name === this.selected[this.level].name
      }
      return false
    },
    onClickLabel(item) {
      let copy = JSON.parse(JSON.stringify(this.selected));
      copy[this.level] = item;
      copy.splice(this.level + 1);
      this.$emit("update:selected", copy);
    },
    onUpdateSelected(selected) {
      this.$emit("update:selected", selected);
    },
    rightArrowVisible(item) {
      return this.loadData ? !item.isLeaf : item.children;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../var";

.cascaderItems {
  display: flex;
  height: 100px;

  .left {
    padding: 0.3em 0;

    .label {
      padding: 0.5em 1em;
      cursor: pointer;
      white-space: nowrap;
      display: flex;
      align-items: center;

      &.selected {
        background: $grey;
      }

      &:hover {
        background: $grey;
      }

      .name {
        margin-right: 1em;
        user-select: none;
      }

      .icons {
        margin-left: auto;
        opacity: 0.5;

        .arrow {
          transform: scale(0.5);
        }

        .loading {
          animation: spin 2s infinite linear;
        }
      }
    }
  }

  .right {
    border-left: 1px solid lighten($border-color, 35%);
  }
}
</style>
