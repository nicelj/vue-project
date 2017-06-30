<template>
  <transition name="form-fade" mode="in-out">
    <div class="form-register" v-show="this.showForm">
      <div class="register-page-tip">
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
          <p class="register-bot-tip"><a @click="goToLogin">已有账号,去登陆</a></p>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>
<script>
  import {
    register
  } from '@/api/getData'
  export default {
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
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
        rshowForm: false
      }
    },
    props: ['showForm'],
    methods: {
      submitForm (formname) {
        this.$refs[formname].validate((valid) => {
          console.log(valid)
          if (valid) {
            register(this.form)
            this.$message.success('注册成功')
          } else {
            return false
          }
        })
      },
      goToLogin () {
        // console.log(this.$emit)
        this.$parent.goToRegister()
      }
    }
    // 这个方法是在data变化时触发
    // beforeUpdate () {
    //   console.log(this.showForm)
    //   this.rshowForm = this.showForm
    // }
  }

</script>
<style lang="scss" scoped>
  div.form-register{
    .register-page-tip{
      font-size: 34px;
      position: absolute;
      top: -40%;
      color: #fff;
    }
    .register-bot-tip{
      text-align: center;
      a:hover {
        cursor: pointer;
        color: #236554
      }
    }
  }
  .form-fade-enter{
      opacity: 0;
      transform: rotate(90deg);
    }
    .form-fade-leave-active {
      opacity: 0;
      transform: rotate(-90deg);;
    }
    .form-fade-enter-active,
    .form-fade-leave-active {
      transition: all 1s ease 1s;
    }

</style>
