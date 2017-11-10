<template>
  <el-container style="height:100%;">
    <el-header>
      <h2 style="float: left;line-height: 60px;">系统名称</h2>
      <div style="float: right;line-height: 60px;">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-setting" style="margin-right: 5px"></i><span>{{userName}}</span>
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
        <el-menu :default-active="'/grid'" router>
          <template v-for="(item, index1) in $router.options.routes" v-if="!item.hidden">
            <el-submenu v-if="item.children" :index="item.path" :key="index1">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="(child, index2) in item.children" v-if="!child.hidden" :index="item.path+child.path" :key="index1+'-'+index2">
                <i :class="child.iconCls"></i>{{child.name}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.path" :key="index1"><i :class="item.iconCls"></i>{{item.name}}</el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import base from '../api/base'
  export default {
//    name: 'home',
    data () {
      return {
        userName: base.getUserName()
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
