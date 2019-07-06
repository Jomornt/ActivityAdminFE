<template>
  <el-container>
    <el-header>
      <my-head></my-head>
    </el-header>
    <el-container>
      <div class="wrapper">
        <el-aside>
          <my-menu></my-menu>
        </el-aside>
      </div>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MyMenu from '@/components/myMenu'
import MyHead from '@/components/myHead'
export default {
  name: 'app',
  components: {
    MyMenu,
    MyHead
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #ffffff;
    color: #333;
    width: 100%;
    padding: 0px;
    margin: 0px;
    height: 50px !important;
  }
  .el-aside {
    text-align: left;
    line-height: 200px;
    padding: 0px;
    margin: 0px;
  }
  .el-main {
    background-color: #f1f2f7;
    color: #333;
    z-index: 100;
  }
  .wrapper{
    background-color: #545c64;
  }
</style>
