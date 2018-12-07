<template>
  <div class="category">
    <mt-swipe :auto="5000" class="container-swipe">
        <mt-swipe-item v-for="(item,index) in bannerArr" :key="index" >
          <img :src="item" />
        </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      bannerArr:[]
    }
  },
  created() {
    this.$axios.get('/getBanner',{}).then((res)=>{
      this.bannerArr=res.data.data;
    });
  },
}
</script>

<style scoped>
.container-swipe{
    height:200px;
}
.container-swipe img{
  width:100%;
  height:100%;
}
</style>
