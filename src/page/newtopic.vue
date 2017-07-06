<template>
  <div class="newtopic-md">
    <div class="topics-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">主题</el-breadcrumb-item>
        <el-breadcrumb-item>新建主题</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="padding: 30px 0 0 30px">
    <el-row>
      <el-col :span="2">
      <div>
        标题：
      </div>
      </el-col>
      <el-col :span="8">
        <el-input v-model="title" placeholder="在此输入标题"></el-input>
      </el-col>
    </el-row>
    <br/>
      <br />
      <el-row>
        <el-col :span="2">
          <div>
            标签页：
          </div>
        </el-col>
        <el-col :span="4">
          <el-select v-model="tab">
            <el-option v-for="(item, index) in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <br />
      <br />
    <el-row>
      <el-col :span="2">
        <div>
          内容：
        </div>
      </el-col>
      <el-col :span="18">
        <div>
          <mavon-editor v-model="content"/>
        </div>
      </el-col>
    </el-row>
    </div>
    <br/>
    <div style="text-align: center">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script>
  import {addTopic} from '@/api/getData'
  export default {
    data () {
      return {
        content: '',
        title: '',
        tab: '',
        options: [
          {
            babel: '分享',
            value: 'share'
          },
          {
            babel: '招聘',
            value: 'job'
          },
          {
            babel: '提问',
            value: 'ask'
          }
        ]
      }
    },
    methods: {
      async submit () {
        let payload = {title: this.title, tab: this.tab, content: this.content}
        const res = await addTopic(payload)
        if (res.success) {
          this.$message.success('提交成功')
        } else {
          this.$message.error('提交失败' + res.error_msg)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  div.newtopic-md{
  }
</style>
