<template>
  <div class="login-container">
    <h2 class="title">系统登录</h2>
  <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px" class="login-ruleForm">
    <el-form-item label="账号" prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
  import { requestLogin } from '../api/api'
  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          account: 'admin',
          pass: ''
        },
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
        this.$refs[formName].validate((valid) => {
          if (valid) {
//            let params = new URLSearchParams()
//            params.append('accountNo', this.loginForm.account)
//            params.append('password', this.loginForm.pass)
            let params = {'accountNo': this.loginForm.account, 'password': this.loginForm.pass}
            requestLogin(params).then(data => {
              if (data.resultCode === '000000') {
                sessionStorage.setItem('user', JSON.stringify(data))
                this.$router.push({ path: '/home' })
              } else {
                this.$message.error(data.resultInfo)
              }
            })
          } else {
            this.$message.error('表单提交失败')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    margin-bottom: 22px;
    text-align: center;
    color: #5a5e66;
  }
  .login-container {
    min-width: 300px;
    max-width: 500px;
    margin: 200px auto 0px auto;
    padding: 42px 20px 20px 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .login-ruleForm {
    margin: 0 auto;
  }
</style>
