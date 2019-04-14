<template>
    <div class="g-slides" @mouseenter="pause" @mouseleave="resume">
        <div class="g-slides-window">
            <div class="g-slides-wrapper">
                <slot></slot>
            </div>
        </div>
        <div class="g-slides-dots">
      <span
              v-for="n in childrenLength"
              :class="{ active: selectedIndex === n - 1 }"
              @click="select(n - 1)"
      >{{ n - 1 }}</span
      >
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
        default: false
      }
    },
    data() {
      return {
        lastSelectedIndex: undefined,
        childrenLength: 0,
        timerId: undefined
      };
    },
    computed: {
      selectedIndex() {
        if (!this.selected) return 0;
        return this.names.indexOf(this.selected) || 0;
      },
      names() {
        return this.$children.map(vm => vm.name);
      }
    },
    mounted() {
      // this.updateChildren();
      // this.autoPlay && this.playAutomatically();
      this.childrenLength = this.$children.length;
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
        if (this.timerId) return;
        const run = () => {
          let index = this.names.indexOf(this.getSelected());
          let newIndex = index - 1;
          if (newIndex === -1) newIndex = this.names.length - 1;
          if (newIndex === this.names.length) newIndex = 0;
          this.select(newIndex);
          this.timerId = setTimeout(run, 3000);
        };
        this.timerId = setTimeout(run, 3000);
      },
      pause() {
        clearTimeout(this.timerId);
        this.timerId = undefined;
      },
      resume() {
        this.autoPlay && this.playAutomatically();
      },
      getSelected() {
        return this.selected || this.$children[0].name;
      },
      updateChildren() {
        this.$children.forEach(vm => {
          let reverse = this.selectedIndex <= this.lastSelectedIndex;
          if (
            this.lastSelectedIndex === this.childrenLength - 1 &&
            this.timerId &&
            (this.selectedIndex === 0 || this.lastSelectedIndex === 0)
          ) {
            reverse = false;
          }
          vm.reverse = reverse;
          this.$nextTick(() => {
            vm.selected = this.getSelected();
          });
        });
      }
    }
  };
</script>

<style scoped lang="scss">
    .g-slides {
        &-window {
            overflow: hidden;
        }

        &-wrapper {
            position: relative;
        }

        &-dots {
            padding: 8px 0;
            display: flex;
            align-items: center;
            justify-content: center;

            > span {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                margin: 0 8px;
                background: #ddd;
                font-size: 12px;
                &:hover {
                    cursor: pointer;
                }

                &.active {
                    background: black;
                    color: #fff;
                    &:hover {
                        cursor: default;
                    }
                }
            }

        }
    }
</style>
