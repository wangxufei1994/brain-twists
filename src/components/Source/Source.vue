<template>
  <div class="page">
      <mt-header fixed title="资源查询"></mt-header>
      <mt-cell :title="item.name"  is-link :to="{name:'home.motor',params:{id:item.id}}" v-for="item in list" :key="item.id"></mt-cell>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      list:[]
    }
  },
  methods: {
    getList(){
      let data={};
      data.uid=JSON.parse(localStorage.getItem("userInfo")).uid;
      data.pageNum=1;
      data.pageSize=100;
      this.$axios.post("html/resource/resourceList",data).then(res=>{
        this.list=res.data.data.list;
      })
    }
  },
  created() {
    this.getList();
  },
}
</script>

<style scoped>
</style>
