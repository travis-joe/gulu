<template>
    <div class="wrapper" :class="{error}">
        <input type="text" :value="value" :disabled="disabled" :readonly="readonly"
               @change="$emit('change', $event.target.value)"
               @focus="$emit('focus', $event.target.value)"
               @blur="$emit('blur', $event.target.value)"
               @input="$emit('input', $event.target.value)"
        >
        <template v-if="error">
            <Icon name="error" class="icon-error"></Icon>
            <span class="errorMessage">{{error}}</span>
        </template>
    </div>
</template>

<script>
  import Icon from './icon'

  export default {
    name: "GuluInput",
    components: {Icon},
    props: {
      value: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      error: {
        type: String
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "var";
    .wrapper {
        font-size: $font-size;display: inline-flex;align-items: center;
        > :not(:last-child){
            margin-right: 0.5em;
        }
        > input {height: $input-height;border: 1px solid $border-color;border-radius: $border-radius;padding: 0 8px;font-size: inherit;
            &:hover {border-color: $border-color-hover;}
            &:focus {box-shadow: inset 0 1px 3px $box-shadow-color;outline: none;}
            &[disabled], &[readonly] {border-color: #aaa;color: #aaa;}
        }
        &.error {
            > input {border-color: $red;}
        }
        .icon-error {fill: $red;}
        .errorMessage {color: $red; font-size: 12px}
    }
</style>
