<template>
  <div class="login-container">
    <h2 class="title">系统登录</h2>
  <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="50px" class="login-ruleForm">
    <el-form-item label="账号" prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')" style="width: 100%;">登录</el-button>
      <!--<el-button @click="resetForm('loginForm')">重置</el-button>-->
    </el-form-item>
  </el-form>
    <!--<div>-->
      <!--<p>{{count}}</p>-->
      <!--<button @click="increment">+</button>-->
      <!--<button @click="decrement">-</button>-->
    <!--</div>-->
  </div>
</template>

<script>
  import { login } from '../api/login'
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
    computed: {
      count: function () {
        return this.$store.state.count
      }
    },
    methods: {
      submitForm (formName) {
        let me = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {'accountNo': this.loginForm.account, 'password': this.loginForm.pass}
            login(params, function (data) {
              data.token = 'test1234'
              localStorage.setItem('user', JSON.stringify(data))
              me.$store.commit('setToken', data.token)
              me.$router.push({ path: '/grid' })
            })
          } else {
            this.$message.error('表单提交失败')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      increment () {
        this.$store.commit('increment')
      },
      decrement () {
        this.$store.commit('decrement')
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
    max-width: 350px;
    margin: 200px auto 0px auto;
    padding: 42px 40px 40px 40px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .login-ruleForm {
    margin: 0 auto;
  }
</style>
