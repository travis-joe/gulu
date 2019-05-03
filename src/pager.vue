<template>
  <div class="gulu-pager">
    <span v-for="page in pages" class="gulu-pager-item" :class="{active: page === current, separator: page === '...'}">
      {{ page }}
    </span>
  </div>
</template>

<script>
export default {
  name: "GuluPager",
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
  data() {
    let pages = [...new Set([
      1,
      this.current - 2,
      this.current - 1,
      this.current,
      this.current + 1,
      this.current + 2,
      this.total
    ])]
      .sort((a, b) => a - b)
      .reduce((prev, current, index, array) => {
      prev.push(current);
      if (array[index + 1] - array[index] > 1) {
        prev.push("...");
      }
      return prev;
    }, []);

    return {
      pages
    };
  }
};
</script>

<style scoped lang="scss">
  @import "../styles/var";
  .gulu-pager{
    &-item {
      border: 1px solid #e1e1e1;
      border-radius: $border-radius;
      padding: 0 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      min-width: 20px;
      height: 20px;
      margin: 0 4px;
      cursor: pointer;
      &.active, &:hover{
        border-color: $blue;
      }
      &.active, &.separator {
        cursor: default;
      }
      &.separator{
        border: none;
      }
    }
  }
</style>
