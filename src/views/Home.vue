<template>
  <el-container style="border: 1px solid #eee">
    <el-header>
      <h2 style="float: left;line-height: 60px;">系统名称</h2>
      <div style="float: right;line-height: 60px;">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-setting" style="margin-right: 5px"></i><span>{{ userName }}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="message">消息中心</el-dropdown-item>
            <el-dropdown-item command="editPass">密码修改</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-active="'/home/grid'" :default-openeds="['1', '3']" :router="true">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item index="/home/grid">选项1</el-menu-item>
            <el-menu-item index="/home/form">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!--<el-table :data="tableData">-->
          <!--<el-table-column prop="name" label="姓名" width="140">-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="age" label="年龄" width="120">-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="date" label="出生日期" width="140">-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="address" label="地址">-->
          <!--</el-table-column>-->
          <!--<el-table-column prop="telephone" label="电话">-->
          <!--</el-table-column>-->
        <!--</el-table>-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import base from '../api/base'
  export default {
    name: 'home',
    data () {
      const item = {
        name: '王小虎',
        age: 25,
        date: '1992-05-02',
        address: '上海市普陀区金沙江路 1518 弄',
        telephone: '18700571926'
      }
      return {
        userName: base.getUserName(),
        tableData: Array(10).fill(item)
      }
    },
    methods: {
      handleCommand (command) {
        switch (command) {
          case 'message':
            this.$message('click on item ' + command)
            break
          case 'editPass':
            this.$message('click on item ' + command)
            break
          case 'logout':
            this.$confirm('确定要退出系统吗?', '系统提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push({ path: '/login' })
              this.$message({
                type: 'success',
                message: '退出成功!'
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消退出'
              })
            })
            break
          default:
            this.$message('click on item ' + command)
            break
        }
      }
    }
  }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
</style>
