<template>
    <div
        class="col"
        :class="[span && `col-${span}`, offset && `offset-${offset}`]"
        :style="{paddingLeft: `${this.gutter/2}px`, paddingRight: `${this.gutter/2}px`}"
    >
        <div style="border: 1px solid green; height: 100px">
            <slot></slot>
        </div>

    </div>
</template>

<script>
  export default {
    name: "GuluCol",
    props: {
      span: [Number, String],
      offset: [Number, String],
    },
    data() {
      return {
        gutter: 0,
      }
    }
  };
</script>

<style scoped lang="scss">
    .col {
        height: 100px;
        width: 50%;
        $prefix: col-;
        @for $n from 1 through 24 {
            &.#{$prefix}#{$n} {
                width: ($n/24) * 100%;
            }
        }
        $prefix: offset-;
        @for $n from 1 through 24 {
            &.#{$prefix}#{$n} {
                margin-left: ($n/24) * 100%;
            }
        }
    }
</style>
