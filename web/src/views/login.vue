<template>
  <div class="home">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formInline.password" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'login',
  data() {
    return {
      formInline: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    
  },
  methods: {
    onLogin() {
      this.axios.post('/api/user/login',
        this.formInline
      ).then((res) => {
        console.log(res);
        if(!res.data.errno){
          this.$router.push('/')
        }else{
          this.$message('账号或密码错误，请重试')
        }
      }).catch((error) => {
        console.error(error);
      })
      
    }
  },
  mounted() {
   
  },
}
</script>
