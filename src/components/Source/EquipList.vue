<template>
  <div class="page">
      <mt-header fixed title="设备列表">
          <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      </mt-header>
      <mt-cell :title="item.name"  is-link :to="{name:'home.device',query:{id:item.id,type:item.type}}" v-if="data.data" v-for="(item,index) in data.data" :key="index"></mt-cell>
      <div class="null-data" v-if="data.Code==='0'">
          暂无数据
      </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      data:{}
    }
  },
  methods: {
    getList(){
      let data={};
      data.uid=JSON.parse(localStorage.getItem("userInfo")).uid;
      data.engine_id=this.$route.params.id;
      this.$axios.post("html/resource/deviceList",data).then(res=>{
        this.data=res.data;
      })
    },
    back(){
      this.$router.go(-1)
    },
  },
  created() {
    this.getList();
  },
}
</script>

<style scoped>
.null-data{
    color: #cccccc;
    text-align:center;
    line-height: 80px;
    font-size:13px;
}
</style>
