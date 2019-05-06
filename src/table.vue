<template>
  <div class="gulu-table-wrapper"  ref="wrapper">
    <div :style="{height, overflow: 'auto'}" ref="table-wrapper">
      <table :class="{bordered, compact, striped }" class="gulu-table" ref="table">
        <thead>
        <tr>
          <th :style="{width: '50px'}"><input @change="onChangeAll" ref="allChecked" type="checkbox"></th>
          <th v-if="numberVisible" :style="{width: '50px'}">#</th>
          <th :key="column.field" v-for="column in columns" :style="{width: column.width+'px'}">
            {{ column.text }}
            <span class="gulu-table-sorter" v-if="column.field in orderBy" @click="changeOrderBy(column.field)">
            <g-icon name="asc" :class="{active: orderBy[column.field] === 'asc'}"></g-icon>
            <g-icon name="desc" :class="{active: orderBy[column.field] === 'desc'}"></g-icon>
          </span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr :key="item.id" v-for="(item, index) in dataSource">
          <td :style="{width: '50px'}">
            <input
              :checked="selectedItems.filter(i => i.id===item.id).length > 0"
              @change="onChangeItem(item, index, $event)"
              type="checkbox"
            >
          </td>
          <td v-if="numberVisible" :style="{width: '50px'}">{{ index + 1 }}</td>
          <template v-for="column in columns">
            <td :key="column.field" :style="{width: column.width+'px'}">{{ item[column.field] }}</td>
          </template>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="gulu-table-loading" v-if="loading">
      <g-icon name="loading"></g-icon>
    </div>
  </div>
</template>

<script>
  import GIcon from './icon'
  export default {
    name: "GuluTable",
    components:{GIcon},
    mounted() {
      let originTable = this.$refs.table
      let tHead = originTable.children[0]
      let cloneTable = originTable.cloneNode(false)
      let {height} = tHead.getBoundingClientRect()
      this.$refs['table-wrapper'].style.marginTop = height + 'px'
      console.log(parseInt(this.height) - height)
      this.$refs['table-wrapper'].style.height = parseInt(this.height) - height + 'px'
      cloneTable.classList.add('gulu-table-cloned')
      cloneTable.appendChild(tHead)
      this.$refs.wrapper.append(cloneTable)
    },
    props: {
      height: {
        type: Number,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      columns: {
        type: Array,
        required: true
      },
      dataSource: {
        type: Array,
        required: true,
        validator(array) {
          return !(array.filter(i => i.id === undefined).length > 0)
        }
      },
      orderBy:{
        type: Object,
        default: ()=>{}
      },
      numberVisible: {
        type: Boolean,
        default: false,
      },
      bordered: {
        type: Boolean,
        default: false,
      },
      compact: {
        type: Boolean,
        default: false,
      },
      striped: {
        type: Boolean,
        default: true,
      },
      selectedItems: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      selectedItems() {
        const a = this.dataSource.map(i => i.id).sort()
        const b = this.selectedItems.map(i => i.id).sort()
        if (this.isEqual(a, b)) {
          this.$refs.allChecked.indeterminate = false
          this.$refs.allChecked.checked = true
        } else this.$refs.allChecked.indeterminate = this.selectedItems.length !== 0;
      }
    },
    methods: {
      changeOrderBy(key) {
        const copy = JSON.parse(JSON.stringify(this.orderBy))
        let oldValue = copy[key]
        if(oldValue === 'asc'){
          copy[key] = 'desc'
        }else if(oldValue === 'desc'){
          copy[key] = true
        } else {
          copy[key] = 'asc'
        }
        this.$emit('update:orderBy', copy)
      },
      isEqual(a, b) {
        let equal = false
        if (a.length === b.length) {
          for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
              equal = false
              break
            }
          }
          equal = true
        }
        return equal
      },
      onChangeItem(item, index, e) {
        let checked = e.target.checked;
        if (checked) {
          this.selectedItems.push(item)
          this.$emit('update:selectedItems', this.selectedItems)
        } else {
          this.$emit('update:selectedItems', this.selectedItems.filter(i => i.id !== item.id))
        }
      },
      onChangeAll(e) {
        let checked = e.target.checked;
        console.log(e.target.checked)
        this.$emit('update:selectedItems', checked ? this.dataSource : [])
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../styles/var";

  $grey: darken($grey, 10%);
  .gulu-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid $grey;
    background: #fff;
    &-cloned {
      position: absolute;
      top:0;
      left:0;
      width: 100%;
    }
    &-wrapper {
      position: relative;
      overflow: hidden;
    }
    &-loading {
      background: rgba(255, 255, 255, 0.8);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height:100%;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 40px;
        height: 40px;
        @include spin;
      }
    }
    &.bordered {
      border: 1px solid $grey;

      td, th {
        border: 1px solid $grey;
      }
    }

    &.compact {
      td, th {
        padding: 4px;
      }
    }

    td, th {
      border-bottom: 1px solid $grey;
      text-align: left;
      padding: 8px;
    }

    &.striped {
      tbody {
        > tr {
          &:nth-child(odd) {
            background: white;
          }

          &:nth-child(even) {
            background: lighten($grey, 15%);
          }
        }
      }
    }
    &-sorter{
      display: inline-flex;
      flex-direction: column;
      vertical-align: super;
      margin: 0 2px;
      svg{
        width:8px;
        height: 8px;
        fill: $grey;
        cursor: pointer;
        &.active {
          fill:red;
        }
        &:first-child{
          position: relative;
          bottom: -1px;
        }
        &:last-child{
          position: relative;
          top: -1px;
        }
      }
    }
  }
</style>
