<template>
  <div class="category">
    <mt-swipe :auto="5000" class="container-swipe">
        <mt-swipe-item v-for="(item,index) in bannerArr" :key="index" >
          <img :src="item" />
        </mt-swipe-item>
    </mt-swipe>
    <ul class="grid">
      <li>
        <router-link :to="{name:'home.category.app',params:{type:1}}">
          <i class="iconfont icon-htmal5icon06"></i>
          <p>脑筋急转弯</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'home.category.app',params:{type:2}}">
          <i class="iconfont icon-htmal5icon06"></i>
          <p>笑话</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'home.category.app',params:{type:3}}">
          <i class="iconfont icon-htmal5icon06"></i>
          <p>谜语</p>
        </router-link>
      </li>
    </ul>
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

.grid{
  display: flex;
  margin-top: 10px;
}
.grid li{
  flex:1;
  text-align: center;
}
.grid li a{
  display: block;
  width: 100%;
  height: 100%;
}
.grid .iconfont{
  font-size: 34px;
}
.grid p{
  margin: 10px 0;
}
</style>
