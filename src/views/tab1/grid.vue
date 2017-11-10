<template>
  <div style="height: 100%;">
  <!--<el-container>-->
    <!--<el-header>-->
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="审批人">
      <el-input v-model="formInline.user" placeholder="审批人"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="formInline.region" placeholder="活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
    <!--</el-header>-->
    <!--<el-main>-->
      <el-table :data="tableData" height="'auto'" border stripe style="height: calc(100% - 62px);">
        <el-table-column prop="name" label="姓名" width="140">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="120">
        </el-table-column>
        <el-table-column prop="date" label="出生日期" width="140">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="telephone" label="电话">
        </el-table-column>
      </el-table>
  </div>
    <!--</el-main>-->
  <!--</el-container>-->
</template>
<script>
  export default {
//    name: 'grid',
    data () {
      const item = {
        name: '王小虎',
        age: 25,
        date: '1992-05-02',
        address: '上海市普陀区金沙江路 1518 弄',
        telephone: '18700571926'
      }
      return {
        tableData: Array(20).fill(item),
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
