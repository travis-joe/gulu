<template>
    <div>
        <g-pager :total=20 :current.sync='current'></g-pager>
    </div>
</template>
<script>
  import GPager from "./pager";

  export default {
    name: "demo",
    components: {GPager},
    data(){
        return {
            current: 1
        }
    }
  };
</script>
<style>
    * {margin: 0; padding: 0; box-sizing: border-box;}
</style>
