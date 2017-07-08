<template>
  <div>
    <div class="topics-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">消息</el-breadcrumb-item>
        <el-breadcrumb-item>全部消息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="padding:10px 30px">
      <br/>
      <el-row>
        <el-col :span="20" style="text-align: right">
          <el-badge :value="unreadCount" class="item">
            <el-button type="primary" @click="markAsRead">全部标记为已读</el-button>
          </el-badge>
          <span style="font-size:12px;color:#00ff00">ps:深色代表已读</span>
        </el-col>
      </el-row>
      <br/>
      <el-row>
        <el-col :span="20">
        <el-table :data="allmessages" style="width: 100%" :row-class-name="rowClassName">
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column  label="作者">
            <template scope="scope">
              <span>{{scope.row.author.loginname}}</span>
              <div><img :src="scope.row.author.avatar_url" style="max-width: 40px;" alt="pic"></div>
            </template>
          </el-table-column>
          <el-table-column label="主题">
            <template scope="scope">
              <span>{{scope.row.topic.title}}</span>
              <div>{{scope.row.topic.last_reply_at}}</div>
            </template>
          </el-table-column>
          <el-table-column label="回复">
            <template scope="scope">
              <span>{{scope.row.reply.content}}</span>
              <div>{{scope.row.reply.create_at}}</div>
            </template>
          </el-table-column>
        </el-table>
        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script>
  import {getMessages, markRead, getUnreadMessagesCount} from '@/api/getData'
  export default {
    data () {
      return {
        allmessages: [],
        unreadCount: '1'
      }
    },
    methods: {
      rowClassName (row, index) {
        if (row.has_read) {
          return 'info-row'
        }
        return ''
      },
      async markAsRead () {
        const res = await markRead()
        if (res.success) {
          this.$message.success('标记成功')
        } else {
          this.$message.error('标记失败')
        }
      }
    },
    async created () {
      const res = await getMessages()
      console.log(res)
      this.allmessages = [...res.data.has_read_messages, ...res.data.hasnot_read_messages]
      const count = await getUnreadMessagesCount()
      this.unreadCount = count.data
    }
  }
</script>
<style lang="scss">
  .el-table .info-row {
    background: #c9e5f5;
  }
</style>
