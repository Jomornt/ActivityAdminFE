<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      default-active="1">
      <el-menu-item index="1">通知中心</el-menu-item>
      <div class="addBtn">
        <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true"></el-button>
      </div>
    </el-menu>
    <div class="divide"></div>
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
    <!-- dialog -->
    <el-dialog
      title="新建通知"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body='false'
      label-width="80px">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="发送者">
          <el-col :span="8">
            <el-input v-model="form.account" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="内容">
          <template>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              v-model="form.content">
            </el-input>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createNotify">确 定</el-button>
      </div>
    </el-dialog>
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
import { ShowMessage } from '@/common/js/util'
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
      pageSize: 6,
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
      this.$fetch('/notify', { pn: val })
        .then((response) => {
          _this.pageInfo = response.data.pageInfo
        }).catch((error) => {
          console.log(error)
        })
    },
    createNotify () {
      let _this = this
      let data = {
        creator: this.form.account,
        title: this.form.title,
        content: this.form.content
      }
      this.$post('/notify', data)
        .then((response) => {
          ShowMessage(response.code, response.msg)
        }).catch((error) => {
          console.log(error)
        })
      _this.form.title = ''
      _this.form.content = ''
      _this.dialogFormVisible = false
    }
  },
  mounted () {
    let _this = this
    this.$fetch('/notify', { pn: 1 })
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
.divide{
  margin-top: 20px;
}
.addBtn{
  border: 1px soli black;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
