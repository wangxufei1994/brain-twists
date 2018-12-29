<template>
  <div class="page">
      <mt-header fixed :title="title">
        <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      </mt-header>
      <!-- UPS信息 -->
      <div v-if="type===4">
        <mt-field label="品牌" :value="data.brand" readonly disableClear></mt-field>
        <mt-field label="型号" :value="data.type" readonly disableClear></mt-field>
        <mt-field label="额定容量" :value="data.rate_capacity" readonly disableClear></mt-field>
        <mt-field label="使用容量" :value="data.user_capacity" readonly disableClear></mt-field>
        <mt-field label="购买时间" :value="data.buy_time" readonly disableClear></mt-field>
        <mt-field label="巡检频率" :value="data.rate" readonly disableClear></mt-field>
        <mt-field label="巡检时间" :value="data.polling_time" readonly disableClear></mt-field>
        <mt-field label="服务商" :value="data.facilitator_name" readonly disableClear></mt-field>
        <div v-for="item in data.facilitator_info">
          <mt-field label="联系人" :value="item.person_name" readonly disableClear></mt-field>
          <mt-field label="联系电话" :value="item.office_phone" readonly disableClear></mt-field>
        </div>
      </div>
      <!-- 配电资源 -->
      <div v-if="type===7">
        <mt-field label="配电柜品牌" :value="data.power_brand" readonly disableClear></mt-field>
        <mt-field label="开关品牌" :value="data.switch_brand" readonly disableClear></mt-field>
        <mt-field label="总功率" :value="data.total_power" readonly disableClear></mt-field>
        <mt-field label="主线缆" :value="data.line_length" readonly disableClear></mt-field>
        <mt-field label="电源" :value="data.power_type" readonly disableClear></mt-field>
        <mt-field label="额定功率" :value="data.rate_capacity" readonly disableClear></mt-field>
        <mt-field label="使用功率" :value="data.use_capacity" readonly disableClear></mt-field>
      </div>
      <!-- 空调资源 -->
      <div v-if="type===6">
        <mt-field label="品牌" :value="data.brand" readonly disableClear></mt-field>
        <mt-field label="型号" :value="data.type" readonly disableClear></mt-field>
        <mt-field label="类型" :value="data.user_type" readonly disableClear></mt-field>
        <mt-field label="额定容量" :value="data.rate_capacity" readonly disableClear></mt-field>
        <mt-field label="制冷量" :value="data.cool_capacity" readonly disableClear></mt-field>
        <mt-field label="购买时间" :value="data.buy_time" readonly disableClear></mt-field>
        <mt-field label="巡检频率" :value="data.rate" readonly disableClear></mt-field>
        <mt-field label="过滤网更换时间" :value="data.filter_time" readonly disableClear></mt-field>
        <mt-field label="加湿罐更换时间" :value="data.humidify_time" readonly disableClear></mt-field>
        <mt-field label="质保时间" :value="data.quality_time" readonly disableClear></mt-field>
        <mt-field label="服务商" :value="data.facilitator_name" readonly disableClear></mt-field>
        <div v-for="item in data.facilitator_info">
          <mt-field label="联系人" :value="item.person_name" readonly disableClear></mt-field>
          <mt-field label="联系电话" :value="item.office_phone" readonly disableClear></mt-field>
        </div>
      </div>
      <!-- 电池资源 -->
      <div v-if="type===8">
        <mt-field label="品牌" :value="data.brand" readonly disableClear></mt-field>
        <mt-field label="型号" :value="data.type" readonly disableClear></mt-field>
        <mt-field label="额定容量" :value="data.capacity" readonly disableClear></mt-field>
        <mt-field label="电池数量" :value="data.count" readonly disableClear></mt-field>
        <mt-field label="购买时间" :value="data.buy_time" readonly disableClear></mt-field>
        <mt-field label="充放电频率" :value="data.rate" readonly disableClear></mt-field>
        <mt-field label="充放电时间" :value="data.power_time" readonly disableClear></mt-field>
        <mt-field label="服务商" :value="data.facilitator_name" readonly disableClear></mt-field>
        <div v-for="item in data.facilitator_info">
          <mt-field label="联系人" :value="item.person_name" readonly disableClear></mt-field>
          <mt-field label="联系电话" :value="item.office_phone" readonly disableClear></mt-field>
        </div>
      </div>
      <!-- 存储资源 -->
      <div v-if="type===3&&loaded">
        <mt-field label="设备编号" :value="data.number" readonly disableClear></mt-field>
        <mt-field label="设备名称" :value="data.name" readonly disableClear></mt-field>
        <mt-field label="购买时间" :value="data.buy_time" readonly disableClear></mt-field>
        <mt-field label="维保到期" :value="data.main_time" readonly disableClear></mt-field>
        <mt-field label="主备情况" :value="data.master_type | master" readonly disableClear></mt-field>
        <mt-field label="机头品牌" :value="data.head_brand" readonly disableClear></mt-field>
        <mt-field label="机头型号" :value="data.head_type" readonly disableClear></mt-field>
        <mt-field label="盘柜品牌" :value="data.shelf_brand" readonly disableClear></mt-field>
        <mt-field label="盘柜型号" :value="data.shelf_type" readonly disableClear></mt-field>
        <div v-if="data.ipList.length>0">
          <h4>
            IP信息
          </h4>
          <div v-for="ip in data.ipList" :key="ip.ipAddr">
            <mt-field label="IP地址" :value="ip.ipAddr" readonly disableClear></mt-field>
            <mt-field label="MAC地址" :value="ip.macAddr" readonly disableClear></mt-field>
            <mt-field label="用途" :value="ip.purpose" readonly disableClear></mt-field>
          </div>
        </div>
        <div v-if="data.diskList.length>0">
          <h4>
            硬盘信息
          </h4>
          <div v-for="(k,index) in data.diskList" :key="index">
            <mt-field label="硬盘种类" :value="k.kind  | diskKind" readonly disableClear></mt-field>
            <mt-field label="硬盘裸容量" :value="k.bare_size_unit | diskUnit(k.bare_size)" readonly disableClear></mt-field>
            <mt-field label="单块硬盘容量" :value="k.one_size_unit | diskUnit(k.one_size)" readonly disableClear></mt-field>
            <mt-field label="硬盘数量" :value="k.number" readonly disableClear></mt-field>
            <mt-field label="备份方式" :value="k.copy_type | diskCopy" readonly disableClear></mt-field>
          </div>
        </div>
        <div v-if="data.interfaceList.length>0">
          <h4>
            网络接口
          </h4>
          <div v-for="(k,index) in data.interfaceList" :key="index">
            <mt-field label="类型" :value="k.kind  | netKind" readonly disableClear></mt-field>
            <mt-field label="数量" :value="k.number" readonly disableClear></mt-field>
          </div>
        </div>
        <mt-field label="电源数量" :value="data.power_number" readonly disableClear></mt-field>
        <mt-field label="备份方式" :value="data.copy_type|diskCopy" readonly disableClear></mt-field>
        <mt-field label="供电方式" :value="data.power_type|powerType" readonly disableClear></mt-field>
        <mt-field label="服务商" :value="data.facilitator_name" readonly disableClear></mt-field>
        <div v-for="item in data.facilitator_info">
          <mt-field label="联系人" :value="item.person_name" readonly disableClear></mt-field>
          <mt-field label="联系电话" :value="item.office_phone" readonly disableClear></mt-field>
        </div>
      </div>
      <!-- 网络设备 -->
      <div v-if="type===5&&loaded">
        <mt-field label="设备编号" :value="data.number" readonly disableClear></mt-field>
        <mt-field label="设备名称" :value="data.name" readonly disableClear></mt-field>
        <mt-field label="品牌" :value="data.brand" readonly disableClear></mt-field>
        <mt-field label="型号" :value="data.type" readonly disableClear></mt-field>
        <mt-field label="购买时间" :value="data.buy_time" readonly disableClear></mt-field>
        <mt-field label="维保到期" :value="data.main_time" readonly disableClear></mt-field>
        <mt-field label="主备情况" :value="data.master_type | master" readonly disableClear></mt-field>
        <mt-field label="管理地址" :value="data.manage_addr" readonly disableClear></mt-field>
        <mt-field label="电源数量" :value="data.power_number" readonly disableClear></mt-field>
        <div v-if="data.interfaceList.length>0">
          <h4>
            网络接口
          </h4>
          <div v-for="(k,index) in data.interfaceList" :key="index">
            <mt-field label="类型" :value="k.kind  | netKind" readonly disableClear></mt-field>
            <mt-field label="数量" :value="k.number" readonly disableClear></mt-field>
          </div>
        </div>
        <mt-field label="吞吐量" :value="data.inout_unit|inout(data.inout_size)" readonly disableClear></mt-field>
        <mt-field label="并发链接数" :value="data.inout_unit|inout(data.inout_size)" readonly disableClear></mt-field>
        <mt-field label="支持人数" :value="data.support_nunber" readonly disableClear></mt-field>
        <mt-field label="供电方式" :value="data.power_type|powerType" readonly disableClear></mt-field>
        <mt-field label="模块类型" :value="data.module_type===2?'多模':'单模'" readonly disableClear></mt-field>
      </div>
      <!-- 服务器资源 -->
      <div v-if="type===1&&loaded">
        <mt-field label="设备编号" :value="data.number" readonly disableClear></mt-field>
        <mt-field label="设备名称" :value="data.name" readonly disableClear></mt-field>
        <mt-field label="购买时间" :value="data.buy_time" readonly disableClear></mt-field>
        <mt-field label="维保到期" :value="data.main_time" readonly disableClear></mt-field>
        <mt-field label="主备情况" :value="data.master_type | master" readonly disableClear></mt-field>
        <mt-field label="品牌" :value="data.brand" readonly disableClear></mt-field>
        <mt-field label="型号" :value="data.type" readonly disableClear></mt-field>
        <div v-if="data.ipList.length>0">
          <h4>
            IP信息
          </h4>
          <div v-for="ip in data.ipList" :key="ip.ipAddr">
            <mt-field label="IP地址" :value="ip.ipAddr" readonly disableClear></mt-field>
            <mt-field label="MAC地址" :value="ip.macAddr" readonly disableClear></mt-field>
            <mt-field label="用途" :value="ip.purpose" readonly disableClear></mt-field>
          </div>
        </div>
        <div v-if="data.cpuList.length>0">
          <h4>
            CPU信息
          </h4>
          <div v-for="(item,index) in data.cpuList" :key="index">
            <mt-field label="CPU型号" :value="item.model" readonly disableClear></mt-field>
            <mt-field label="CPU频率" :value="item.number" readonly disableClear></mt-field>
            <mt-field label="CPU颗数" :value="item.rate" readonly disableClear></mt-field>
          </div>
        </div>
        <div v-if="data.memoryList.length>0">
          <h4>
            内存信息
          </h4>
          <div v-for="(item,index) in data.memoryList" :key="index">
            <mt-field label="内存型号" :value="item.model" readonly disableClear></mt-field>
            <mt-field label="内存大小" :value="item.size_unit | diskUnit(item.size)" readonly disableClear></mt-field>
            <mt-field label="内存单条大小" :value="item.one_size_unit | diskUnit(item.one_size)" readonly disableClear></mt-field>
            <mt-field label="内存条数" :value="item.number" readonly disableClear></mt-field>
          </div>
        </div>
        <div v-if="data.diskList.length>0">
          <h4>
            硬盘信息
          </h4>
          <div v-for="(k,index) in data.diskList" :key="index">
            <mt-field label="硬盘种类" :value="k.kind  | diskKind" readonly disableClear></mt-field>
            <mt-field label="硬盘裸容量" :value="k.bare_size_unit | diskUnit(k.bare_size)" readonly disableClear></mt-field>
            <mt-field label="单块硬盘容量" :value="k.one_size_unit | diskUnit(k.one_size)" readonly disableClear></mt-field>
            <mt-field label="硬盘数量" :value="k.number" readonly disableClear></mt-field>
            <mt-field label="备份方式" :value="k.copy_type | diskCopy" readonly disableClear></mt-field>
          </div>
        </div>
        <div v-if="data.interfaceList.length>0">
          <h4>
            网络接口
          </h4>
          <div v-for="(k,index) in data.interfaceList" :key="index">
            <mt-field label="类型" :value="k.kind  | netKind" readonly disableClear></mt-field>
            <mt-field label="数量" :value="k.number" readonly disableClear></mt-field>
          </div>
        </div>
        <mt-field label="电源功率" :value="data.power_rate" readonly disableClear></mt-field>
        <mt-field label="电源数量" :value="data.power_number" readonly disableClear></mt-field>
        <mt-field label="USB接口数量" :value="data.usb_number" readonly disableClear></mt-field>
        <mt-field label="服务器类型" :value="data.server_type|serverType" readonly disableClear></mt-field>
        <mt-field label="供电方式" :value="data.power_type|powerType" readonly disableClear></mt-field>
        <mt-field label="显卡频率" :value="data.gpu_rate+'MHZ'" readonly disableClear></mt-field>
        <mt-field label="显卡最大分辨率" :value="data.gpu_ratio+'像素'" readonly disableClear></mt-field>
        <mt-field label="服务商" :value="data.facilitator_name" readonly disableClear></mt-field>
        <div v-for="item in data.facilitator_info">
          <mt-field label="联系人" :value="item.person_name" readonly disableClear></mt-field>
          <mt-field label="联系电话" :value="item.office_phone" readonly disableClear></mt-field>
        </div>
      </div>
      <!-- 交换机 -->
      <div v-if="type===2&&loaded">
        <mt-field label="设备编号" :value="data.number" readonly disableClear></mt-field>
        <mt-field label="设备名称" :value="data.name" readonly disableClear></mt-field>
        <mt-field label="购买时间" :value="data.buy_time" readonly disableClear></mt-field>
        <mt-field label="维保到期" :value="data.main_time" readonly disableClear></mt-field>
        <mt-field label="主备情况" :value="data.master_type | master" readonly disableClear></mt-field>
        <mt-field label="品牌" :value="data.brand" readonly disableClear></mt-field>
        <mt-field label="型号" :value="data.type" readonly disableClear></mt-field>
        <mt-field label="管理地址" :value="data.manage_addr" readonly disableClear></mt-field>
        <mt-field label="电源数量" :value="data.power_number" readonly disableClear></mt-field>
        <div v-if="data.interfaceList.length>0">
          <h4>
            网络接口
          </h4>
          <div v-for="(k,index) in data.interfaceList" :key="index">
            <mt-field label="类型" :value="k.kind  | netKind" readonly disableClear></mt-field>
            <mt-field label="数量" :value="k.number" readonly disableClear></mt-field>
          </div>
        </div>
        <mt-field label="背板带宽" :value="data.backband_unit  | diskUnit(data.backband_size)" readonly disableClear></mt-field>
        <mt-field label="交换能力" :value="data.ability_nuit  | diskUnit(data.ability)" readonly disableClear></mt-field>
        <mt-field label="供电方式" :value="data.power_type|powerType" readonly disableClear></mt-field>
        <mt-field label="服务商" :value="data.facilitator_name" readonly disableClear></mt-field>
        <div v-for="item in data.facilitator_info">
          <mt-field label="联系人" :value="item.person_name" readonly disableClear></mt-field>
          <mt-field label="联系电话" :value="item.office_phone" readonly disableClear></mt-field>
        </div>
      </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      data:{},
      title:"详细信息",
      type:'',
      loaded:false
    }
  },
  methods: {
    getDetail(){
      let data={};
      data.id=this.$route.query.id;
      data.type=this.$route.query.type;
      data.uid=JSON.parse(localStorage.getItem("userInfo")).uid;

      let url="html/resource/resourceDetail";
      if(data.type==3 || data.type==5 || data.type==1 || data.type==2){
        url="html/resource/deviceDetail"
      }
      this.$axios.post(url,data).then(res=>{
        this.data=res.data.data;
        this.loaded=true;
      });
    },
    back(){
      this.$router.go(-1)
    }
  },
  created() {
    this.type=parseInt(this.$route.query.type);
    this.getDetail();
  },
  filters:{
    //主备情况
    master(x){
      switch (parseInt(x)) {
        case 1:
          return '主'
          break;
        case 2:
          return '备'
          break;
        case 3:
          return '无'
          break;
        default:
          break;
      }
    },
    //硬盘种类
    diskKind(x){
      switch (parseInt(x)) {
        case 1:
          return 'SATA硬盘'
          break;
        case 2:
          return 'SAS硬盘'
          break;
        case 3:
          return 'SCSI硬盘'
          break;
        default:
          break;
      }
    },
    //硬盘容量
    diskUnit(x,y){
      switch (parseInt(x)) {
        case 1:
          return y+'MB'
          break;
        case 2:
          return y+'GB'
          break;
        case 3:
          return y+'TB'
          break;
        default:
          break;
      }
    },
    //硬盘备份方式
    diskCopy(x){
      switch (parseInt(x)) {
        case 1:
          return 'ride0'
          break;
        case 2:
          return 'ride1'
          break;
        case 3:
          return 'ride5'
          break;
        case 4:
          return 'ride6'
          break;
        case 5:
          return 'ride10'
          break;
        default:
          break;
      }
    },
    //网络接口类型
    netKind(x){
      switch (parseInt(x)) {
        case 1:
          return '百兆电口'
          break;
        case 2:
          return '千兆电口'
          break;
        case 3:
          return '千兆光口'
          break;
        case 4:
          return '万兆光口'
          break;
        case 5:
          return 'FC卡'
          break;
        default:
          break;
      }
    },
    //供电方式
    powerType(x){
      switch (parseInt(x)) {
        case 1:
          return 'UPS电'
          break;
        case 2:
          return '市电'
          break;
        case 3:
          return 'UPS电+市电'
          break;
        default:
          break;
      }
    },
    //吞吐量
    inout(x,y){
      switch (parseInt(x)) {
        case 1:
          return y+'Mbps'
          break;
        case 2:
          return y+'Gbps'
          break;
        case 3:
          return y+'Tbps'
          break;
        default:
          break;
      }
    },
    //服务器类型
    serverType(x){
      switch (parseInt(x)) {
        case 1:
          return '刀片式'
          break;
        case 2:
          return '塔式'
          break;
        case 3:
          return '机架式'
          break;
        default:
          break;
      }
    },
    // //背板带宽
    // backband(x,y){
    //   switch (parseInt(x)) {
    //     case 1:
    //       return y+'Mbps'
    //       break;
    //     case 2:
    //       return y+'Gbps'
    //       break;
    //     case 3:
    //       return y+'Tbps'
    //       break;
    //     default:
    //       break;
    //   }
    // }
  }
}
</script>

<style scoped>
h4{
  padding:10px;
  font-size: 16px;
}
</style>
