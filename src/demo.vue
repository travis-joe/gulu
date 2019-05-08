<template>
  <div>
    <g-uploader
      accept="/*"
      action="https://node-image-upload-service-1231.herokuapp.com/upload"
      name="file"
      method="POST"
      :parseImg="parseImg"
      :file-list.sync="fileList"
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
      fileList: []
    }
  },
  methods: {
    parseImg(res) {
     return `https://node-image-upload-service-1231.herokuapp.com/preview/${res}`
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
html {
  padding: 10px;
}
</style>
