<template>
    <svg class="g-icon" @click="$emit('click', $event)" :style="{fill: color}">
        <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>

<script>
  import "./svg";
  export default {
    name: "GuluIcon",
    props: ["name","color"]
  };
</script>

<style scoped lang="scss">
    .g-icon {
        width: 1em;
        height: 1em;
    }
</style>
