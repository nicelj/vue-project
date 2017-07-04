<template>
  <div id="app">
    <div class="login-page">
      <transition name="form-fade" mode="in-out">
        <div v-show="showForm">
          <div class="login-page-tip">
            welcome to Vuejs.com
          </div>
          <el-form :model="form" :rules="rules" ref="form1">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="form.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%" @click="submitForm('form1')">登陆</el-button>
            </el-form-item>
            <el-form-item>
              <p class="login-bot-tip"><a @click="goToRegister" @goToLogin="goToRegister">尚无账号,去注册</a></p>
            </el-form-item>
          </el-form>
        </div>
      </transition>
      <Register :showForm="rshowForm"></Register>
    </div>
    <!--<input type="button" name="" value="button" @click="shownoform">-->
  </div>
</template>
<script>
  import {
    login
  } from '@/api/getData'
  // 这是个模块，即使最后的.css，也依然是在这个地方import，而不是在下面@import
  import 'normalize.css'
  import Register from '@/page/register'
  // 必须要有这个，即使没有内容
  export default {
    name: 'login',
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          // 对应form-item中的prop属性
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        },
        showForm: false
      }
    },
    computed: {
      rshowForm () {
        return !this.showForm
      }
    },
    mounted () {
      this.showForm = true
    },
    components: {
      Register
    },
    methods: {
      async submitForm (formname) {
        this.$refs[formname].validate(async(valid) => {
          console.log(valid)
          if (valid) {
            const res = await login(this.form)
            if (res.success) {
              this.$message.success('登陆成功')
              console.log(this)
              sessionStorage.setItem('username', res.loginname)
              this.$router.push('index')
            } else {
              this.$message.error(res.error_msg)
            }
          } else {
            return false
          }
        })
      },
      goToRegister () {
        this.showForm = !this.showForm
      }
    }
  }

</script>
<style lang="scss" scoped>
  /*
    这个地方使用@方式是不行的
    */

  @import '../assets/common.scss';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #324057;
    height: 100%;
    width: 100%;
  }

  div.login-page {
    background: #fff;
    height: 210px;
    width: 340px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -105px;
    margin-left: -170px;
    border-radius: 4px;
    padding: 30px;
    .login-page-tip {
      font-size: 34px;
      position: absolute;
      top: -40%;
      color: #fff;
    }
    .login-bot-tip {
      text-align: center;
      a:hover {
        cursor: pointer;
        color: #236554
      }
    }
    .form-fade-enter {
      opacity: 0;
      transform: rotate(90deg);
    }
    .form-fade-leave-active {
      opacity: 0;
      transform: rotate(-90deg);
      ;
    }
    .form-fade-enter-active,
    .form-fade-leave-active {
      transition: all 1s;
    }
  }

</style>
