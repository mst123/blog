<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">首页</router-link> |
      <router-link to="/login">login</router-link> |
      <router-link to="/blogManage">管理我的博客</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'APP',
  data() {
    return {
      
    }
  },
  components: {
    
  },
  methods: {
    
  },
  mounted() {
    //针对返回结果的拦截
    this.axios.interceptors.response.use( (response) => {
      // 对响应数据做点什么
      if(response.data.message=="尚未登陆"){
        this.$router.push('/login')
      }
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
