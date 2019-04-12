<template>
  <div class="g-slides">
    <div class="g-slides-window">
      <div class="g-slides-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "g-slides",
  props: {
    selected: {
      type: String
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      lastSelectedIndex: undefined
    };
  },
  computed: {
    selectedIndex() {
      return this.names.indexOf(this.selected) || 0;
    },
    names() {
      return this.$children.map(vm => vm.name);
    }
  },
  mounted() {
    this.updateChildren();
    this.playAutomatically();
  },
  updated() {
    this.updateChildren();
  },
  methods: {
    select(index) {
      this.lastSelectedIndex = this.selectedIndex;
      this.$emit("update:selected", this.names[index]);
    },
    playAutomatically() {
      const run = () => {
        let index = this.names.indexOf(this.getSelected());
        let newIndex = index + 1;
        if (newIndex === -1) newIndex = this.names.length - 1;
        if (newIndex === this.names.length) newIndex = 0;
        this.select(newIndex);
        setTimeout(run, 3000);
      };
      setTimeout(run, 3000);
    },
    getSelected() {
      return this.selected || this.$children[0].name;
    },
    updateChildren() {
      this.$children.forEach(vm => {
        vm.reverse = this.selectedIndex <= this.lastSelectedIndex;
        this.$nextTick(() => {
          vm.selected = this.getSelected()
        })
      });
    }
  }
};
</script>

<style scoped lang="scss">
.g-slides {
  display: inline-block;

  &-window {
    overflow: hidden;
  }

  &-wrapper {
    position: relative;
  }
}
</style>
