<template>
    <div class="popover" ref="popover">
        <div ref="contentWrapper"
             class="content-wrapper"
             v-if="visible"
             :class="{[`position-${position}`]: true}">
            <slot name="content" :close="close"></slot>
        </div>
        <span ref="triggerWrapper" class="trigger-wrapper">
            <slot></slot>
        </span>
    </div>
</template>

<script>
  export default {
    name: "GuluPopover",
    props: {
      position: {
        type: String,
        default: 'top',
        validator(value) {
          return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
        }
      },
      trigger: {
        type: String,
        default: 'click',
        validator(value) {
          return ['hover', 'click'].indexOf(value) >= 0
        }
      },
    },
    data() {
      return {
        visible: false,
      }
    },
    mounted() {
      if (this.trigger === 'click') {
        this.$refs.popover.addEventListener('click', this.onClick)
      } else {
        this.$refs.popover.addEventListener('mouseenter', this.open)
        this.$refs.popover.addEventListener('mouseleave', this.close)
      }
    },
    destroyed() {
      if (this.trigger === 'click') {
        this.$refs.popover.removeEventListener('click', this.onClick)
      } else {
        this.$refs.popover.removeEventListener('mouseenter', this.open)
        this.$refs.popover.removeEventListener('mouseleave', this.close)
      }
    },
    methods: {
      positionContent: function () {
        const {contentWrapper, triggerWrapper} = this.$refs
        document.body.appendChild(contentWrapper)
        const {height: contentHeight} = contentWrapper.getBoundingClientRect()
        const {width, height, top, left} = triggerWrapper.getBoundingClientRect()

        let positions = {
          top: {top: top + window.scrollY, left: left + window.scrollX,},
          bottom: {top: top + height + window.scrollY, left: left + window.scrollX},
          left: {
            top: top + window.scrollY + (height - contentHeight) / 2,
            left: left + window.scrollX
          },
          right: {
            top: top + window.scrollY + (height - contentHeight) / 2,
            left: left + window.scrollX + width
          },
        }
        contentWrapper.style.left = positions[this.position].left + 'px'
        contentWrapper.style.top = positions[this.position].top + 'px'
      },
      onClickDocument(e) {
        if (this.$refs.popover.contains(e.target) || this.$refs.contentWrapper.contains(e.target)) {
          return
        } else {
          this.close();
        }
      },
      open() {
        this.visible = true
        this.$nextTick(() => {
          this.positionContent();
          this.trigger === 'click' && document.addEventListener('click', this.onClickDocument)
        })
      },
      close() {
        this.visible = false
        document.removeEventListener('click', this.onClickDocument)
        console.log('关闭')
      },
      onClick(event) {
        if (this.$refs.triggerWrapper.contains(event.target)) {
          if (this.visible === true) {
            this.close()
          } else {
            this.open();
          }
        }
      }
    },
  }
</script>

<style scoped lang="scss">
    $border-color: #333;
    $border-radius: 4px;
    .popover {
        display: inline-block;
        vertical-align: top;
        position: relative;

        .trigger-wrapper {
            cursor: pointer;
            display: inline-block;
        }
    }

    .content-wrapper {
        position: absolute;
        border: 1px solid $border-color;
        border-radius: $border-radius;
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
        background: white;
        padding: .5em 1em;
        max-width: 20em;
        word-break: break-all;

        &::before, &::after {
            content: '';
            display: block;
            border: 10px solid transparent;
            width: 0;
            height: 0;
            position: absolute;
        }

        &.position-top {
            transform: translateY(-100%);
            margin-top: -10px;
            left: 10px;

            &::before {
                border-top-color: $border-color;
                top: 100%;
                border-bottom: none;
            }

            &::after {
                border-top-color: white;
                top: calc(100% - 1px);
                border-bottom: none;
            }
        }

        &.position-bottom {
            margin-top: 10px;
            left: 10px;

            &::before {
                border-bottom-color: $border-color;
                bottom: 100%;
                border-top: none;
            }

            &::after {
                border-bottom-color: white;
                bottom: calc(100% - 1px);
                border-top: none;
            }
        }

        &.position-left {
            transform: translateX(-100%);
            margin-left: -10px;

            &::before, &::after {
                transform: translateY(-50%);
                top: 50%;
                border-right: none;
            }

            &::before {
                border-left-color: $border-color;
                left: 100%;
            }

            &::after {
                border-left-color: white;
                left: calc(100% - 1px);
            }
        }

        &.position-right {
            margin-left: 10px;

            &::before, &::after {
                transform: translateY(-50%);
                top: 50%;
                border-left: none;
            }

            &::before {
                border-right-color: $border-color;
                right: 100%;
            }

            &::after {
                border-right-color: white;
                right: calc(100% - 1px);
            }
        }
    }


</style>
