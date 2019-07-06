<template>
  <div>
    <el-table
      :data="pageInfo.list"
      style="width: 100%">
      <el-table-column
        width="55">
      </el-table-column>
      <el-table-column
        label="日期"
        sortable
        prop="createtime">
      </el-table-column>
      <el-table-column
        label="创建者"
        prop="creator">
      </el-table-column>
      <el-table-column
        label="标题"
        prop="title">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table><br>
    <div class="block pageNum">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
    <el-dialog
      title="内容"
      :modal-append-to-body='false'
      :visible.sync="dialogContentVisible">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 8}"
        v-model="currentContent"
        disabled="">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogContentVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageInfo: Object,
      dialogFormVisible: false,
      dialogContentVisible: false,
      formLabelWidth: '120px',
      form: {
        title: '',
        content: '',
        account: sessionStorage.account
      },
      pageSize: 8,
      currentPage: 1,
      currentContent: ''
    }
  },
  methods: {
    handleEdit (index, row) {
      this.dialogContentVisible = true
      this.currentContent = this.pageInfo.list[index].content
    },
    handleCurrentChange (val) {
      let _this = this
      this.currentPage = val
      this.$fetch('/feedback', { pn: val })
        .then((response) => {
          _this.pageInfo = response.data.pageInfo
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    let _this = this
    this.$fetch('/feedback', { pn: 1 })
      .then((response) => {
        _this.pageInfo = response.data.pageInfo
      }).catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
el-button{
  color: black;
}
.pageNum{
  display: flex;
  justify-content: center;
  align-items: center;
}
el-tabs{
  background-color: white;
  color: aliceblue;
}
.addBtn{
  border: 1px soli black;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
