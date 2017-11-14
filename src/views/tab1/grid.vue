<template>
  <div style="height: 100%;">
  <!--<el-container>-->
    <!--<el-header>-->
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="页码">
      <el-input v-model="formInline.page" placeholder="审批人"></el-input>
    </el-form-item>
    <el-form-item label="借阅状态">
      <el-select v-model="formInline.jyzt" placeholder="请选择">
        <el-option label="借阅" value="lend"></el-option>
        <el-option label="归还" value="remand"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
    <!--</el-header>-->
    <!--<el-main>-->
      <el-table :data="tableData" height="'auto'" size="small" border stripe style="height: calc(100% - 62px);">
        <el-table-column prop="borrower" label="姓名" width="140">
        </el-table-column>
        <el-table-column prop="jsr" label="年龄" width="120">
        </el-table-column>
        <el-table-column prop="jysj" label="出生日期" width="140">
        </el-table-column>
        <el-table-column prop="jyyt" label="地址">
        </el-table-column>
        <el-table-column prop="jyStatus" label="电话">
        </el-table-column>
      </el-table>
  </div>
    <!--</el-main>-->
  <!--</el-container>-->
</template>
<script>
  import common from '../../utils/common'
  import { getBorrowList } from '../../api/grid'
  export default {
//    name: 'grid',
    data () {
//      const item = {
//        name: '王小虎',
//        age: 25,
//        date: '1992-05-02',
//        address: '上海市普陀区金沙江路 1518 弄',
//        telephone: '18700571926'
//      }
//      return {
//        tableData: Array(20).fill(item),
//        formInline: {
//          user: '',
//          region: ''
//        }
//      }
      return {
        tableData: [],
        formInline: {
          page: 1,
          rows: 10,
          jyzt: ''
        }
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
//        let params = {page: 1, rows: 10}
//        getBorrowList(this.formInline).then(resp => {
//          if (resp.resultCode === common.respResult.RESPONSE_SUCCESS) {
//            this.tableData = resp.page.rows
//          } else {
//            this.$message.error(resp.resultInfo)
//          }
//        })
        getBorrowList(this.formInline, function (resp) {
          if (resp.resultCode === common.respResult.RESPONSE_SUCCESS) {
            this.tableData = resp.page.rows
          } else {
            this.$message.error(resp.resultInfo)
          }
        })
      },
      onSubmit () {
        this.fetchData()
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
