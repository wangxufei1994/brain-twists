<template>
  <div class="login">
        <mt-header fixed title="注册"></mt-header>
        <div class="form">
          <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
          <mt-field label="确认密码" placeholder="请输入密码" type="password" v-model="password_"></mt-field>
        </div>
        <div class="btn-group">
          <mt-button type="primary" size="large" @click="submit">提交</mt-button>
          <mt-button type="danger" size="large" @click="cancel">取消</mt-button>
        </div>
      </div>
  </div>
</template> 

<script type="text/script">
export default {
  data() {
    return {
      username:"",
      password:"",
      password_:""
    }
  },
  methods:{
    cancel(){
        this.$router.go(-1);
    },
    submit(){
        let username=this.username;
        let password=this.password;
        let password_=this.password_;
        var data={
            username,
            password
        };
        if(username===""){
            this.$toast({
              message:"账号不能为空",
              duration:1000
            });
        }else if(password===""){
            this.$toast({
              message:"密码不能为空",
              duration:1000
            });
        }else if(password_===""){
            this.$toast({
              message:"确认密码不能为空",
              duration:1000
            });
        }else if(password!==password_){
            this.$toast({
              message:"两次输入的密码不一致",
              duration:1000
            });
        }else{
            this.$axios.post("/reg",data).then((res)=>{
                this.$toast({
                  message:res.data.msg,
                  duration:1000
                })
                if(res.data.code===1){
                  setTimeout(() => {
                    this.$router.go(-1);
                  }, 1000);
                }
            })
        }
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
</style>
