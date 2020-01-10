<template>
  <div class="home">
    编辑博客
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'editBlog',
  data() {
    return {
      form: {
        title:'',
        content: ''
      },
      id: ''
    }
  },
  components: {
    
  },
  mounted() {
    this.id = this.$route.query.id || ''
    this.form.title = this.$route.query.title || ''
    this.form.content = this.$route.query.content || ''
  },
  methods: {
    onSubmit(){
      let url, data;

      if(this.id){
        url = '/api/blog/update'
        data = Object.assign({
          id: this.id
        },this.form)
      }else{
        url = '/api/blog/new'
        data = this.form
      }
      this.axios.post(url, 
        data
      )
      .then( (res) => {
        console.log(res);
        if(!res.data.errno){
          this.$message('增加成功')
          this.$router.push('/blogManage')
        }
      })
      .catch( (error) => {
        console.log(error);
      });
    }
   
  },
  
}
</script>
