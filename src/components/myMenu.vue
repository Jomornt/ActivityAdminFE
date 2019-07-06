<template>
  <el-col class="box">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="$route.path"
      unique-opened
      router>
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="/act">
        <template slot="title">
          <i class="el-icon-s-flag"></i>
          <span>活动管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/activity">活动列表</el-menu-item>
          <el-menu-item index="/record">活动记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/message">
        <template slot="title">
          <i class="el-icon-s-comment"></i>
          <span>消息管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/notify">通知中心</el-menu-item>
          <el-menu-item index="/feedback">反馈中心</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: 'myMenu',
  data () {
    return {
      btnFirst: {
        size: 'mini',
        type: '',
        content: ''
      },
      btnSecond: {
        size: 'mini',
        content: '拉黑',
        type: 'danger'
      }
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.router-link-active {
  text-decoration: none;
}
.box{
  height: 606px;
}
</style>
