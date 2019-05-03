<template>
  <div class="gulu-pager" :class="{hide: hideIfOnePage && total <= 1}">
    <span
      class="gulu-pager-nav"
      :class="{ disabled: current === 1 }"
      @click="onClickPage(current - 1)"
      ><g-icon name="left"
    /></span>
    <span
      v-for="page in pages"
      class="gulu-pager-item"
      :class="{ active: page === current, separator: page === '...' }"
      @click="onClickPage(page)"
    >
      {{ page }}
    </span>
    <span
      class="gulu-pager-nav"
      :class="{ disabled: current === total }"
      @click="onClickPage(current + 1)"
    >
      <g-icon name="right" />
    </span>
  </div>
</template>

<script>
import GIcon from "./icon";
export default {
  name: "GuluPager",
  components: { GIcon },
  props: {
    total: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    hideIfOnePage: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    pages() {
      return [
        ...new Set([
          1,
          this.current - 2,
          this.current - 1,
          this.current,
          this.current + 1,
          this.current + 2,
          this.total
        ])
      ]
        .filter(n => n >= 1 && n <= this.total)
        .sort((a, b) => a - b)
        .reduce((prev, current, index, array) => {
          prev.push(current);
          if (array[index + 1] - array[index] > 1) {
            prev.push("...");
          }
          return prev;
        }, []);
    }
  },
  methods: {
    onClickPage(n) {
      if (n >= 1 && n <= this.total) {
        this.$emit("update:current", n);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../styles/var";

.gulu-pager {
  &.hide{
    display: none;
  }
  display: flex;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
  > span {
    min-width: 20px;
    height: 20px;
    font-size: 12px;
    margin: 0 4px;
    border-radius: $border-radius;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  &-nav {
    background: $grey;
    &.disabled {
      cursor: default;
      svg {
        fill: darken($grey, 30%);
      }
    }
  }
  &-item {
    border: 1px solid #e1e1e1;
    padding: 0 4px;
    &.active,
    &:hover {
      border-color: $blue;
    }

    &.active,
    &.separator {
      cursor: default;
    }

    &.separator {
      border: none;
    }
  }
}
</style>
