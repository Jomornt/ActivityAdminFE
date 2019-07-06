<template>
  <div class="wrapper">
    <el-table
      :data="pageInfo.list"
      style="width: 100%">
      <el-table-column
        width="55">
      </el-table-column>
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        label="账号"
        prop="account"
        align="center">
      </el-table-column>
      <el-table-column
        label="昵称"
        prop="nickname"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="gender"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
       label="操作"
       align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
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
    <el-dialog
      title="提示"
      :visible.sync="blackVisible"
      width="30%"
      :modal-append-to-body="false">
      <span>确认要删除此用户吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="blackVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      top="8vh"
      :visible.sync="editVisible"
      :close-on-click-modal="false"
      width="50%"
      :modal-append-to-body="false">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="editInfo.account" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editInfo.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="editInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <template>
            <el-radio v-model="editInfo.gender" label="男">男</el-radio>
            <el-radio v-model="editInfo.gender" label="女">女</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="个人介绍">
          <template>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="editInfo.intro">
            </el-input>
          </template>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="editInfo.birth"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ShowMessage } from '@/common/js/util'
export default {
  name: 'UserTable',
  data () {
    return {
      pageInfo: Object,
      blackVisible: false,
      editVisible: false,
      currentPage: 1,
      currentAccount: '',
      pageSize: 8,
      editInfo: {
        account: '',
        password: '',
        nickname: '',
        intro: '',
        gender: '',
        birth: '',
        status: '',
        tips: 0
      }
    }
  },
  methods: {
    deleteUser () {
      let _this = this
      this.$delete(`/user/${this.currentAccount}`)
        .then((response) => {
          _this.blackVisible = false
          _this.handleTblChange()
          ShowMessage(response.code, response.msg)
        }).catch((error) => {
          console.log(error)
        })
    },
    updateUser () {
      let _this = this
      let data = this.editInfo
      this.$patch('/user', data)
        .then((response) => {
          _this.editVisible = false
          _this.handleTblChange()
          ShowMessage(response.code, response.msg)
        }).catch((error) => {
          console.log(error)
        })
    },
    handleCurrentChange (val) {
      let _this = this
      this.currentPage = val
      this.$fetch('/user', { pn: this.currentPage })
        .then((response) => {
          _this.pageInfo = response.data.pageInfo
        }).catch((error) => {
          console.log(error)
        })
    },
    handleDelete (row) {
      this.blackVisible = true
      this.currentAccount = row.account
    },
    handleEdit (row) {
      this.editVisible = true
      this.editInfo = row
    },
    handleTblChange () {
      let _this = this
      this.$fetch('/user', { pn: this.currentPage })
        .then((response) => {
          _this.pageInfo = response.data.pageInfo
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  mounted () {
    let _this = this
    this.$fetch('/user', { pn: this.currentPage })
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
    padding-top: 20px
  }
  .el-table-column{
    text-align:center;
  }
  el-table-column{
    text-align:center;
  }
</style>
