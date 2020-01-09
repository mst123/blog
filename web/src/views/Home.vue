<template>
  <div class="home">
    博客首页

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
    
  },
  methods: {

  },
}
</script>
