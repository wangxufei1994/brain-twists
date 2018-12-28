<template>
  <div class="my">
      <mt-header fixed title="个人中心"></mt-header>
      <img :src="user.imgUrl" alt="">
      <div class="user-info">
        <mt-field label="姓名" v-model="user.name" readonly disableClear></mt-field>
        <mt-field label="职位" v-model="user.roleList" readonly disableClear></mt-field>
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
        user:{}
    }
  },
  created() {
    this.user=JSON.parse(localStorage.getItem("userInfo"))
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
  margin:60px auto 0;
}
.user-info{
  margin-top:50px;
}
</style>
