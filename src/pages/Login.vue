<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="rules" label-width="60px">
      <el-form-item label="账号:" prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入账号"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item label="密码:" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '账号不能为空',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 6,
            message: '长度在 3 到 6 个字位',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    // 表单重置
    reset() {
      this.$refs.form.resetFields()
    },
    // 登录表单校验
    async login() {
      try {
        // 发请求前先校验整个表单域
        await this.$refs.form.validate()

        const res = await this.$axios.post('/login', this.form)
        console.log(res)
        const { statusCode, data, message } = res.data
        if (statusCode == 200) {
          localStorage.setItem('token', data.token)
          this.$router.push('/')
          this.$message(message)
        } else if (statusCode === 401) {
          this.$message(message)
        }
      } catch (err) {
        this.$message(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 400px;
  margin: 200px auto;
  border: 1px solid #ccc;
  padding: 20px;
  .el-button:first-child {
    margin-right: 80px;
  }
}
</style>
