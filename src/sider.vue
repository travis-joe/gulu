<template>
    <transition name="fade">
        <div class="sider" v-if="visiable">
            <slot></slot>
            <button @click="visiable=false">close</button>
        </div>
    </transition>

</template>

<script>
  export default {
    name: "GuluSider",
    data() {
      return {
        visiable: true
      }
    },
  }
</script>

<style scoped lang="scss">
    .sider{
        position: relative;
        >button {
            position: absolute;
            top:0;
            right: 0;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: transform .3s;
    }
    .fade-enter, .fade-leave-to {
        margin-left: -200px;
    }
</style>