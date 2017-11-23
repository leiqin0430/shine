<template>
  <section>
    <el-form :inline="true" :model="roleFilterForm">
      <el-form-item label="快速查找">
        <el-input v-model="roleFilterForm.roleName" placeholder="请输入角色名称或英文名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="onSubmit">新增角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="'auto'" size="small" border stripe style="height: calc(100% - 62px);">
      <el-table-column fixed prop="name" label="角色名称" width="150">
      </el-table-column>
      <el-table-column prop="ename" label="英文名称" width="120">
      </el-table-column>
      <el-table-column prop="typeText" label="角色类型" width="120">
      </el-table-column>
      <el-table-column prop="dataRangeText" label="数据范围" width="120">
      </el-table-column>
      <el-table-column prop="isableText" label="是否可用" width="300">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="255">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small">分配菜单</el-button>
          <el-button type="text" size="small">分配资源</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40">
    </el-pagination>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        tableData: [],
        roleFilterForm: {
          roleName: ''
        },
        pagination: {
          currentPage: 2
        }
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      handleClick (row) {
        console.log(row)
      },
      onSubmit () {
        this.fetchData()
      },
      fetchData () {
        let item = {
          id: '1',
          name: '部门管理员',
          ename: 'b',
          typeValue: 'gl',
          typeText: '管理角色',
          dataRangeValue: 'bm',
          dataRangeText: '所在部门数据',
          isableValue: '1',
          isableText: '是',
          remark: '我是备注，我是备注我是备注我是备注。'
        }
        this.tableData = Array(20).fill(item)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>
