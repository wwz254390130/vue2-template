<template>
  <div class="my-up-loader">
    <el-upload
      ref="upload"
      class="avatar-uploader"
      action="upload.action"
      :auto-upload="true"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
import { fileUpload } from '@/api/common'

export default {
  data() {
    return {
      imageUrl: ''
    }
  },

  methods: {
    // 上传成功的回调
    handleAvatarSuccess(res) {
      if (res.code === 200) {
        this.$emit('upLoadImageUrlResult', res.data.url)
      } else {
        this.$message.error(res.msg)
      }
    },
    // 上传图片前的校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      // const isLt2M = file.size / 1024 / 1024 < 1
      const isLt2M = file.size < 102400
      console.log('file.size', file.size)
      if ((isJPG && isLt2M) || (isPNG && isLt2M)) {
        return true
      } else {
        this.$message.error(
          '上传的图片只能是JPG、PNG格式并且图片大小不能超过 100kB!'
        )
        return false
      }
    },
    upload(file) {
      const fd = new FormData()
      fd.append('file', file.file)
      fileUpload(fd).then(res => {
        if (res.code === 200) {
          this.imageUrl = res.data.filePath
          this.$emit('upLoadImageUrlResult', res.data.filePath)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 删除img地址
    delImgUrl() {
      this.imageUrl = ''
    }
  }
}
</script>
<style lang="scss" scope>
.my-up-loader {
  display: inline-block;
  width: 88px;
  height: 88px;

  .avatar-uploader {
    .el-upload {
      width: 100%;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .el-upload:hover {
      border-color: #409eff;
    }

    .avatar-uploader-icon {
      display: inline-block;
      font-size: 28px;
      color: #8c939d;
      height: 88px;
      line-height: 88px;
      text-align: center;
    }

    .avatar {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
