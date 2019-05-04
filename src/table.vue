<template>
  <div class="gulu-table-wrapper">
    <table class="gulu-table" :class="{bordered, compact, striped }">
      <thead>
        <tr>
          <th><input type="checkbox" @change="onChangeAll" ref="allChecked"></th>
          <th v-if="numberVisible">#</th>
          <th v-for="column in columns" :key="column.field">
            {{ column.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataSource" :key="item.id">
          <td>
            <input
            type="checkbox"
            @change="onChangeItem(item, index, $event)"
            :checked="selectedItems.filter(i => i.id===item.id).length > 0"
            >
          </td>
          <td v-if="numberVisible">{{ index + 1 }}</td>
          <template v-for="column in columns">
            <td :key="column.field">{{ item[column.field] }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "GuluTable",
  props: {
    columns: {
      type: Array,
      required: true
    },
    dataSource: {
      type: Array,
      required: true,
      validator(array){
        return !(array.filter(i => i.id === undefined).length > 0)
      }
    },
    numberVisible: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type:Boolean,
      default: false,
    },
    compact: {
      type:Boolean,
      default: false,
    },
    striped: {
      type:Boolean,
      default: true,
    },
    selectedItems:{
      type: Array,
      default: () => []
    }
  },
  watch:{
    selectedItems() {
      const a = this.dataSource.map(i => i.id).sort()
      const b = this.selectedItems.map(i => i.id).sort()
      if(this.isEqual(a,b)) {
        this.$refs.allChecked.indeterminate = false
        this.$refs.allChecked.checked = true
      } else this.$refs.allChecked.indeterminate = this.selectedItems.length !== 0;
    }
  },
  methods:{
    isEqual(a,b){
      let equal = false
      if(a.length === b.length) {
        for(let i = 0; i< a.length; i ++) {
          if(a[i] !== b[i]){
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
      if(checked){
        this.selectedItems.push(item)
      } else {
        this.selectedItems = this.selectedItems.filter(i => i.id !== item.id)
      }
      this.$emit('update:selectedItems', this.selectedItems)
    },
    onChangeAll(e){
      let checked = e.target.checked;
      console.log(e.target.checked)
      this.$emit('update:selectedItems', checked? this.dataSource: [])
    }
  }
};
</script>

<style scoped lang="scss">
  @import "../styles/var";
  $grey: darken($grey, 10%);
  .gulu-table{
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid $grey;
    &.bordered{
      border: 1px solid $grey;
      td, th{
        border: 1px solid $grey;
      }
    }
    &.compact {
      td, th{
        padding: 4px;
      }
    }
    td, th{
      border-bottom: 1px solid $grey;
      text-align: left;
      padding: 8px;
    }
    &.striped{
      tbody{
        >tr {
          &:nth-child(odd){
            background: white;
          }
          &:nth-child(even){
            background: lighten($grey, 15%);
          }
        }
      }
    }

  }
</style>
