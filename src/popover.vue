<template>
    <div class="popover" @click="onClick">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible" >
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper">
            <slot></slot>
        </span>
    </div>
</template>

<script>
  export default {
    name: "GuluPopover",
    data() {
      return {visible: false}
    },
    methods: {
      onClick() {
        this.visible = !this.visible
        let hide = () => {
          this.visible = false;
          document.removeEventListener('click', hide)
          console.log('来自hide的关闭')
        }
        if (this.visible === true) {
          this.$nextTick(() => {
            document.body.appendChild(this.$refs.contentWrapper)
            let {width, height, top, left} = this.$refs.triggerWrapper.getBoundingClientRect();
            this.$refs.contentWrapper.style.left = left+window.scrollX + 'px'
            this.$refs.contentWrapper.style.top = top+window.scrollY + 'px'
            document.addEventListener('click', hide)
          })
        } else {
          setTimeout(() => {
            console.log('关闭')
            document.removeEventListener('click', hide)
          })
        }
      }
    },
  }
</script>

<style scoped lang="scss">
    .popover {
        display: inline-block;
        vertical-align: top;
        position: relative;
    }
    .content-wrapper {
        position: absolute;
        border: 1px solid red;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        transform: translateY(-100%);
    }

</style>