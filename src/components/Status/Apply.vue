<template>
  <div class="apply">
      <mt-header fixed title="申请进入机房">
          <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      </mt-header>
      <div class="field">
        <mt-datetime-picker
          ref="datepicker"
          type="datetime"
          @confirm="dateConfirm"
          v-model="pickerValue">
        </mt-datetime-picker>
        <mt-field label="申请时间" :value="dateTxt" type="text" placeholder="点击选择" @click.native="date" readonly></mt-field>
        <mt-popup
          v-model="popupVisible"
          position="bottom">
          <mt-field v-for="item in reasonArr" :key="item.id" :placeholder="item.name" type="text" readonly class="item-pop" @click.native="checkReason(item)"></mt-field>
        </mt-popup>
        <mt-field label="申请事由" :value="checkedReason.name" type="text" placeholder="点击选择" @click.native="reason" readonly></mt-field>
        <mt-field label="进入人数" type="number" placeholder="请输入" v-model="number"></mt-field>
        <mt-field label="关联代理商" :value="agentTxt.name" type="text" placeholder="点击选择" @click.native="agent" readonly></mt-field>
        <div v-for="(item,index) in personArr" :key="index" >
          <mt-field label="联系人" :value="item.person_name" type="text" readonly></mt-field>
          <mt-field label="联系电话" type="text" :value="item.office_phone" readonly></mt-field>
        </div>
        <mt-popup
          class="popup-field"
          v-model="agentVisible"
          position="bottom">
          <mt-field v-for="(item,index) in agentArr" :key="index" :placeholder="item.name" type="text" readonly class="item-pop" @click.native="checkAgent(item)"></mt-field>
        </mt-popup>
      </div>
      <div class="btn-group">
        <mt-button type="primary" size="large" @click.native="submit">提交</mt-button>
      </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      pickerValue:new Date(),
      popupVisible:false,
      agentVisible:false,
      reasonArr:[],
      agentArr:[],
      checkedReason:{},
      dateTxt:'',
      number:'',
      agentTxt:'',
      personArr:[]
    }
  },
  methods: {
    dateFormat(d){
        return d.getFullYear()+"/"+(d.getMonth()+1<10?('0'+(d.getMonth()+1)):(d.getMonth()+1))+"/"+(d.getDate()<10?('0'+d.getDate()):d.getDate())+' '+(d.getHours()<10?('0'+d.getHours()):d.getHours())+":"+(d.getMinutes()<10?('0'+d.getMinutes()):d.getMinutes());
    },
    date(){
      this.$refs.datepicker.open();
    },
    reason(){
      this.popupVisible=true;
    },
    agent(){
      this.agentVisible=true;
    },
    getReason(){
      let data={
        uid:JSON.parse(localStorage.getItem("userInfo")).uid
      }
      this.$axios.post('html/monitor/enterAccessReason',data).then(res=>{
        this.reasonArr=res.data.data;
      })
    },
    getAgent(){
      let data={
        uid:JSON.parse(localStorage.getItem("userInfo")).uid
      }
      this.$axios.post('html/monitor/enterAccessAgent',data).then(res=>{
        this.agentArr=res.data.data;
      })
    },
    checkReason(i){
      this.checkedReason=i;
      this.popupVisible=false;
    },
    checkAgent(i){
      this.agentTxt=i;
      this.agentVisible=false;
      this.getPerson();
    },
    dateConfirm(){
      let _this=this;
      this.$nextTick(function(){
        console.log(_this.pickerValue)
        _this.dateTxt=_this.dateFormat(_this.pickerValue);
      })
    },
    getPerson(){
      let data={
        keywords:this.agentTxt.name
      }
      this.$axios.post("html/monitor/findLinkByCompanyName",data).then(res=>{
        this.personArr=res.data.data
      })
    },
    submit(){
      let person_ids=[];
      this.personArr.forEach((i,j)=>{
        person_ids.push(i.person_id)
      })
      let data={
        uid:JSON.parse(localStorage.getItem("userInfo")).uid,
        enter_time:this.dateTxt,
        reason_id:this.checkedReason.id,
        number:this.number,
        agent:this.agentTxt.name,
        person_ids:person_ids.join(",")
      }
      if(!data.enter_time){
        this.$toast({
           message:"进入时间不能为空",
           duration:1000
         })
         return;
      }
      if(!data.reason_id){
        this.$toast({
           message:"进入事由不能为空",
           duration:1000
         })
         return;
      }
      if(!data.number){
        this.$toast({
           message:"进入人数不能为空",
           duration:1000
         })
         return;
      }
      this.$axios.post("html/monitor/addApplyEnter",data).then(res=>{
       if(res.data.Code==="1"){
         this.$toast({
           message:"提交成功",
           duration:1000
         })
         setTimeout(() => {
           this.$router.go(-1)
         }, 1000);
       } 
      })
    }
  },
  created() {
    this.getReason();
    this.getAgent();
  },
}
</script>

<style scoped>
.field{
  margin-top:50px;
}
.item-pop{
  width:100%;
}
.popup-field{
  max-height:300px;
  overflow:auto;
}
</style>
