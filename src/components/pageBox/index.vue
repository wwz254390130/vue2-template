<template>
  <!--分页公用 S-->
  <div class="pagination">
    <el-pagination
      :key="pageinfo.pageNo"
      :current-page.sync="pageinfo.pageNo"
      background
      layout="total, sizes, prev, pager, next"
      :total="totalCount"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageinfo.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
  <!--分页 E-->
</template>
<script>
export default {
  name: 'PageBox',
  props: {
    totalCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pageinfo: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    // 页数显示
    handleSizeChange(pageSize) {
      this.pageinfo.pageSize = pageSize
      this.$emit('pageChange', this.pageinfo)
    },
    // 点击页码触发
    handleCurrentChange(pageNo) {
      this.pageinfo.pageNo = pageNo
      this.$emit('pageChange', this.pageinfo)
    }
  }
}
</script>
