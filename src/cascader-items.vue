<template>
    <div class="cascaderItem">
        {{sourceItem.name}}
        <cascader-item v-for="item in sourceItem.children" v-if="sourceItem.children" :sourceItem="item"></cascader-item>
    </div>
</template>

<script>
  export default {
    name: "CascaderItem",
    props: {
      sourceItem: {
        type: Object
      }
    }
  }

</script>

<style scoped lang="scss">
    .cascaderItem {
        border: 1px solid red;
        margin: 10px;
    }
</style>
