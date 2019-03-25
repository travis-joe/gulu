<template>
    <div class="cascaderItems">
        <div class="left">
            <div class="label" v-for="item in items" @click="leftSelected = item">{{item.name}}</div>
        </div>
        <div class="right" v-if="rightItems">
            <Cascader-Items :items="rightItems"></Cascader-Items>
        </div>
    </div>
</template>

<script>
  export default {
    name: "CascaderItems",
    props: {
      items: {
        type: Array
      }
    },
    data() {
        return {
          leftSelected: null
        }
    },
    computed: {
      rightItems() {
        if(this.leftSelected && this.leftSelected.children) {
          return this.leftSelected.children
        } else {
          return null
        }
      }
    }
  }

</script>

<style scoped lang="scss">
    .cascaderItems {
        display: flex;
        .left{
            border: 1px solid red;
        }
        .right{
        }
    }
</style>
