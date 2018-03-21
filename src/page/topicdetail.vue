<template>
  <div>
    <div class="topics-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">主题</el-breadcrumb-item>
        <el-breadcrumb-item>主题详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="max-width:80%;padding-left:30px">
        <div style="text-align:center;">
            <el-row>
                <el-col :span="12" style="margin-left:350px">
                    <h3 style="color:#A8A8A8">{{topicbody.title}}</h3>
                </el-col>
                <el-col :span="4" style="margin-top:20px">
                <el-button type="primary" @click="collect" v-if="!collected">加入收藏</el-button>
                <el-button  @click="cancelcollect" v-if="collected">取消收藏</el-button>
                </el-col>
            </el-row>
            <p style="font-size:14px">
                <span v-if="topicbody.top" class="z-top-but">置顶</span>
                创建于{{topicbody.create_at && topicbody.create_at.split('T')[0]}} &nbsp;&nbsp;
                作者:{{topicbody.author && topicbody.author.loginname}} &nbsp;&nbsp;
                {{topicbody.visit_count}}次浏览 &nbsp;&nbsp;
                来自&nbsp;<span style="color:#8B1A1A">{{topicbody.tab && tabs[topicbody.tab]}}</span>
            </p>
        </div>
        <div  v-html="topicbody.content"></div>
    </div>
    <hr/>
    <div style="max-width:80%;padding-left:30px">
        <header>
            {{topicbody.reply_count}} &nbsp;回复
        </header>
        <ul style="list-style:none">
            <li v-for="(item,index) in topicbody.replies" :key="index">
                <el-row style="border:1px solid #ccc;padding:8px 0 0 8px" :class="{noborder:index != topicbody.replies.length-1}">
                    <img style="width:50px;vertical-align: middle" :src="item.author.avatar_url" alt="avatar"/>
                    <span style="color:#A0522D">{{item.author.loginname}}&nbsp;</span>
                    <span style="color:#08c">{{(index+1)+'楼'}}&nbsp;
                        {{item.create_at && item.create_at.split('T')[0]}}</span>
                    <div v-html="item.content"></div>
                </el-row>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
  import {
    getTopicDetail, collect, getUser, cancelCollect
  } from '@/api/getData'
  export default {
    name: 'topicdetail',
    data () {
      return {
        topicbody: {},
        tabs: {'all': '全部', 'good': '精华', 'weex': 'weex', 'share': '分享', 'ask': '问答', 'job': '招聘'},
        collected: false
      }
    },
    beforeCreate () {
      let query = this.$route.query
      if (!Object.keys(query)[0]) {
        this.$message.info('进入全部主题选择具体主题')
      }
    },
    async mounted () {
      if (!this.$route.query.id) {
        return false
      }
      let results = await Promise.all([getTopicDetail(this.$route.query.id), getUser(sessionStorage.username)])
      let topicid = results[0].data.id
      this.collected = this.isCollected(topicid, results[1].data)
      console.log(this.collected, '========')
      this.topicbody = results[0].data
    },
    methods: {
      async collect () {
        let result = await collect(this.$route.query.id)
        if (result.success) {
          this.$message.success('收藏成功')
          this.collected = true
        } else {
          this.$message.error('收藏失败')
        }
      },
      isCollected (topicid, user) {
        for (let i = 0; i < user.collect_topics.length; i++) {
          if (topicid === (user.collect_topics)[i].id) {
            return true
          }
        }
        return false
      },
      async cancelcollect () {
        let result = await cancelCollect(this.$route.query.id)
        if (result.success) {
          this.$message.success('取消成功')
          this.collected = false
        } else {
          this.$message.error('取消失败')
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
.z-top-but{
    display:inline-block;
    border:1px solid #ccc;
    padding: 10px;
    background: #20a0ff;
    border-radius: 4px;
}
.markdown-text p, .preview p {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
    line-height: 2em;
    margin: 1em 0;
}
.noborder{
    border-bottom: none !important;
}

</style>
