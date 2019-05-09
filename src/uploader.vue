<template>
  <div class="gulu-uploader">
    <div @click="onClickUpload" ref="trigger">
      <slot></slot>
    </div>
    <div ref="inputWrapper" style="display: none"></div>
    <ol>
      <li v-for="file in fileList" :key="file.name">
        <img :src="file.url" alt="">
        {{file.name}}
        {{file.status}}
        <button @click="onRemoveFile(file)">x</button>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: "GuluUploader",
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
      afterUploadFile(file){
        file.status = 'uploaded'
        console.log(file)
        console.log(this.fileList)
        const newFileList = this.fileList.filter(old => old.name === file.name)
        this.$emit('update:fileList', newFileList)
      },
      uploadFile(rawFile) {
        this.beforeUploadFile(rawFile)
        const formData = new FormData()
        formData.append(this.name, rawFile)
        this.request(formData, (response) => {
          rawFile.url = this.parseImg(response)
          this.afterUploadFile(rawFile)
        })
      },
      request(formData, success){
        const xhr = new XMLHttpRequest()
        xhr.open(this.method, this.action)
        xhr.onload = () => {
          success(xhr.response)
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
  .gulu-uploader{
    ol{
      list-style: none;
    }
  }
</style>
