<template>
  <div class="home">
    <!-- 布局容器 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <div class="logo">黑马头条</div>
        <el-menu
          :default-active="$route.path"
          router
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 子菜单 -->

          <el-menu-item index="/">
            <i class="el-icon-s-unfold"></i>
            <span slot="title">文章列表</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-edit"></i>
            <span slot="title">文章发布</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <img :src="$axios.defaults.baseURL + user.head_img" alt="" />
          <span class="nickname">{{ user.nickname }} </span>
          <a href="javascript:;" @click="logout">退出</a>
        </el-header>
        <!-- 主题区域 -->
        <el-main>
          <!-- 子路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.user = user
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    async logout() {
      try {
        await this.$confirm('确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 删除token
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message('退出成功')
      } catch {
        this.$message('取消退出')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .el-container {
    width: 100%;
    height: 100%;
    .el-aside {
      background-color: #d3dce6;
      .logo {
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-color: #787f88;
        color: #fff;
        font-size: 18px;
      }
      .el-menu-item {
        text-align: center;
      }
    }
    .el-header {
      background-color: #b3c0d1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .nickname {
        margin: 0 10px;
      }
    }
    .el-main {
      background-color: #e9eef3;
    }
  }
}
</style>
