<template>
  <div>
    <div class="wrapper">
      <div class="box box1">
        <div>今日访问人数</div>
        <div class="content">214</div>
      </div>
      <div class="box box2">
        <div>今日活动创建数</div>
        <div class="content">456</div>
      </div>
      <div class="box box3">
        <div>今日报名数</div>
        <div class="content">124</div>
      </div>
    </div>
    <div class="echartWrapper">
      <div 
      style="margin-left: 35px;width: 450px;
        height: 300px;
        border:1px solid rgb(180,180,180)" 
      id="echartss1"></div>
      <div style="margin-left: 50px;width: 450px;height: 300px;border:1px solid rgb(180,180,180)" id="echartss2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      echarts1_option: {
        title: {
          text: '类别统计'
        },
        tooltip: {},
        series: [{
          name: '类别',
          type: 'pie',
          radius: '70%',
          data: [
            { value: 105, name: '官方活动' },
            { value: 237, name: '社团活动' },
            { value: 567, name: '个人活动' }
          ]
        }]
      },
      echarts2_option: {
        title: {
          text: '区域统计'
        },
        tooltip: {},
        series: [{
          name: '类别',
          type: 'pie',
          radius: '70%',
          data: [
            { value: 107, name: 'A区' },
            { value: 254, name: 'B区' },
            { value: 193, name: 'C区' },
            { value: 164, name: 'D区' }
          ]
        }]
      }
    }
  },
  mounted () {
    let myChart1 = this.$echarts.init(document.getElementById('echartss1'))
    myChart1.setOption(this.echarts1_option)
    let myChart2 = this.$echarts.init(document.getElementById('echartss2'))
    myChart2.setOption(this.echarts2_option)
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  display flex
  flex-direction row
  background-color #f1f2f7 !important
  justify-content space-around
  margin-bottom 30px
  .box
    width 250px
    height 150px
    background-color #FFA500
    border-radius 8px
    border 1px solid #eee
    padding 20px
    display flex
    flex-direction column
    justify-content center
    align-items center
    .content
      font-size 50px !important
  .box1
    background-color #FFA500
  .box2
    background-color #87CEFA
  .box3
    background-color #90EE90
.echartWrapper
  display flex
  flex-direction row
</style>
