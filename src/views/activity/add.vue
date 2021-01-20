<template>
  <div class="container">
    <el-form ref="ruleForm" class="form-data" :model="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name" class="width-500"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-date-picker
          v-model="ruleForm.date1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="pickerChange"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动规则">
        <Tinymce id="content" v-model="ruleForm.intro" :height="600" :width="750"></Tinymce>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="onBack">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { activityAdd, activityEdit } from '@/api/activity'
export default {
  components: { Tinymce },
  data() {
    return {

      ruleForm: {
        id: '',
        name: '',
        date1: '',
        beginTime: '',
        endTime: '',
        intro: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        beginTime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      const data = JSON.parse(sessionStorage.getItem('activityData'))
      this.ruleForm = data
      this.ruleForm.date1 = [data.beginTime, data.endTime]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.id) {
            activityEdit(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                sessionStorage.removeItem('activityData')
                this.$router.back()
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            activityAdd(this.ruleForm).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                this.$router.back()
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onBack() {
      this.$router.back()
    },
    pickerChange(value) {
      this.ruleForm.beginTime = value[0]
      this.ruleForm.endTime = value[1]
      console.log(value)
      console.log('this.ruleForm.beginTime', this.ruleForm)
    }
  }
}
</script>
<style lang="scss" scoped>
.form-data {
  max-width: 800px;
}
.width-500 {
  width: 500px;
}
</style>
