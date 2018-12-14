<template>
  <div class="home">
    <router-view></router-view>
    <mt-tabbar v-model="selected" @click.native="selectChange" v-show="isShow">
      <mt-tab-item id="category">
        <i slot="icon" class="iconfont icon-htmal5icon06"></i>
        主页
      </mt-tab-item>
      <mt-tab-item id="my">
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
    const routeName=this.$route.name;
    if(/^(home.my).*$/.test(routeName)){
      this.selected="my"
    }else if(/^(home.category).*$/.test(routeName)){
      this.selected="category"
    }
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
  methods:{
    selectChange(){
      this.$nextTick(()=>{
        let name="";
        if(this.selected==="category"){
          name="home.category";
        }else if(this.selected==="my"){
          name="home.my"
        }
        this.$router.replace({
          name:name
        })
      });
    }
  }
}
</script>

<style scoped>
.iconfont{
  font-size: 22px;
}
</style>
