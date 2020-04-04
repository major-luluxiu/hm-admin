<template>
  <div class="publish">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 发布文章的表单 -->
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="标题:" prop="title">
        <el-input placeholder="请输入文章标题" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容:" prop="content">
        <quill-editor v-model="form.content"></quill-editor>
      </el-form-item>
      <el-form-item label="栏目:" prop="categories">
        <el-checkbox-group v-model="form.categories">
          <el-checkbox
            :label="item.id"
            v-for="item in tabList"
            :key="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面:" prop="cover">
        <el-upload
          :action="$axios.defaults.baseURL + '/upload'"
          list-type="picture-card"
          :on-success="handleSuccess"
          :headers="headers"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型:">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">图片</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish">发布</el-button>
        <el-button>撤销</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  async created() {
    const res = await this.$axios.get('/category')
    const { data, statusCode } = res.data
    if (statusCode === 200) {
      this.tabList = data.filter(item => {
        return item.name !== '热点' && item.name !== '头条'
      })
    }
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      tabList: [],
      rules: {
        title: [
          {
            required: true,
            message: '标题不能为空',
            trigger: ['blur', 'change']
          }
        ],
        content: [
          {
            required: true,
            message: '内容不能为空',
            trigger: ['blur', 'change']
          }
        ],
        categories: [
          {
            required: true,
            message: '栏目不能为空',
            trigger: ['blur', 'change']
          }
        ],
        cover: [
          {
            required: true,
            message: '封面不能为空',
            trigger: ['blur', 'change']
          }
        ]
      },
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  methods: {
    // 图片上传成功
    handleSuccess(response, file, fileList) {
      const { statusCode, data } = response
      if (statusCode === 200) {
        this.form.cover.push({
          id: data.id,
          url: data.url
        })
      }
    },
    // 发布文章
    async publish() {
      try {
        await this.$refs.form.validate()
        const categorise = this.form.categories.map(item => {
          return {
            id: item
          }
        })
        const data = {
          ...this.form,
          categories: categorise
        }
        if (this.form.type === 2) {
          // 我们传视频的时候只需要视频地址 不需要标签 所以要将地址单独提出来
          // 随便创建个div 将content赋值给div
          // 再将div的innertext给data.content
          const div = document.createElement('div')
          div.innerHTML = this.form.content
          data.content = div.innerText
        }
        const res = await this.$axios.post('/post', data)
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$router.push('/')
          this.$message.success(message)
        }
      } catch {
        this.$message('表单校验失败')
      }
    }
  },
  watch: {
    'form.content'(value) {
      if (value) {
        this.$refs.form.clearValidate('content')
      }
    },
    'form.cover': {
      deep: true,
      handler(value) {
        if (value.length > 0) {
          this.$refs.form.clearValidate('cover')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.publish {
  .el-breadcrumb {
    padding: 10px 15px;
  }
  .quill-editor {
    background-color: #fff;
    /deep/ .ql-editor {
      height: 200px;
    }
  }
}
</style>
