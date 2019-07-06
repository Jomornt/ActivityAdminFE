<template>
  <div class="wrapper">
    <el-table
      ref="filterTable"
      :data="pageInfo.list"
      style="width: 100%">
      <el-table-column
        width="55">
      </el-table-column>
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        label="记录编号"
        prop="id"
        width="150px"
        align="center">
      </el-table-column>
      <el-table-column
        label="创建日期"
        prop="createtime"
        width="150px"
        align="center">
      </el-table-column>
      <el-table-column
        label="用户账号"
        prop="userId"
        align="center">
      </el-table-column>
      <el-table-column
        label="活动编号"
        prop="actId"
        align="center">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status"
        align="center">
      </el-table-column>
    </el-table>
    <div class="block pageSty">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  data () {
    return {
      pageInfo: Object,
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    handleCurrentChange (val) {
      let _this = this
      this.currentPage = val
      this.$fetch('/joinsm', { pn: this.currentPage })
        .then((response) => {
          _this.pageInfo = response.data.pageInfo
          console.log(_this.pageInfo)
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    let _this = this
    this.$fetch('/joinsm', { pn: this.currentPage })
      .then((response) => {
        _this.pageInfo = response.data.pageInfo
      }).catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
  .wrapper{
    margin-top: 15px;
    background-color: #ffffff;
  }
  .pageSty{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border: none;
    padding-top: 20px;
  }
  .el-table-column{
    text-align:center;
  }
  el-table-column{
    text-align:center;
  }
  .line{
    text-align: center;
  }
</style>
