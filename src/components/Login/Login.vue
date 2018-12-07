<template>
  <div class="login">
        <mt-header fixed title="登录"></mt-header>
        <div class="form">
          <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        </div>
        <div class="btn-group">
          <mt-button type="primary" size="large" @click="login">登录</mt-button>
          <p>
            <a href="javascript:;" @click="register">点击，注册账号</a>
          </p>
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
    },
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
        this.$axios.post('/login',data).then((res)=>{
          this.$toast({
            message:res.data.msg,
            duration:1000
          })
          if(res.data.code===1){
            setTimeout(() => {
              localStorage.setItem("userInfo",JSON.stringify(res.data.data));
              this.$router.replace({
                name:"home.category"
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
          name:"home.category"
        })
      })
    }else{
      next();
    }
  }
}
</script>

<style scoped>
.form{
  margin: 80px 0 40px 0;
}
</style>
