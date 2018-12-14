<template>
  <div class="category">
    <mt-swipe :auto="5000" class="container-swipe">
        <mt-swipe-item v-for="(item,index) in bannerArr" :key="index" >
          <img :src="item" @click="goApp(index)" />
        </mt-swipe-item>
    </mt-swipe>
    <ul class="grid">
      <li v-for="(item,index) in gridArr" :key="index">
        <router-link :to="item.link">
          <i class="iconfont" :class="item.iconfont"></i>
          <p>{{item.title}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      bannerArr:[],
      gridArr:[{
        title:"脑筋急转弯",
        iconfont:"icon-zhuanjie",
        link:{name:'home.category.twists'}
      },{
        title:"笑话",
        iconfont:"icon-xiao-",
        link:{name:'home.category.joke'}
      },{
        title:"谜语",
        iconfont:"icon-caimiyu",
        link:{name:'home.category.riddle'}
      },{
        title:"头脑王者",
        iconfont:"icon-danao",
        link:{name:'home.category.brain'}
      },{
        title:"日记本",
        iconfont:"icon-notepad",
        link:{name:'home.category.diary'}
      }]
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
  justify-content: left;
}
.grid li{
  flex:0 0 25%;
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
