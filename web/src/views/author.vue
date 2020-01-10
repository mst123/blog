<template>
  <div class="home">
    作者详情
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="keyword" placeholder="关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="title" label="标题" width="180">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="viewBlog(scope.row)"
            type="text"
            size="small">
            {{scope.row.author}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" width="180"></el-table-column>
      <el-table-column prop="createtime" label="发布时间"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      tableData:[],
      author: '',
      keyword: ''
    }
  },
  components: {
    
  },
  methods: {
    tableInit(){
      this.axios.get('/api/blog/list', {
        params:{
          author: this.author,
          keyword: this.keyword
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
    onSearch(){
      this.tableInit()
    },
    viewBlog(row){
      console.log(row);
    }
  },
  mounted() {
    this.author = this.$route.query.author
    this.tableInit()
  },
}
</script>
