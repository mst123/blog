<template>
  <div class="home">
    博客首页

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="title" label="标题" width="180">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="viewBlog(scope.row)"
            type="text"
            size="small">
            {{scope.row.title}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" width="180"></el-table-column>
      <el-table-column prop="createtime" label="发布时间"></el-table-column>
      <el-table-column prop="author" label="作者">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="viewBlogByAuthor(scope.row)"
            type="text"
            size="small">
            {{scope.row.author}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      tableData:[]
    }
  },
  components: {
    
  },
  methods: {
    tableInit(){
      this.axios.get('/api/blog/list', {
        author: '',
        keyword: ''
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
    viewBlogByAuthor(row){
      console.log(row);
      this.$router.push({
        path:"/author",
        query: {
          author: row.author
        }
      })
    },
    viewBlog(row){
      console.log(row);
    }
  },
  mounted() {
    this.tableInit()
  },
}
</script>
