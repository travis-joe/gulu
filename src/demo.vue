<template>
  <div>
    <g-table
      :columns="columns"
      :data-source="dataSource"
      style="margin-top: 20px"
      :selected-items.sync="selected"
      bordered
      compact
      :striped="false"
    ></g-table>
    <g-pager
      :current.sync="current"
      :total="total"
      style="margin-top: 20px"
    ></g-pager>
  </div>
</template>
<script>
import GTable from "./table";
import GPager from "./pager";

export default {
  name: "demo",
  components: { GTable, GPager },
  data() {
    return {
      columns: [
        { text: "姓名", field: "name" },
        { text: "分数", field: "score" }
      ],
      selected: [],
      dataSource: [
        { id: 1, name: "芳芳", score: 100 },
        { id: 2, name: "圆圆", score: 99 },
        { id: 3, name: "三三", score: 99 },
        { id: 4, name: "思思", score: 99 },
        { id: 5, name: "佩佩", score: 99 },
        { id: 6, name: "煮至虾", score: 99 }
      ],
      current: 1,
      total: 20
    };
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  padding: 10px;
}
</style>
