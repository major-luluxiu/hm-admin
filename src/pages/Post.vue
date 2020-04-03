<template>
  <div class="post">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 文章列表 -->
    <el-table :data="postList" style="width: 100%" :stripe="true">
      <el-table-column type="index" label="序号" width="100" :index="order">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180"> </el-table-column>
      <el-table-column prop="user.nickname" label="作者"> </el-table-column>
      <el-table-column label="创建时间" width="120">
        <template v-slot="scope">
          {{ scope.row.create_date | date }}
        </template>
      </el-table-column>
      <el-table-column label="封面">
        <template v-slot="scope">
          <img :src="$axios.defaults.baseURL + scope.row.cover[0].url" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary">编辑</el-button>
          <el-button type="warning">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[3, 6, 9, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [],
      pageIndex: 1,
      pageSize: 3,
      total: 0
    }
  },
  created() {
    this.getPost()
  },
  methods: {
    // 获取文章列表
    async getPost() {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { data, statusCode, total } = res.data
      this.postList = data
      this.total = total
    },
    // 条数变化
    handleSizeChange(size) {
      this.pageSize = size
      this.getPost()
    },
    // 当前页变化
    handleCurrentChange(current) {
      this.pageIndex = current
      this.getPost()
    },
    // 排序
    order(index) {
      return index + 1 + this.pageIndex * this.pageSize
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  padding: 10px 0;
}
img {
  width: 200px;
  height: 150px;
  object-fit: cover;
}
</style>
