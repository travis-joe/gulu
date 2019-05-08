<template>
  <div class="gulu-uploader">
    <div @click="onClickUpload" ref="trigger">
      <slot></slot>

    </div>
    <div ref="inputWrapper" style="display: none"></div>
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
      }
    },
    methods:{
      onClickUpload() {
        const input = document.createElement('input')
        input.type = 'file'
        this.$refs.inputWrapper.appendChild(input)
        input.addEventListener('change', () => {
          const file = input.files[0]

          console.log(file)
          const formData = new FormData()
          formData.append(this.name, file)

          const xhr = new XMLHttpRequest()
          xhr.open(this.method, this.action)
          xhr.onload = (res) => {
            console.log(xhr.response)
          }
          xhr.send(formData)
        })
        input.click()
      }
    }
  }
</script>

<style scoped lang="scss">
  .gulu-uploader{

  }
</style>
