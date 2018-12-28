<template>
  <div class="page">
      <mt-header fixed :title="title">
        <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      </mt-header>
      <!-- UPS信息 -->
      <div>
        <mt-field label="品牌" :value="data.brand"></mt-field>
        <mt-field label="型号" :value="data.type"></mt-field>
        <mt-field label="额定容量" :value="data.rate_capacity"></mt-field>
        <mt-field label="使用容量" :value="data.user_capacity"></mt-field>
        <mt-field label="购买时间" :value="data.buy_time"></mt-field>
        <mt-field label="巡检频率" :value="data.rate"></mt-field>
        <mt-field label="巡检时间" :value="data.polling_time"></mt-field>
        <mt-field label="服务商" :value="data.facilitator_name"></mt-field>
        <div v-for="item in data.facilitator_info">
          <mt-field label="联系人" :value="item.person_name"></mt-field>
          <mt-field label="联系电话" :value="item.office_phone"></mt-field>
        </div>
      </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      data:{},
      title:"设备详细信息"
    }
  },
  methods: {
    getDetail(){
      let data={};
      data.id=this.$route.query.id;
      data.type=this.$route.query.type;
      data.uid=JSON.parse(localStorage.getItem("userInfo")).uid;
      this.$axios.post('html/resource/resourceDetail',data).then(res=>{
        this.data=res.data.data;
      });
    },
    back(){
      this.$router.go(-1)
    }
  },
  created() {
    this.getDetail();
  },
}
</script>

<style scoped>
</style>
