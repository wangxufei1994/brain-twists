<template>
  <div class="my">
      <img src="../../assets/img/head.jpg" alt="">
      <div class="user-info">
        <mt-field label="昵称" v-model="username"></mt-field>
        <mt-field label="性别" v-model="sex"></mt-field>
      </div>
      <div class="btn-group">
        <mt-button type="danger" size="large" @click="logout">退出</mt-button>
      </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
        username:"脑筋急转弯",
        sex:"男"
    }
  },
  methods:{
    logout(){
      localStorage.removeItem("userInfo");
      this.$router.replace({
        name:"login"
      });
    }
  }
}
</script>

<style scoped>
.my{
  width:100%;
  height:100%;
}
img{
  display:block;
  width: 70px;
  height:70px;
  border-radius:50%;
  border:1px solid #ff0000;
  margin:20px auto;
}
.user-info{
  margin-top:50px;
}
</style>
