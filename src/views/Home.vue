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
        <el-menu-item v-for="m in menuList" :index="m.url" :key="m.url">{{m.label}}</el-menu-item>
      </el-menu>
      <div class="sysUser">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link userinfo-inner">
            <img :src="userInfo.headImg">
            {{userInfo.name}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="message">消息中心</el-dropdown-item>
            <el-dropdown-item command="modifyPwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!--修改密码dialog-->
      <el-dialog title="修改密码" :visible.sync="pwdDialogVisible" :close-on-click-modal="false" width="30%">
        <el-form :model="pwdForm" status-icon :rules="pwdRules" ref="pwdForm" label-width="80px">
          <el-form-item label="原密码" prop="oldPwd">
            <el-input type="password" v-model="pwdForm.oldPwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" v-model="pwdForm.newPwd" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPwd">
            <el-input type="password" v-model="pwdForm.checkPwd" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="pwdDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyPwdOk('pwdForm')">确 定</el-button>
        </div>
      </el-dialog>
    </el-header>
    <el-container>
      <el-aside style="background-color: #545c64;">
        <el-menu :default-active="leftActiveIndex" @select="leftHandleSelect" ref="leftMenu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" style="border-right-color: #545c64">
          <!--<template v-for="(item, index1) in routesArr" v-if="!item.hidden">-->
          <!--<el-submenu v-if="item.children" :index="item.path+index1" :key="index1">-->
          <!--<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>-->
          <!--<el-menu-item v-for="(child, index2) in item.children" v-if="!child.hidden" :index="item.path+child.path" :key="index1+'-'+index2">-->
          <!--<i :class="child.iconCls"></i>{{child.name}}-->
          <!--</el-menu-item>-->
          <!--</el-submenu>-->
          <!--<el-menu-item v-else :index="item.path" :key="index1"><i :class="item.iconCls"></i>{{item.name}}</el-menu-item>-->
          <!--</template>-->
          <template v-for="item in subMenuList">
            <el-menu-item :index="item.url" :key="item.url"><i :class="item.icon?'fa fa-'+item.icon+' shine-menu-icon':'el-icon-menu'"></i>{{item.label}}</el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
        <!--<keep-alive>-->
        <router-view></router-view>
        <!--</keep-alive>-->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import common from '../utils/common'
  import { logout } from '../api/login'
  import home from '../api/home'
  import defaultHeadImg from '@/assets/headImg.jpg'

  export default {
//    name: 'home',
    data () {
      let validateNewPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else {
          if (this.pwdForm.checkPwd !== '') {
            this.$refs.pwdForm.validateField('checkPwd')
          }
          callback()
        }
      }
      let validateCheckPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'))
        } else if (value !== this.pwdForm.newPwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        menuList: [
          {
            label: '系统设置',
            url: 'settings',
            icon: 'el-icon-menu',
            children: [
              {
                label: '菜单管理',
                url: 'menu',
                icon: 'fa fa-arrows shine-menu-icon'
              },
              {
                label: '资源管理',
                url: 'resource',
                icon: 'el-icon-setting'
              },
              {
                label: '角色管理',
                url: 'role',
                icon: 'el-icon-setting'
              },
              {
                label: '部门管理',
                url: 'dept',
                icon: 'el-icon-setting'
              },
              {
                label: '用户管理',
                url: 'user',
                icon: 'el-icon-setting'
              },
              {
                label: '字典管理',
                url: 'dict',
                icon: 'el-icon-setting'
              }
            ]
          },
          {
            label: '处理中心',
            url: 'processing',
            icon: 'el-icon-menu',
            children: [
              {
                label: 'Form 表单',
                url: 'form',
                icon: 'el-icon-setting'
              },
              {
                label: 'scss',
                url: 'scss',
                icon: 'el-icon-setting'
              },
              {
                label: 'echarts',
                url: 'echarts',
                icon: 'el-icon-setting'
              }
            ]
          }
        ],
        subMenuList: [],
        userInfo: {
          name: common.getUserInfo().name,
          headImg: common.getUserInfo().headUrl ? process.env.BASE_URL + common.getUserInfo().headUrl : defaultHeadImg
        },
        topActiveIndex: 'settings',
        leftActiveIndex: '',
        routesArr: [],
        editableTabsValue: '',
        editableTabs: [],
        pwdForm: {
          oldPwd: '',
          newPwd: '',
          checkPwd: ''
        },
        pwdRules: {
          oldPwd: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
          ],
          newPwd: [
            { required: true, validator: validateNewPwd, trigger: 'blur' }
          ],
          checkPwd: [
            { required: true, validator: validateCheckPwd, trigger: 'blur' }
          ]
        },
        pwdDialogVisible: false
      }
    },
    created () {
//      console.log(this.$router)
//      console.log(this.$router.currentRoute)
      let me = this
      home.getMenuListByUid(null, function (data) {
        me.menuList = data.list
        if (me.$router.currentRoute.path === '/') {
          me.topHandleSelect('settings')
        } else {
          me.topHandleSelect(me.$router.currentRoute.meta.groupName, me.$router.currentRoute.path.substring(1))
        }
      })
      this.$store.commit('getAllDict')
    },
    methods: {
      topHandleSelect (key, path) {
        for (let i in this.menuList) {
          if (this.menuList[i].url === key) {
            this.subMenuList = this.menuList[i].children
            break
          }
        }

//        let routes = this.$router.options.routes
//        this.routesArr.splice(0)
//        for (let i in routes) {
//          if (routes[i].groupName && routes[i].groupName === key) {
//            this.routesArr = routes[i].children
//          }
//        }
        // 清空tab页数组
        this.editableTabs = []
//        if (this.routesArr.length > 0) {
//          if (this.routesArr[0].children) {
//            this.leftHandleSelect(this.routesArr[0].path + this.routesArr[0].children[0].path)
//          } else {
//            this.leftHandleSelect(this.routesArr[0].path)
//          }
//        }
        if (this.subMenuList.length > 0) {
          if (path) {
            this.leftActiveIndex = path
            this.editableTabs.push({
              title: this.$router.currentRoute.name,
              name: path
            })
            this.editableTabsValue = path
          } else {
            this.leftHandleSelect(this.subMenuList[0].url)
          }
        }
      },
      leftHandleSelect (key) {
        let me = this
        this.$router.push({path: key}, function (res) {
          me.leftActiveIndex = key
          let tabs = me.editableTabs
          let index = tabs.findIndex(tab => tab.name === key)
          if (index === -1) {
            tabs.push({
              title: res.name,
              name: key
            })
          }
          me.editableTabsValue = key
        })
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
        let me = this
        switch (command) {
          case 'message':
            this.$message('click on item ' + command)
            break
          case 'modifyPwd':
            this.pwdDialogVisible = true
            this.$nextTick(function () {
              this.$refs['pwdForm'].resetFields()
            })
            break
          case 'logout':
            this.$confirm('确定要退出系统吗?', '系统提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              logout(null, function (data) {
                me.$router.push({ path: '/login' })
                me.$message({
                  type: 'success',
                  message: '退出成功!'
                })
              })
            }).catch(() => {
              me.$message({
                type: 'info',
                message: '已取消退出'
              })
            })
            break
          default:
            this.$message('click on item ' + command)
            break
        }
      },
      modifyPwdOk (formName) {
        let me = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {newPassword: this.pwdForm.newPwd, oldPassword: this.pwdForm.oldPwd}
            home.modifyPwd(params, function (data) {
              me.pwdDialogVisible = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
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
    width: calc(100% - 280px - 100px);
  }
  .sysUser {
    float: right;
    width: 100px;
    text-align: right;
  .userinfo-inner {
    cursor: pointer;
    color: #409EFF;
  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0 10px 10px;
    float: right;
  }
  }
  }
  /*.el-aside {*/
  /*color: #333;*/
  /*}*/
  /*.tabsCls {*/
  /*.el-tabs__content {*/
  /*height: calc(100% - 56px);*/
  /*}*/
  /*}*/
</style>
