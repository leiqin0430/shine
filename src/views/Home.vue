<template>
  <el-container style="height:100%;">
    <el-header>
      <h2 class="sysName">欣阳科技后台管理系统</h2>
      <el-menu
        :default-active="topActiveIndex"
        class="el-menu-top"
        mode="horizontal"
        @select="topHandleSelect"
        ref="topMenu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="settings">系统设置</el-menu-item>
        <el-menu-item index="processing">处理中心</el-menu-item>
        <el-menu-item index="3">我的工作台</el-menu-item>
        <el-menu-item index="4">订单管理</el-menu-item>
      </el-menu>
      <div class="sysUser">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-setting" style="margin-right: 5px"></i><span>{{userName}}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="message">消息中心</el-dropdown-item>
            <el-dropdown-item command="editPass">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside style="background-color: #eef1f6;">
        <el-menu :default-active="leftActiveIndex" @select="leftHandleSelect" ref="leftMenu">
          <template v-for="(item, index1) in routesArr" v-if="!item.hidden">
            <el-submenu v-if="item.children" :index="item.path+index1" :key="index1">
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
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab" class="tabsCls" style="height: 100%">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            style="height: 100%;height: calc(100% - 56px);"
          >
            <router-view></router-view>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import common from '../utils/common'
  export default {
//    name: 'home',
    data () {
      return {
        userName: common.getUserName(),
        topActiveIndex: 'settings',
        leftActiveIndex: '',
        routesArr: [],
        editableTabsValue: '',
        editableTabs: []
      }
    },
    created () {
      this.topHandleSelect('settings')
    },
    methods: {
      topHandleSelect (key) {
//        console.log(this.$router.options.routes)
//        console.log(this.$refs)
        let routes = this.$router.options.routes
        this.routesArr.splice(0)
        for (let i in routes) {
          if (routes[i].groupName && routes[i].groupName === key) {
            this.routesArr.push(routes[i])
          }
        }
        // 清空tab页数组
        this.editableTabs = []
        if (this.routesArr.length > 0) {
          if (this.routesArr[0].children) {
//            this.$refs['leftMenu'].open(this.routesArr[0].path + '0')
//            this.leftActiveIndex = this.routesArr[0].path + this.routesArr[0].children[0].path
//            this.$router.push({ path: this.routesArr[0].path + this.routesArr[0].children[0].path })
            this.leftHandleSelect(this.routesArr[0].path + this.routesArr[0].children[0].path)
          } else {
//            this.leftActiveIndex = this.routesArr[0].path
//            this.$router.push({ path: this.routesArr[0].path })
            this.leftHandleSelect(this.routesArr[0].path)
          }
        }
      },
      leftHandleSelect (key) {
        console.log(this.routesArr)
        let tabTitle = ''
//        this.routesArr.forEach((route, index) => {
//          if (route.children) {
//            route.children.forEach((item, index) => {
//              if (key.indexOf(item.path)) {
//                tabTitle = item.name
//              }
//            })
//          }
//        })
        if (key === '/menu') {
          tabTitle = '菜单管理'
        } else if (key === '/role') {
          tabTitle = '角色管理'
        } else if (key === '/grid') {
          tabTitle = 'Table 表格'
        } else if (key === '/form') {
          tabTitle = 'Form 表单'
        } else if (key === '/scss') {
          tabTitle = 'scss'
        } else if (key === '/echarts') {
          tabTitle = 'echarts'
        }
        let tabs = this.editableTabs
        let isExist = false
        tabs.forEach((tab, index) => {
          if (tab.name === key) {
            isExist = true
          }
        })
        if (!isExist) {
          tabs.push({
            title: tabTitle,
            name: key
          })
        }
        this.editableTabsValue = key
        this.leftActiveIndex = key
        this.$router.push({path: key})
      },
      removeTab (targetName) {
        let tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.editableTabsValue = activeName
        this.editableTabs = tabs.filter(tab => tab.name !== targetName)
        this.leftActiveIndex = activeName
        this.$router.push({path: activeName})
      },
      clickTab (tab) {
        this.leftActiveIndex = tab.name
        this.$router.push({path: tab.name})
      },
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

<style lang="scss" scoped>
  .el-header {
    background-color: #545c64;
    color: #fff;
    line-height: 60px;
  }
  .sysName {
    float: left;
    width: 280px;
  }
  .el-menu-top {
    float: left;
    width: calc(100% - 280px - 60px);
    background-color: #545c64;
  }
  .sysUser {
    float: right;
    width: 60px;
    text-align: right;
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
  }
  .el-aside {
    color: #333;
  }
  .tabsCls {
    .el-tabs__content {
      height: calc(100% - 56px);
    }
  }
</style>
