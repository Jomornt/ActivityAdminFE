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
        label="活动编号"
        prop="id"
        width="150px"
        align="center">
      </el-table-column>
      <el-table-column
        label="标题"
        prop="title"
        width="150px"
        align="center">
      </el-table-column>
      <el-table-column
        label="创建者"
        prop="sponsor"
        align="center">
      </el-table-column>
      <el-table-column
        prop="category"
        label="类别"
        width="100"
        :filter-method="filterHandler"
        :filters="filters"
        filter-placement="bottom-end">
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
      <span>确认要删除此活动吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="blackVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteActivity">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      top="4vh"
      :visible.sync="editVisible"
      :close-on-click-modal="false"
      width="50%"
      :modal-append-to-body="false">
      <el-form label-position="right" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="editInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="editInfo.sponsor"></el-input>
        </el-form-item>
        <el-form-item label="地点/类别">
          <el-col :span="11">
            <el-select v-model="editInfo.locale" placeholder="请选择">
              <el-option
                v-for="item in localeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-select v-model="editInfo.category" placeholder="请选择">
              <el-option
                v-for="item in cateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="datetime" v-model="editInfo.starttime" style="width: 100%"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="datetime" v-model="editInfo.endtime" style="width: 100%"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="限制人数">
          <el-input v-model="editInfo.actLim"></el-input>
        </el-form-item>
        <el-form-item label="活动内容">
          <template>
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 10}"
              v-model="editInfo.content">
            </el-input>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateActivity">确 定</el-button>
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
      filters: [
        {
          text: '学校',
          value: '学校'
        }, {
          text: '社团',
          value: '社团'
        }, {
          text: '个人',
          value: '个人'
        }
      ],
      editInfo: Object,
      cateOptions: [{
        value: '社团',
        label: '社团'
      }, {
        value: '学校',
        label: '学校'
      }, {
        value: '个人',
        label: '个人'
      }],
      localeOptions: [{
        value: 'A区',
        label: 'A区'
      }, {
        value: 'B区',
        label: 'B区'
      }, {
        value: 'C区',
        label: 'C区'
      }, {
        value: 'D区',
        label: 'D区'
      }]
    }
  },
  methods: {
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    deleteActivity () {
      let _this = this
      this.$delete(`/activity/${this.currentAccount}`)
        .then((response) => {
          _this.blackVisible = false
          _this.handleTblChange()
          ShowMessage(response.code, response.msg)
        }).catch((error) => {
          console.log(error)
        })
    },
    updateActivity () {
      let _this = this
      let data = this.editInfo
      this.$patch('/activity', data)
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
      this.$fetch('/activity', { pn: this.currentPage, num: 8 })
        .then((response) => {
          _this.pageInfo = response.data.pageInfo
          console.log(_this.pageInfo)
        }).catch((error) => {
          console.log(error)
        })
    },
    handleDelete (row) {
      this.blackVisible = true
      this.currentAccount = row.id
      console.log(row.id)
    },
    handleEdit (row) {
      this.editVisible = true
      this.editInfo = row
      console.log(row)
    },
    handleTblChange () {
      let _this = this
      this.$fetch('/activity', { pn: this.currentPage, num: 8 })
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
    this.$fetch('/activity', { pn: this.currentPage, num: 8 })
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
