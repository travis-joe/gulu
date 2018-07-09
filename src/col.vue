<template>
    <div
            class="col"
            :class="colClass"
            :style="colStyle"
    >
        <slot></slot>
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
    },
    computed: {
      colClass() {
        const {span, offset} = this;
        return [
          span && `col-${span}`,
          offset && `offset-${offset}`
        ]
      },
      colStyle() {
        return {
          paddingLeft: `${this.gutter / 2}px`,
          paddingRight: `${this.gutter / 2}px`
        }
      }
    }
  };
</script>

<style scoped lang="scss">
    .col {
        height: 100px;
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
