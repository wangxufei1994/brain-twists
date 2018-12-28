<template>
  <div class="page">
      <mt-header fixed :title="title">
          <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      </mt-header>
      <h3>核心资源</h3>
      <mt-cell title="网络机柜" is-link>
        <mt-badge size="small">{{baseData.netCabinet_count}}</mt-badge>
      </mt-cell>
      <mt-cell title="服务器机柜" is-link>
        <mt-badge size="small">{{baseData.serverCabinet_count}}</mt-badge>
      </mt-cell>
      <mt-cell title="自定义机柜" is-link>
        <mt-badge size="small">{{baseData.personCabinet_count}}</mt-badge>
      </mt-cell>
      <mt-cell title="服务器设备" is-link>
        <mt-badge size="small">{{baseData.serverCount}}</mt-badge>
      </mt-cell>
      <mt-cell title="交换机设备" is-link>
        <mt-badge size="small">{{baseData.changerCount}}</mt-badge>
      </mt-cell>
      <mt-cell title="存储设备" is-link>
        <mt-badge size="small">{{baseData.storeCount}}</mt-badge>
      </mt-cell>
      <mt-cell title="路由器设备" is-link>
        <mt-badge size="small">{{baseData.routerCount}}</mt-badge>
      </mt-cell>
      <mt-cell title="网络安全设备" is-link>
        <mt-badge size="small">{{baseData.netSafeCount}}</mt-badge>
      </mt-cell>
      <mt-cell title="光纤数量" is-link>
        <mt-badge size="small">{{baseData.optical_count}}</mt-badge>
      </mt-cell>
      <mt-cell title="网线容量" is-link>
        <mt-badge size="small">{{baseData.netline_count}}</mt-badge>
      </mt-cell>
      <mt-cell title="计算能力" is-link>
        <mt-badge size="small">{{baseData.count_ability}}</mt-badge>
      </mt-cell>
      <mt-cell title="存储能力" is-link>
        <mt-badge size="small">{{baseData.store_ability}}</mt-badge>
      </mt-cell>
      <mt-cell title="交换能力" is-link>
        <mt-badge size="small">{{baseData.changer_ability}}</mt-badge>
      </mt-cell>
      <h3>UPS资源</h3>
      <div v-for="(item,index) in upsData" :key="index+'1'" @click="equip(item.id,item.type)">
        <mt-field :label="item.name" readonly type="text" disableClear></mt-field>
        <mt-field label="品牌" :value="item.param0==''?'暂无信息':item.param0" readonly type="text" disableClear></mt-field>
        <mt-field label="额定容量" :value="item.param1" readonly type="text" disableClear></mt-field>
        <mt-field label="使用容量" :value="item.param2" readonly type="text" disableClear></mt-field>
      </div>
      <h3>配电资源</h3>
      <div v-for="(item,index) in powerData" :key="index+'2'" @click="equip(item.id,item.type)">
        <mt-field :label="item.name" readonly type="text" disableClear></mt-field>
        <mt-field label="主线缆" :value="item.param1==''?'暂无信息':item.param1" readonly type="text" disableClear></mt-field>
        <mt-field label="电源" :value="item.param2==''?'暂无信息':item.param2" readonly type="text" disableClear></mt-field>
        <mt-field label="额定功率" :value="item.param3" readonly type="text" disableClear></mt-field>
        <mt-field label="已使用功率" :value="item.param4" readonly type="text" disableClear></mt-field>
      </div>
      <h3>空调资源</h3>
      <div v-for="(item,index) in airData" :key="index+'3'" @click="equip(item.id,item.type)">
        <mt-field :label="item.name" readonly type="text" disableClear></mt-field>
        <mt-field label="额定容量" :value="item.param1==''?'暂无信息':item.param1" readonly type="text" disableClear></mt-field>
        <mt-field label="制冷量" :value="item.param2==''?'暂无信息':item.param2" readonly type="text" disableClear></mt-field>
      </div>
      <h3>电池资源</h3>
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
        name:"home.device",
        query:{
          id:id,
          type:type
        }
      });
    },
    back(){
      this.$router.go(-1)
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
