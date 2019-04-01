<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
      {{ result || "&nbsp;" }}
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items
        :items="source"
        class="popover"
        :height="popoverHeight"
        :selected="selected"
        @update:selected="onUpdateSelected"
        :loadData = "loadData"
      ></cascader-items>
    </div>
  </div>
</template>

<script>
import CascaderItems from "./cascader-items";

export default {
  name: "GuluCascader",
  components: { CascaderItems },
  props: {
    source: {
      type: Array
    },
    popoverHeight: {
      type: String
    },
    selected: {
      type: Array,
      default: () => []
    },
    loadData: {
      type: Function
    }
  },
  data() {
    return {
      popoverVisible: false
    };
  },
  methods: {
    find(children, id) {
      let found = null;
      let findItem = (children, id) => {
        return children.forEach(child => {
          if (child.id === id) {
            found = child;
            return;
          }
          if (child.children && child.children.length > 0) {
            findItem(child.children, id);
          }
        });
      };
      findItem(children, id);
      return found;
    },
    onUpdateSelected(selected) {
      this.$emit("update:selected", selected);
      let lastItem = selected[selected.length - 1];
      let updateSource = result => {
        let copy = JSON.parse(JSON.stringify(this.source));
        let toUpdate = this.find(copy, lastItem.id);
        toUpdate.children = result;
        this.$emit("update:source", copy);
      };
      !lastItem.isLeaf && this.loadData && this.loadData(lastItem, updateSource);
    }
  },
  computed: {
    result() {
      return this.selected.map(item => item.name).join("/");
    }
  }
};
</script>

<style scoped lang="scss">
@import "var";

.cascader {
  position: relative;

  .trigger {
    border: 1px solid $border-color;
    border-radius: $border-radius;
    display: inline-flex;
    align-items: center;
    padding: 0 1em;
    height: $input-height;
    min-width: 10em;
  }

  .popover-wrapper {
    position: absolute;
    top: 100%;
    left: 0;
    @extend .box-shadow;
    background: #fff;
    margin-top: 4px;
    overflow: auto;
  }
}
</style>
