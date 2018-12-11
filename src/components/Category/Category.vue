<template>
  <div class="category">
    <mt-swipe :auto="5000" class="container-swipe">
        <mt-swipe-item v-for="(item,index) in bannerArr" :key="index" >
          <img :src="item" @click="goApp(index)" />
        </mt-swipe-item>
    </mt-swipe>
    <ul class="grid">
      <li>
        <router-link :to="{name:'home.category.twists'}">
          <i class="iconfont icon-naojinjizhuanwan"></i>
          <p>脑筋急转弯</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'home.category.joke'}">
          <i class="iconfont icon-xiao-"></i>
          <p>笑话</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'home.category.riddle'}">
          <i class="iconfont icon-caimiyu"></i>
          <p>谜语</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'home.category.brain'}">
          <i class="iconfont icon-danao"></i>
          <p>头脑王者</p>
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
  methods:{
    goApp(index){
      let name="";
      switch (index) {
        case 0:
          name="home.category.twists"
          break;
        case 1:
          name="home.category.joke"
          break;
        case 2:
          name="home.category.riddle"
          break;
        case 3:
          name="home.category.brain"
          break;
        default:
          break;
      }
      this.$router.push({
        name:name
      })
    }
  }
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
  flex-flow: row wrap;
  justify-content: center;
	align-items: center;
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
  color:#666666;
}
.grid .iconfont{
  font-size: 34px;
}
.grid p{
  margin: 10px 0;
}
</style>
