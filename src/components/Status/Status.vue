<template>
  <div class="status">
    <mt-header fixed title='实时状态'></mt-header>
    <div class="list" v-for="(item,index) in list" :key="index">
      <mt-cell :title="nameArr[index]" is-link @click.native="seeDown(index)" :class="{isActive:showFlag[index]}">
        <span><span class="warn" v-show="item.warn>0">告警:{{item.warn}}</span><span class="normal">正常:{{item.normol}}</span></span>
        <img slot="icon" :src="'./static/img/ve'+index+'.png'" width="24" height="24">
      </mt-cell>
      <div class="list-down">
        <!-- 大门门禁 -->
        <div v-if="index===3" v-show="showFlag[3]">
          <div v-for="(i,index) in item.list" :key="index">
            <mt-field :label="i.name" type="text" readonly></mt-field>
            <mt-field label="状态" type="text" :value="i.status" readonly></mt-field>
            <mt-field label="刷新时间" type="text" :value="i.flush_time" readonly></mt-field>
            <mt-cell title="点击查看机房出入记录" is-link></mt-cell>
          </div>
        </div>
        <!-- ups监控 -->
        <div v-if="index===8" v-show="showFlag[8]">
          <div v-for="(i,index) in item.list" :key="index">
            <mt-field :label="i.name" type="text" readonly></mt-field>
            <mt-field label="输入" type="text" :value="i.input" readonly></mt-field>
            <mt-field label="输出" type="text" :value="i.out" readonly></mt-field>
            <mt-field label="状态" type="text" :value="i.status" readonly></mt-field>
            <mt-field label="刷新时间" type="text" :value="i.flush_time" readonly></mt-field>
          </div>
        </div>
        <!-- 温度湿度 -->
        <div v-if="index===7" v-show="showFlag[7]">
          <div v-for="(i,index) in item.list" :key="index">
            <mt-cell :title="i.name"></mt-cell>
            <mt-field label="温度" type="text" :value="i.t" readonly></mt-field>
            <mt-field label="湿度" type="text" :value="i.h" readonly></mt-field>
            <mt-field label="状态" type="text" :value="i.status" readonly></mt-field>
            <mt-field label="刷新时间" type="text" :value="i.flush_time" readonly></mt-field>
          </div>
        </div>
        <!--配电监控 -->
        <div v-if="index===4" v-show="showFlag[4]">
          <div v-for="(i,index) in item.list" :key="index">
            <mt-cell :title="i.name"></mt-cell>
            <mt-field label="状态" type="text" :value="i.status" readonly></mt-field>
            <mt-field label="刷新时间" type="text" :value="i.flush_time" readonly></mt-field>
          </div>
        </div>
        <!--红外检测 -->
        <div v-if="index===5" v-show="showFlag[5]">
          <div v-for="(i,index) in item.list" :key="index">
            <mt-cell :title="i.name"></mt-cell>
            <mt-field label="状态" type="text" :value="i.status" readonly></mt-field>
            <mt-field label="刷新时间" type="text" :value="i.flush_time" readonly></mt-field>
          </div>
        </div>
        <!--市电 -->
        <div v-if="index===2" v-show="showFlag[2]">
          <div v-for="(i,index) in item.list" :key="index">
            <mt-cell :title="i.name"></mt-cell>
            <mt-field label="输入" type="text" :value="i.input" readonly></mt-field>
            <mt-field label="状态" type="text" :value="i.status" readonly></mt-field>
            <mt-field label="刷新时间" type="text" :value="i.flush_time" readonly></mt-field>
          </div>
        </div>
        <!--空调 -->
        <div v-if="index===0" v-show="showFlag[0]">
          <div v-for="(i,index) in item.list" :key="index">
            <mt-cell :title="i.name"></mt-cell>
            <mt-field label="状态" type="text" :value="i.status" readonly></mt-field>
            <mt-field label="刷新时间" type="text" :value="i.flush_time" readonly></mt-field>
          </div>
        </div>
        <!--漏水检测 -->
        <div v-if="index===9" v-show="showFlag[9]">
          <div v-for="(i,index) in item.list" :key="index">
            <mt-cell :title="i.name"></mt-cell>
            <mt-field label="状态" type="text" :value="i.status" readonly></mt-field>
            <mt-field label="刷新时间" type="text" :value="i.flush_time" readonly></mt-field>
          </div>
        </div>
        <!--蓄电池 -->
        <div v-if="index===1" v-show="showFlag[1]">
          <div v-for="(i,index) in item.list" :key="index">
            <mt-cell :title="i.name"></mt-cell>
            <mt-field label="状态" type="text" :value="i.status" readonly></mt-field>
            <mt-field label="刷新时间" type="text" :value="i.flush_time" readonly></mt-field>
          </div>
        </div>
        <!--烟感 -->
        <div v-if="index===6" v-show="showFlag[6]">
          <div v-for="(i,index) in item.list" :key="index">
            <mt-cell :title="i.name"></mt-cell>
            <mt-field label="状态" type="text" :value="i.status" readonly></mt-field>
            <mt-field label="刷新时间" type="text" :value="i.flush_time" readonly></mt-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      list:[],
      namArr:[],
      showFlag:[]
    }
  },
  methods:{
   getList(){
     let data={
       uid:JSON.parse(localStorage.getItem("userInfo")).uid
     }
     this.$axios.post("/html/monitor/realStatusData",data).then(res=>{
       let data=res.data.data;
       let nameArr=["空调检测","蓄电池监控","市电监控","门禁","配电监控","红外检测","烟感","温度湿度","ups监控","漏水检测"];
       let arr=[data.airData,data.batteryData,data.electricData,data.lockData,data.powerData,data.rayData,data.smokeData,data.temperatureData,data.upsData,data.waterData];
       this.list=arr;
       this.nameArr=nameArr;
       this.showFlag=[false,false,false,false,false,false,false,false,false,false]
     })
   } ,
   seeDown(i){
     let flag=this.showFlag[i];
     this.showFlag=[false,false,false,false,false,false,false,false,false,false];
     this.showFlag[i]=!flag;
   }
  },
  created(){
    this.getList();
  }
}
</script>

<style scoped>
.warn{
  color:#FF0000;
  display:inline-block;
  margin-right: 10px;
}
.normal{
  color:#00aff0;
  display:inline-block;
}
</style>
