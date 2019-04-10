<template>
    <div>
        <g-slides :selected.sync="selected">
            <g-slides-item name="1">
                <div class="box">
                    1
                </div>
            </g-slides-item>
            <g-slides-item name="2">
                <div class="box">
                    2
                </div>
            </g-slides-item>
            <g-slides-item name="3">
                <div class="box">
                    3
                </div>
            </g-slides-item>
        </g-slides>
    </div>
</template>
<script>
  import GSlides from "./slides";
  import GSlidesItem from "./slides-item";

  export default {
    name: "demo",
    components: {GSlides, GSlidesItem},
    data () {
      return {
        selected: undefined
      }
    }
  };
</script>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    img {
        max-width: 100%;
    }

    html {
        --font-size: 14px;
    }

    body {
        font-size: var(--font-size);
    }

    .box {
        width: 200px;
        height: 150px;
        background: #ddd;
        border: 1px solid red;
    }
</style>
