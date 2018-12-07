<template>
  <div class="login">
        <mt-header fixed title="登录"></mt-header>
        <div class="form">
          <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        </div>
        <div class="btn-group">
          <mt-button type="primary" size="large">登录</mt-button>
          <mt-button type="primary" size="large" class="btn-register" @click="register">注册</mt-button>
        </div>
      </div>
  </div>
</template> 

<script type="text/script">
export default {
  data() {
    return {
      username:"",
      password:""
    }
  },
  methods:{
    register(){
      this.$router.push({
        name:"register"
      });
    }
  }
}
</script>

<style scoped>
.form{
  margin: 80px 0 40px 0;
}
.btn-group{
  padding: 0 15px;
}
.btn-group button{
  margin-bottom:20px;
}
.btn-register{
  background:#00FF7F;
}
</style>
