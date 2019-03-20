<template>
    <div class="popover" @click="onClick" ref="popover">
        <div ref="contentWrapper"
             class="content-wrapper"
             v-if="visible"
             :class="{[`position-${position}`]: true}">
            <slot name="content"></slot>
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
      }
    },
    data() {
      return {visible: false}
    },
    methods: {
      positionContent: function () {
        const {contentWrapper, triggerWrapper} = this.$refs
        document.body.appendChild(contentWrapper)
        let {width, height, top, left} = triggerWrapper.getBoundingClientRect()
        if (this.position === 'top') {
          contentWrapper.style.left = left + window.scrollX + 'px'
          contentWrapper.style.top = top + window.scrollY + 'px'
        } else if (this.position === 'bottom') {
          contentWrapper.style.left = left + window.scrollX + 'px'
          contentWrapper.style.top = top + height + window.scrollY + 'px'
        } else if (this.position === 'left') {
          contentWrapper.style.left = left + window.scrollX + 'px'
          let {height: height2} = contentWrapper.getBoundingClientRect()
          contentWrapper.style.top = top + window.scrollY +
              (height - height2) / 2 + 'px'
        } else if (this.position === 'right') {
          contentWrapper.style.left = left + window.scrollX + width + 'px'
          let {height: height2} = contentWrapper.getBoundingClientRect()
          contentWrapper.style.top = top + window.scrollY +
              (height - height2) / 2 + 'px'
        }
      },
      onClickDocument(e) {
        if (this.$refs.popover === e.target || this.$refs.contentWrapper.contains(e.target)) {
          return
        } else {
          this.close();
        }
      },
      open() {
        this.visible = true
        this.$nextTick(() => {
          this.positionContent();
          document.addEventListener('click', this.onClickDocument)
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
            }

            &::after {
                border-top-color: white;
                top: calc(100% - 1px);
            }
        }

        &.position-bottom {
            margin-top: 10px;
            left: 10px;

            &::before {
                border-bottom-color: $border-color;
                bottom: 100%;
            }

            &::after {
                border-bottom-color: white;
                bottom: calc(100% - 1px);
            }
        }

        &.position-left {
            transform: translateX(-100%);
            margin-left: -10px;
            &::before, &::after {
                transform: translateY(-50%);
                top: 50%;
            }
            &::before {
                border-left-color: black;
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
            }
            &::before {
                border-right-color: black;
                right: 100%;
            }
            &::after {
                border-right-color: white;
                right: calc(100% - 1px);
            }
        }
    }


</style>