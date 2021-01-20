<template>
  <div class="container">
    <el-form :inline="true" :model="formInfo" class="demo-form-inline">
      <el-form-item label="活动名称">
        <el-input v-model="formInfo.name" placeholder="活动名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-button class="float-right" type="primary" @click="$router.push('/activity/add')">新增</el-button>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="50" align="center"></el-table-column>
      <el-table-column prop="name" label="活动名称" align="center"></el-table-column>
      <el-table-column prop="createdTime" label="活动创建时间" align="center"></el-table-column>
      <el-table-column prop="beginTime" label="活动开始时间" align="center"></el-table-column>
      <el-table-column prop="endTime" label="活动结束时间" align="center"></el-table-column>
      <el-table-column prop="intro" label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
          <el-button type="text" size="small" @click="addPrize(scope.row)">添加奖品</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pageBox :total-count="totalCount" @pageChange="getData"></pageBox>
  </div>
</template>
<script>
import { activityList, activityDel } from '@/api/activity'
import pageBox from '@/components/pageBox/index.vue'
export default {
  components: { pageBox },
  data() {
    return {
      totalCount: 0,
      formInfo: {
        name: '',
        pageNo: 1,
        pageSize: 10
      },
      tableData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(data) {
      activityList({ ...this.formInfo, ...data }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.records
          this.totalCount = res.data.total
        }
      })
    },
    onSubmit() {
      this.getData()
    },
    edit(data) {
      sessionStorage.setItem('activityData', JSON.stringify(data))
      this.$router.push('/activity/add?id=' + data.id)
    },
    del(id) {
      this.$confirm('你确定要删除嘛?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        activityDel(id).then((res) => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getData()
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addPrize(data) {
      this.$router.push(`/prize/list?id=${data.id}&name=${data.name}`)
    },
    handleClick(data) { }
  }
}
</script>
<style lang="scss" scoped>
</style>
