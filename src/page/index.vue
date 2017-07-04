<template>
  <div class="index">
    <el-row style="height:100%">
    <!--<div class="left-menu">-->
       <el-col :span="4" class="left-menu" style="position:fixed">
      <el-menu :default-active="defaultActive" theme="dark" router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-document"></i>主题</template>
        <el-menu-item index="topics">全部主题</el-menu-item>
        <el-menu-item index="topicdetail">主题详情</el-menu-item>
        <el-menu-item index="newtopic">新建主题</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>消息</template>
        <el-menu-item index="collection">全部消息</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-information"></i>关于我的</template>
        <el-menu-item index="collection">我的收藏</el-menu-item>
        <el-menu-item index="aboutme">个人信息</el-menu-item>
      </el-submenu>
    </el-menu>
       </el-col>
       <el-col :span="4" class="left-menu"></el-col>
    <!--</div>-->
    <!--<div class="right-menu">-->
       <el-col :span="20">
        <router-view></router-view>
       </el-col>
    <!--</div>-->
    </el-row>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        msg: 'message'
      }
    },
    // created () {
    //   console.log(this.$route.path.replace('/', ''))
    // },
    computed: {
      defaultActive () {
        console.log(this.$route.path.replace('/', ''))
        return this.$route.path.replace('/', '')
      }
    }
  }

</script>
<style lang="scss" scoped>
  .index {
    /*display: inline-flex;*/
    width: 100%;
    height:100%;
    .left-menu {
      min-height:100%;
      background:#324057;
    }
    .right-menu{
      width: 85%;
      height: 100%;
    }
  }

</style>
