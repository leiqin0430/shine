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
  import { getBorrowList } from '../../api/grid'
  export default {
    data () {
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
        let me = this
        getBorrowList(this.formInline, function (data) {
          me.tableData = data.page.rows
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
