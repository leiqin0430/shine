<template>
  <div class="login-bg">
    <div class="login-container">
      <h3 class="title">欢迎登录</h3>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="50px">
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="loginForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="loginForm.pass" @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loadingFlag" @click="submitForm('loginForm')" style="width: 100%;">登录</el-button>
          <!--<el-button @click="resetForm('loginForm')">重置</el-button>-->
        </el-form-item>
      </el-form>
      <p class="login-tip">若密码忘记了请联系管理员</p>
    </div>
  </div>
</template>

<script>
//  import { login } from '../api/login'
  import { login } from '../mockApi/login'
  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          account: '',
          pass: ''
        },
        loadingFlag: false,
        loginRules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.loadingFlag = true
        let me = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {'username': this.loginForm.account, 'password': this.loginForm.pass}
//            login(params, function (data) {
//              me.loadingFlag = false
//              localStorage.setItem('shine_user', JSON.stringify(data.obj))
//              me.$store.commit('setToken', data.obj.token)
//              me.$router.push({ path: '/' })
//            }, function (data) {
//              me.loadingFlag = false
//              me.$message.info(data.resultInfo)
//            })
            login(params).then(function (data) {
              me.loadingFlag = false
              localStorage.setItem('shine_user', JSON.stringify(data.user))
              me.$store.commit('setToken', data.user.token)
              me.$router.push({ path: '/' })
            })
          } else {
            this.loadingFlag = false
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-bg {
    width: 100%;
    height: 100%;
    /*background-image: url(https://file.iviewui.com/iview-admin/login_bg.jpg);*/
    background-image: url(../assets/login_bg.jpg);
    background-size: cover;
    background-position: 50%;
    position: relative;
    .login-container {
      width: 260px;
      padding: 42px 40px 40px 40px;
      border: 1px solid #ddd;
      border-radius: 4px;
      position: absolute;
      right: 150px;
      top: 30%;
      background: #fff;
      .title {
        margin-bottom: 22px;
        text-align: center;
        color: #5a5e66;
      }
      .login-tip {
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
      }
    }
  }
</style>
