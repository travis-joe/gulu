<template>
  <div class="gulu-uploader">
    <div @click="onClickUpload" ref="trigger">
      <slot></slot>
    </div>
    <div ref="inputWrapper" style="display: none"></div>
    <ol>
      <li v-for="file in fileList" :key="file.name">
        <div class="image-wrapper">
          <template v-if="file.status === 'uploading'">
            <icon name="loading" class="spin"></icon>
          </template>
          <template v-else-if="file.type.startsWith('image')">
            <img :src="file.url" alt="" width="30" height="30">
          </template>
        </div>

        <span class="gulu-uploader-name" :class="{[file.status]: file.status}">{{file.name}}</span>
        <button class="remove" @click="onRemoveFile(file)">x</button>
      </li>
    </ol>
  </div>
</template>

<script>
  import icon from './icon'
  export default {
    name: "GuluUploader",
    components:{icon},
    props: {
      name: {
        type: String,
        required: true
      },
      action: {
        type: String,
        required: true
      },
      method: {
        type: String,
        default: 'POST'
      },
      parseImg: {
        type: Function,
        required: true
      },
      fileList:{
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        url: 'about:blank'
      }
    },
    methods:{
      onRemoveFile(removeFile){
        if(window.confirm('确认删除')) {
          console.log(removeFile)
          this.$emit('update:fileList', this.fileList.filter(file => file.name !== removeFile.name))
        }
      },
      createInput(){
        const input = document.createElement('input')
        input.type = 'file'
        this.$refs.inputWrapper.appendChild(input)
        return input
      },
      beforeUploadFile(rawFile){
        rawFile.status = 'uploading'
        this.$emit('update:fileList', [...this.fileList, rawFile])
      },
      uploadFile(rawFile) {
        this.beforeUploadFile(rawFile)
        const formData = new FormData()
        formData.append(this.name, rawFile)
        this.doUploadFile(formData, (response) => {
          rawFile.url = this.parseImg(response)
          this.afterUploadFile(rawFile)
        }, () => {
          this.uploadError(rawFile)
        })
      },
      updateFileList(file) {
        const index = this.fileList.findIndex(f => f.name === file.name)
        const newFileList = [...this.fileList.splice(0, index), file, ...this.fileList.splice(index + 1)]
        this.$emit('update:fileList', newFileList)
      },
      afterUploadFile(file){
        file.status = 'uploaded'
        this.updateFileList(file);
      },
      uploadError(file){
        file.status = 'failed'
        this.updateFileList(file);
      },
      doUploadFile(formData, success, fail){
        const xhr = new XMLHttpRequest()
        xhr.open(this.method, this.action)
        xhr.onload = () => {
          success(xhr.response)
        }
        xhr.onerror = () => {
          fail()
        }
        xhr.send(formData)
      },
      onClickUpload() {
        const input = this.createInput()
        input.addEventListener('change', () => {
          this.uploadFile(input.files[0])
          input.remove()
        })
        input.click()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/var";

  .gulu-uploader{
    ol{
      list-style: none;
      > li{
        display: flex;
        align-items: center;
        margin: 8px 0;
        border: 1px solid $grey;
        .spin{
          width:32px;
          height: 32px;
          font-size: 12px;
          @include spin;
        }
      }
      .image-wrapper{
        margin-right: 8px;
      }
    }
    .remove{
      width: 32px;
      height: 32px;
    }
    &-name{
      margin-right: auto;
      &.uploaded{
        color: green;
      }
      &.failed{
        color: red;
      }
      &.uploading{
        color: blue;
      }
    }
  }
</style>
