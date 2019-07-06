<template>
  <div class="wrapper">
    <el-form class="box" :model="ruleForm" :rules="rules" ref="ruleForm">
      <h2 class="title">登录</h2>
      <el-form-item prop="account">
        <el-input
          class="inputClass"
          placeholder="请输入账号"
          prefix-icon="el-icon-user"
          v-model="ruleForm.account">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="inputClass"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          show-password
          v-model="ruleForm.password">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" round @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ShowMessage } from '@/common/js/util'
export default {
  data () {
    return {
      ruleForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      let _this = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let data = {
            account: this.ruleForm.account,
            password: this.ruleForm.password
          }
          _this.$post('/admin/login', data)
            .then((response) => {
              if (response.code === 200) {
                console.log(response)
                sessionStorage.account = response.data.admin.account
                console.log(sessionStorage.account)
                _this.$router.push({ path: '/home' })
              }
              ShowMessage(response.code, response.msg)
            }).catch((error) => {
              console.log(error)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  background-color #eee
  display flex
  justify-content center
  align-items center
  .box
    border-radius 8px
    width 400px
    background-color #fff
    border 1px solid #eee
    padding 20px
    display flex
    flex-direction column
    justify-content center
    align-items center
    .inputClass
      width 300px
</style>
