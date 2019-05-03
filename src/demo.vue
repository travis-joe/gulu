<template>
    <div>
        <g-pager :total=20 :current=3></g-pager>
    </div>
</template>
<script>
  import GPager from "./pager";

  export default {
    name: "demo",
    components: {GPager},
  };
</script>
<style>
    * {margin: 0; padding: 0; box-sizing: border-box;}
</style>
