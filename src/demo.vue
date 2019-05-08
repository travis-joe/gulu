<template>
  <div>
    <g-uploader
      accept="/*"
      action="https://node-image-upload-service-1231.herokuapp.com/upload"
      name="file"
      method="POST"
    >
      <button>上传</button>
      <template slot="tips">
        <div>只能传300kb以内的png、jpeg</div>
      </template>
    </g-uploader>
    <button>保存</button>
  </div>
</template>
<script>
import GUploader from "./uploader";

export default {
  name: "demo",
  components: { GUploader },
  data() {
    return {
      columns: [
        { text: "姓名", field: "name", width: 100,},
        { text: "分数", field: "score"}
      ],
      orderBy:{
        name: 'asc',
        score: 'desc'
      },
      selected: [],
      dataSource: [
        { id: 1, name: "芳芳", score: 100, description: "xxxx xxxxx"},
        { id: 2, name: "圆圆", score: 99, description: "xxxx xxxxx"},
        { id: 3, name: "三三", score: 99 },
        { id: 4, name: "思思", score: 99 },
        { id: 5, name: "佩佩", score: 99 },
        { id: 6, name: "煮至虾", score: 99 },
        { id: 11, name: "芳芳", score: 100 },
        { id: 12, name: "圆圆", score: 99 },
        { id: 13, name: "三三", score: 99 },
        { id: 14, name: "思思", score: 99 },
        { id: 15, name: "佩佩", score: 99 },
        { id: 16, name: "煮至虾", score: 99 },
        { id: 21, name: "芳芳", score: 100 },
        { id: 22, name: "圆圆", score: 1 },
        { id: 23, name: "三三", score: 99 },
        { id: 24, name: "思思", score: 99 },
        { id: 25, name: "佩佩", score: 99 },
        { id: 26, name: "煮至虾", score: 99 },
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
