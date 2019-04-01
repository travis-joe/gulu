<template>
    <div>
        <p>11111</p>
        <g-cascader
                :source.sync="source"
                :selected.sync="selected"
                popover-height="200px"
                :load-data="loadData"
        >
        </g-cascader>
        <p>22222</p>
    </div>
</template>
<script>
  import Button from "./button";
  import Cascader from "./cascader";
  import db from './db'


  function ajax(parentId = 0) {
    return new Promise((success, fail) => {
      const result = db.filter(item => item.parent_id === parentId)
      result.forEach(node => {
        if (db.filter(item => node.id === item.parent_id).length > 0) {
          node.isLeaf = false
        } else {
          node.isLeaf = true
        }
      })
      setTimeout(() => {
        success(result)
      }, 0)
    })
  }

  // console.log(ajax())
  export default {
    name: "demo",
    components: {
      "g-button": Button,
      "g-cascader": Cascader
    },
    data() {
      return {
        selected: [],
        source: []
      };
    },
    created() {
      ajax(0).then(result => this.source = result)
    },
    methods: {
      loadData(node, callback) {
        let {name, id, parent_id} = node
        ajax(id).then(result => {
          callback(result)
        })
      },
      onSelectedChange() {
        ajax(this.selected[0].id).then(result => {
          let lastSelected = this.source.filter(item => item.id === this.selected[0].id)[0]
          this.$set(lastSelected, 'children', result)
        })
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
</style>
