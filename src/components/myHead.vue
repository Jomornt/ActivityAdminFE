<template>
  <div class="wrapper">
    <div class="box">
      <div class="title">活动管理系统</div>
      <el-dropdown  class="person">
        <span class="el-dropdown-link hoverChange">
          {{account}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
              <div @click="pwdVisible = true">密码修改</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="logoutVisible = true">退出</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="logoutVisible"
      width="30%">
      <span>您确定要退出吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="logoutVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="密码修改"
      :visible.sync="pwdVisible"
      width="50%">
      <el-form
        label-position="right"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        hide-required-asterisk>
        <el-form-item
          label="旧密码"
          prop="oldPwd">
          <el-input
            placeholder="请输入旧密码"
            v-model="ruleForm.oldPwd"
            show-password></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPwd">
          <el-input
            placeholder="请输入新密码"
            v-model="ruleForm.newPwd"
            show-password></el-input>
        </el-form-item>
        <el-form-item
          label="确认新密码"
          prop="checkPwd">
          <el-input
            placeholder="请确认密码"
            v-model="ruleForm.checkPwd"
            show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pwdVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ShowMessage } from '@/common/js/util'
export default {
  name: 'myHead',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPwd !== '') {
          this.$refs.ruleForm.validateField('checkPwd')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      account: '',
      logoutVisible: false,
      pwdVisible: false,
      ruleForm: {
        oldPwd: '',
        newPwd: '',
        checkPwd: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPwd: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changePwd () {
      let _this = this
      let data = {
        account: this.account,
        oldPwd: this.ruleForm.oldPwd,
        newPwd: this.ruleForm.newPwd
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          _this.pwdVisible = false
          _this.$post('/admin/changepwd', data)
            .then((response) => {
              ShowMessage(response.code, response.msg)
            }).catch((error) => {
              console.log(error)
            })
          _this.$refs.ruleForm.resetFields()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    logout () {
      this.logoutVisible = false
      sessionStorage.removeItem('account')
      this.$router.push({ path: '/login' })
    }
  },
  mounted () {
    this.account = sessionStorage.account
  }
}
</script>

<style lang="stylus" scoped>
  a
    text-decoration none
  .wrapper
    background-color #ffffff
    .box
      height 45px
      line-height 45px
      display flex
      flex-direction row
      background-color #ffffff
      .title
        font-size 25px
        margin-left 10px
        font-weight bold
      .person
        position absolute
        right 20px
</style>
