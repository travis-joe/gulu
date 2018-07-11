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
  let validator = (value) => Object.keys(value).every(val => ['span', 'offset'].includes(val))

  export default {
    name: "GuluCol",
    props: {
      span: [Number, String],
      offset: [Number, String],
      phone: {type: Object, validator,},
      ipad: {type: Object, validator,},
      narrowPc: {type: Object, validator,},
      pc: {type: Object, validator,},
      widePc: {type: Object, validator,},
    },
    data() {
      return {
        gutter: 0,
      }
    },
    computed: {
      colClass() {
        const {span, offset, phone, ipad, narrowPc, pc, widePc} = this;
        let phoneClass = [];
        let ipadClass = [];
        let narrowPcClass = [];
        let pcClass = [];
        let widePcClass = [];
        if (phone) {
          phoneClass = [`col-phone-${phone.span}`]
        }

        if (ipad) {
          ipadClass = [`col-ipad-${ipad.span}`, `offset-ipad-${ipad.offset}`]
        }
        if (narrowPc) {
          narrowPcClass = [`col-narrowPc-${narrowPc.span}`, `offset-narrowPc-${narrowPc.offset}`]
        }
        if (pc) {
          pcClass = [`col-pc-${pc.span}`, `offset-pc-${pc.offset}`]
        }
        if (widePc) {
          widePcClass = [`col-widePc-${widePc.span}`, `offset-widePc-${widePc.offset}`]
        }

        return [
          span && `col-${span}`,
          offset && `offset-${offset}`,
          ...phoneClass,
          ...ipadClass,
          ...narrowPcClass,
          ...pcClass,
          ...widePcClass
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


        @media (min-width: 577px){
            $prefix: col-ipad-;
            @for $n from 1 through 24 {
                &.#{$prefix}#{$n} {
                    width: ($n/24) * 100%;
                }
            }
            $prefix: offset-ipad-;
            @for $n from 1 through 24 {
                &.#{$prefix}#{$n} {
                    margin-left: ($n/24) * 100%;
                }
            }
        }
        @media (min-width: 768px)  {
            $prefix: col-narrowPc-;
            @for $n from 1 through 24 {
                &.#{$prefix}#{$n} {
                    width: ($n/24) * 100%;
                }
            }
            $prefix: offset-narrow-pc-;
            @for $n from 1 through 24 {
                &.#{$prefix}#{$n} {
                    margin-left: ($n/24) * 100%;
                }
            }
        }
        @media (min-width: 992px) {
            $prefix: col-pc-;
            @for $n from 1 through 24 {
                &.#{$prefix}#{$n} {
                    width: ($n/24) * 100%;
                }
            }
            $prefix: offset-pc-;
            @for $n from 1 through 24 {
                &.#{$prefix}#{$n} {
                    margin-left: ($n/24) * 100%;
                }
            }
        }

        @media (min-width: 1200px) {
            $prefix: col-wide-pc-;
            @for $n from 1 through 24 {
                &.#{$prefix}#{$n} {
                    width: ($n/24) * 100%;
                }
            }
            $prefix: offset-wide-pc-;
            @for $n from 1 through 24 {
                &.#{$prefix}#{$n} {
                    margin-left: ($n/24) * 100%;
                }
            }
        }
    }


</style>
