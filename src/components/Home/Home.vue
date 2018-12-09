<template>
  <div class="home">
    <router-view></router-view>
    <mt-tabbar v-model="selected" @click.native="selectChange">
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
      selected:''
    }
  },
  created() {
    if(this.$route.name==="home.my"){
      this.selected="my"
    }else if(this.$route.name==="home.category" || this.$route.name=="home.category.app"){
      this.selected="category"
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
