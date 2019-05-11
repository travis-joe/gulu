<template>
  <div>
    <div>只能传300kb以内的png、jpeg</div>

    <g-uploader
      accept="/*"
      action="https://node-image-upload-service-1231.herokuapp.com/upload"
      name="file"
      method="POST"
      :parseImg="parseImg"
      :file-list.sync="fileList"
    >
      <g-button icon="upload">上传</g-button>
    </g-uploader>

    <g-button>保存</g-button>
  </div>
</template>
<script>
import GUploader from "./uploader";
import GButton from "./button/button";

export default {
  name: "demo",
  components: { GUploader, GButton },
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
