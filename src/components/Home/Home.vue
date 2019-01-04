<template>
  <div class="home">
    <router-view class="container"></router-view>
    <mt-tabbar v-model="selected" @click.native="select" v-show="isShow">
      <mt-tab-item id="home.status">
        <i slot="icon" class="iconfont icon-zhinanzhen"></i>
        实时状态
      </mt-tab-item>
      <mt-tab-item id="home.source">
        <i slot="icon" class="iconfont icon-liebiao"></i>
        资源查询
      </mt-tab-item>
      <mt-tab-item id="home.inspect">
        <i slot="icon" class="iconfont icon-xunjian"></i>
        巡检
      </mt-tab-item>
      <mt-tab-item id="home.my">
        <i slot="icon" class="iconfont icon-wode"></i>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      selected:'',
      isShow:true,
      clientHeight:document.body.clientHeight
    }
  },
  created() {
    let name=this.$route.name;
    if(/^home.source.*$/.test(name)){
      name="home.source"
    }
    if(/^home.inspect.*$/.test(name)){
      name="home.inspect"
    }
    this.selected=name;
  },
  mounted() {
    window.onresize=()=>{
      if(document.body.clientHeight<this.clientHeight){
        this.isShow=false;
      }else{
        this.isShow=true;
      }
    }
  },
  methods: {
    select(){
      let name=this.selected;
      this.$router.replace({
        name:name
      })
    }
  },
}
</script>

<style scoped>
.iconfont{
  font-size: 22px;
}
.container{
  margin:40px 0 55px;
}
.mint-tabbar{
  position: fixed;
}
</style>
