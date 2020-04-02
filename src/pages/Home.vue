<template>
  <div class="home">
    <!-- 布局容器 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-row class="tac">
          <el-col>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <!-- 子菜单 -->
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <img :src="$axios.defaults.baseURL + user.head_img" alt="" />
          <span class="nickname">{{ user.nickname }} </span>
          <a href="javascript:;" @click="logout">退出</a>
        </el-header>
        <el-main>Main</el-main>
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
