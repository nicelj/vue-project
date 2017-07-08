<template>
  <div>
    <div class="topics-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>我的收藏</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <ul style="list-style: none;width: 70%;">
        <li v-for="(item, index) in data" style="display: inline-block;margin-right: 20px;zoom: 1">
          <div style="height:200px;width:200px;border:1px solid #e4e4e4;padding: 8px;border-radius: 2px">
            <p style="height:50px">标题：{{item.title}}</p>
            <p>最后回复时间：{{item.last_reply_at}}</p>
            <p>
              作者：{{item.author.loginname}}<img :src="item.author.avatar_url" style="width: 60px" alt="pic">
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import {getUser} from '@/api/getData'
  export default {
    data () {
      return {
        data: []
      }
    },
    async created () {
      const res = await getUser(sessionStorage.username)
      console.log(res)
      this.data = res.data.collect_topics
    }
  }
</script>
<style lang="scss" scoped>
  ul li>div:hover{
    cursor: pointer;
    height: 220px !important;
    width: 220px !important;
    padding: 20px !important;
    transition: all .3s ease;
  }
</style>
