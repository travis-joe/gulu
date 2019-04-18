<template>
    <div class="collapseItem">
        <div class="title" @click="toggle">
            {{title}}
        </div>
        <div class="content" v-if="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "GuluCollapseItem",
    props: {
      title: {
        type: String,
        require: true
      },
      name: {
        type: String,
        require: true
      },

    },
    data(){
      return {
        open: false,
        single:{
          type: Boolean,
          require: false
        }
      }
    },
    mounted(){
      this.eventBus && this.eventBus.$on('update:selected', (names) => {
        console.log(names)
        if(names.indexOf(this.name)>=0) {
          this.show()
        } else {
          this.close()
        }
      })
    },
    methods:{
      toggle(){
        if(this.open) {
          this.eventBus.$emit('update:removeSelected', this.name)
        } else {
          this.eventBus.$emit('update:addSelected', this.name)
        }
      },
      close() {
        this.open = false
      },
      show() {
        this.open = true
      },
    },
    inject: ['eventBus']
  }
</script>

<style scoped lang="scss">
    $grey: #ddd;
    $border-radius: 4px;
    .collapseItem {
        > .title {
            border: 1px solid $grey;
            margin-top: -1px;
            margin-right: -1px;
            margin-left: -1px;
            min-height: 32px;
            display: flex;
            align-items: center;
            padding: 0 8px;
            cursor: pointer;
        }

        &:first-of-type {
            > .title {
                border-top-left-radius: $border-radius;
                border-top-right-radius: $border-radius;
            }
        }
        &:last-of-type {
            > .title:last-child {
                border-radius: $border-radius;
            }
        }
        > .content {
            padding: 8px;

        }
    }
</style>