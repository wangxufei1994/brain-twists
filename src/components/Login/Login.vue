<template>
  <div class="login">
        <mt-header fixed title="登录"></mt-header>
        <img src="../../assets/img/logo.png" class="logo" />
        <div class="form">
          <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        </div>
        <div class="btn-group">
          <mt-button type="primary" size="large" @click="login">登录</mt-button>
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
    login(){
      if(this.username===""){
        this.$toast({
          message:"账号不能为空",
          duration:1000
        })
      }else if(this.password===""){
        this.$toast({
          message:"密码不能为空",
          duration:1000
        })
      }else{
        var data={
          username:this.username,
          password:this.password
        }
        this.$axios.post('/html/User/login',data).then((res)=>{
          if(res.data.Code==="0"){
            this.$toast({
              message:res.data.msg,
              duration:1000
            })
          }else{
            this.$toast({
              message:"登录成功",
              duration:1000
            })
            setTimeout(() => {
              localStorage.setItem("userInfo",JSON.stringify(res.data));
              this.$router.replace({
                name:"home.status"
              });
            }, 1000);
          }
        });
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    if(localStorage.getItem("userInfo")){
      next(vm=>{
        vm.$router.replace({
          name:"home.status"
        })
      })
    }else{
      next();
    }
  }
}
</script>

<style scoped>
.logo{
  margin:80px auto 0;
  display:block;
  width:70px;
}
.form{
  margin: 60px 0 40px 0;
}
</style>
