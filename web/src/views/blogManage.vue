<template>
  <div class="home">
    管理我的博客
    <el-button type="primary" @click="addBlog">新增博客</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="content" label="内容" width="180"></el-table-column>
      <el-table-column prop="createtime" label="发布时间"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button @click="editBlog(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="removeBlog(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'editBlog',
  data() {
    return {
      tableData: []
    }
  },
  components: {
    
  },
  methods: {
    tableInit(){
      this.axios.get('/api/blog/list', {
        params:{
          isadmin: 1
        }
      })
      .then( (res) => {
        console.log(res);
        if(!res.data.errno){
          this.tableData = res.data.data
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    },
    addBlog(){
      this.$router.push('/editBlog')
    },
    editBlog(row){
      this.$router.push({
        path: '/editBlog',
        query: {
          title: row.title,
          content: row.content,
          id: row.id
        }
      })
    },
    removeBlog(row){
      this.axios.post('/api/blog/delete', {
        id: row.id     
      })
      .then( (res) => {
        console.log(res);
        if(!res.data.errno){
          this.$message('删除成功')
          this.tableData.splice(row.$index, 1)
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.tableInit()
  },
}
</script>
