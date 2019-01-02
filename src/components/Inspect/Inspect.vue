<template>
  <div class="">
      <mt-header fixed title="巡检"></mt-header>
      <div class="btn-group">
        <mt-button type="default" size="large" v-if="userInfo.auth==1||userInfo.auth==3" @click.native="inspect(1)">巡检列表</mt-button>
        <mt-button type="default" size="large" @click.native="inspect(2)">我的巡检</mt-button>
      </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      userInfo:{}
    }
  },
  created() {
    let userInfo=JSON.parse(localStorage.getItem("userInfo"));
    this.userInfo=userInfo;
  },
  methods: {
    inspect(i){
      if(i==1){
        this.$router.push({
          name:"home.inspect.list"
        });
      }
    }
  },
}
</script>

<style scoped>
.btn-group{
  margin-top:100px;
}
</style>
