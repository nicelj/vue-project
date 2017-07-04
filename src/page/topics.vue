<template>
  <div>
    <div class="topics-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">主题</el-breadcrumb-item>
        <el-breadcrumb-item>全部主题</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="topics-bot">
      <ul>
        <li v-for="(item,index) in topics">
          <div class="ul-li-item">
            <el-row>
              <el-col :span="2">{{item.reply_count+'/'+item.visit_count}}</el-col>
              <el-col :span="2" style="color:#E9967A">{{getTabContent(item.tab)}}</el-col>
              <el-col :span="10" style="color:#999999">
                  <a @click="gotodetail(item.id)" style="cursor:pointer">{{item.title}}</a>
                  </el-col>
              <el-col :span="6" style="color:#006699">{{item.create_at}}</el-col>
              <el-col :span="4" style="color:#E5E5E5">最近回复 {{item.last_reply_at && item.last_reply_at.split('T')[0]}}</el-col>
            </el-row>
          </div>
        </li>
      </ul>
      <el-pagination
      style="margin-left:40%"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="topiclength">
    </el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    getTopics
  } from '@/api/getData'
  export default {
    data () {
      return {
        topics: [],
        topiclength: 0,
        tabs: {'all': '全部', 'good': '精华', 'weex': 'weex', 'share': '分享', 'ask': '问答', 'job': '招聘'},
        current: 1
      }
    },
    async beforeMount () {
      console.log('mounted')
      let topics = await getTopics()
      console.log(topics)
      this.topiclength = topics.data.length
      let topicspage = await getTopics({limit: 10, page: this.current})
      this.topics = topicspage.data
    },
    methods: {
      getTabContent (tabstr) {
        return this.tabs[tabstr]
      },
      gotodetail (id) {
        this.$router.push({path: 'topicdetail', query: {id}})
      },
      async handleCurrentChange (page) {
        console.log(page)
        let topicspage = await getTopics({limit: 10, page})
        this.topics = topicspage.data
      }
    }

  }

</script>
<style lang="scss" scoped>
  .topics-bot {
    ul {
      list-style: none;
    }
  }

  .ul-li-item {
    margin: 20px 0;
    border-bottom: 1px solid #ccc
  }

</style>
