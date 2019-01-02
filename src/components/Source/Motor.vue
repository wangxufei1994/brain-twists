<template>
  <div class="page">
      <mt-header fixed :title="title">
          <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      </mt-header>
      <h3>核心资源</h3>
      <div @click="main">
       
        <mt-field label="网络机柜" :value="baseData.netCabinet_count" readonly type="text" disableClear></mt-field>
        
        <mt-field label="服务器机柜" :value="baseData.serverCabinet_count" readonly type="text" disableClear></mt-field>
       
        <mt-field label="自定义机柜" :value="baseData.personCabinet_count" readonly type="text" disableClear></mt-field>
        
        <mt-field label="服务器设备" :value="baseData.serverCount" readonly type="text" disableClear></mt-field>
        
        <mt-field label="交换机设备" :value="baseData.changerCount" readonly type="text" disableClear></mt-field>
       
        <mt-field label="存储设备" :value="baseData.storeCount" readonly type="text" disableClear></mt-field>
        
        <mt-field label="路由器设备" :value="baseData.routerCount" readonly type="text" disableClear></mt-field>
        
        <mt-field label="网络安全设备" :value="baseData.netSafeCount" readonly type="text" disableClear></mt-field>
        
        <mt-field label="光纤数量" :value="baseData.optical_count" readonly type="text" disableClear></mt-field>
        
        <mt-field label="网线容量" :value="baseData.netline_count" readonly type="text" disableClear></mt-field>
       
        <mt-field label="计算能力" :value="baseData.count_ability" readonly type="text" disableClear></mt-field>
        
        <mt-field label="存储能力" :value="baseData.store_ability" readonly type="text" disableClear></mt-field>
        
        <mt-field label="交换能力" :value="baseData.changer_ability" readonly type="text" disableClear></mt-field>
      </div>
      <h3 v-if="upsData.length>0">UPS资源</h3>
      <div v-for="(item,index) in upsData" :key="index+'1'" @click="equip(item.id,item.type)">
        <mt-field :label="item.name" readonly type="text" disableClear></mt-field>
        <mt-field label="品牌" :value="item.param0==''?'暂无信息':item.param0" readonly type="text" disableClear></mt-field>
        <mt-field label="额定容量" :value="item.param1" readonly type="text" disableClear></mt-field>
        <mt-field label="使用容量" :value="item.param2" readonly type="text" disableClear></mt-field>
      </div>
      <h3 v-if="powerData.length>0">配电资源</h3>
      <div v-for="(item,index) in powerData" :key="index+'2'" @click="equip(item.id,item.type)">
        <mt-field :label="item.name" readonly type="text" disableClear></mt-field>
        <mt-field label="主线缆" :value="item.param1==''?'暂无信息':item.param1" readonly type="text" disableClear></mt-field>
        <mt-field label="电源" :value="item.param2==''?'暂无信息':item.param2" readonly type="text" disableClear></mt-field>
        <mt-field label="额定功率" :value="item.param3" readonly type="text" disableClear></mt-field>
        <mt-field label="已使用功率" :value="item.param4" readonly type="text" disableClear></mt-field>
      </div>
      <h3 v-if="airData.length>0">空调资源</h3>
      <div v-for="(item,index) in airData" :key="index+'3'" @click="equip(item.id,item.type)">
        <mt-field :label="item.name" readonly type="text" disableClear></mt-field>
        <mt-field label="额定容量" :value="item.param1==''?'暂无信息':item.param1" readonly type="text" disableClear></mt-field>
        <mt-field label="制冷量" :value="item.param2==''?'暂无信息':item.param2" readonly type="text" disableClear></mt-field>
      </div>
      <h3 v-if="batteryData.length>0">电池资源</h3>
      <div v-for="(item,index) in batteryData" :key="index+'4'" @click="equip(item.id,item.type)">
        <mt-field :label="item.name" readonly type="text" disableClear></mt-field>
        <mt-field label="容量" :value="item.param1==''?'暂无信息':item.param1" readonly type="text" disableClear></mt-field>
        <mt-field label="电池数量" :value="item.param2==''?'暂无信息':item.param2" readonly type="text" disableClear></mt-field>
        <mt-field label="上次放电时间" :value="item.param3==''?'暂无信息':item.param3" readonly type="text" disableClear></mt-field>
      </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      title:"我是你的哥",
      airData:[],
      baseData:{},
      batteryData:[],
      engine_id:'',
      powerData:[],
      upsData:[]
    }
  },
  methods: {
    getList(){
      let data={};
      data.uid=JSON.parse(localStorage.getItem("userInfo")).uid;
      data.id=this.$route.params.id;
      this.$axios.post("html/resource/engineDetail",data).then(res=>{
        this.airData=res.data.airData;
        this.baseData=res.data.baseData;
        this.batteryData=res.data.batteryData;
        this.engine_id=res.data.engine_id;
        this.powerData=res.data.powerData;
        this.upsData=res.data.upsData;
      })
    },
    equip(id,type){
      this.$router.push({
        name:"home.source.device",
        query:{
          id:id,
          type:type,
          c:1
        }
      });
    },
    back(){
      this.$router.go(-1)
    },
    main(){
      this.$router.push({
        name:"home.source.equipList",
        params:{
          id:this.$route.params.id
        }
      });
    }
  },
  created() {
    this.getList();
  },
}
</script>

<style scoped>
h3{
  padding:10px 10px;
  font-size:18px;
  font-weight: bold;
}
</style>
