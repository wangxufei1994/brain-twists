<template>
  <div class="page">
    <mt-header fixed title="新建巡检任务">
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div class="box field">
        <mt-field label="任务名称" placeholder="请输入任务名称" v-model="name"></mt-field>
        <mt-popup
          class="popup-field"
          v-model="formVisible"
          position="bottom">
          <mt-field v-for="(item,index) in formArr" :key="index" :placeholder="item.name" type="text" readonly class="item-pop" @click.native="checkF(item)"></mt-field>
        </mt-popup>
        <mt-field label="关联巡检表" placeholder="请选择" :value="formCheck.name" readonly @click.native="checkForm"></mt-field>
        <mt-actionsheet
          :actions="rateAction"
          v-model="rateVisible">
        </mt-actionsheet>
        <mt-field label="周期频率" placeholder="请选择" :value="rateTxt"  readonly @click.native="checkRate"></mt-field>
        <!-- 按年 -->
        <mt-popup
          class="popup-field"
          v-model="cycle1Visible"
          position="bottom">
          <div class="yearPicker">
            <div class="item">
              <mt-radio
                title="选择月"
                v-model="cycle1Txt1"
                :options="['01', '02', '03', '04', '05', '06', '07', '09', '10', '11', '12']">
              </mt-radio>
            </div>
            <div class="item">
              <mt-radio
                title="选择日"
                v-model="cycle1Txt2"
                :options="dayArr">
              </mt-radio>
            </div>
          </div>
          <mt-button  type="primary" size="large" @click.native="sure(1)">确定</mt-button>
        </mt-popup>
        <mt-field v-show="rateTxt==='按年'" label="周期" placeholder="请选择" :value="CheckCycle1 | toString"  readonly @click.native="cycle(1)"></mt-field>
        <!-- 按月 -->
        <mt-popup
          class="popup-field"
          v-model="cycle2Visible"
          position="bottom">
          <div class="yearPicker">
            <div class="item">
              <mt-checklist
                title="选择日"
                v-model="cycle2Txt"
                :options="dayArr">
              </mt-checklist>
            </div>
          </div>
          <mt-button type="primary" size="large" @click.native="sure(2)">确定</mt-button>
        </mt-popup>
        <mt-field v-show="rateTxt==='按月'" label="周期" placeholder="请选择" :value="CheckCycle2 | toString"  readonly @click.native="cycle(2)"></mt-field>
        <!-- 按周 -->
        <mt-popup
          class="popup-field"
          v-model="cycle3Visible"
          position="bottom">
          <div class="yearPicker">
            <div class="item">
              <mt-checklist
                title="选择星期"
                v-model="cycle3Txt"
                :options="['星期一','星期二','星期三','星期四','星期五','星期六','星期日']">
              </mt-checklist>
            </div>
          </div>
          <mt-button type="primary" size="large" @click.native="sure(3)">确定</mt-button>
        </mt-popup>
        <mt-field v-show="rateTxt==='按周'" label="周期" placeholder="请选择" :value="CheckCycle3 | toString"  readonly @click.native="cycle(3)"></mt-field>
        <mt-field v-show="rateTxt==='自定义'" label="周期" placeholder="请输入周期天数" type="number" v-model="CheckCycle4"></mt-field>
        <mt-datetime-picker
          ref="datePicker1"
          type="date"
          @confirm="datePicker1"
          v-model="picker1Value">
        </mt-datetime-picker>
        <mt-field label="开始时间" placeholder="请选择" :value="start_time" type="text" @click.native="date(1)" readonly></mt-field>
        <mt-datetime-picker
          ref="datePicker2"
          type="date"
          @confirm="datePicker2"
          v-model="picker2Value">
        </mt-datetime-picker>
        <mt-field label="结束时间" placeholder="请选择" :value="finish_time" type="text" @click.native="date(2)" readonly></mt-field>
        <mt-field label="描述" placeholder="请输入描述" type="textarea" rows="4"  v-model="describe"></mt-field>
        <!-- 关联设备 -->
        <mt-popup
          class="popup-field"
          v-model="equipVisible"
          position="bottom">
          <div class="yearPicker">
            <div class="item">
              <mt-checklist
                title="选择设备"
                v-model="equipTxt"
                :options="equipArr">
              </mt-checklist>
            </div>
          </div>
          <mt-button type="primary" size="large" @click.native="sure(4)">确定</mt-button>
        </mt-popup>
        <mt-field label="选择设备" :placeholder="equipTextArr.length===0?'请选择':''" readonly @click.native="equip">
          <ul class="equipList">
            <li v-for="(item,index) in equipTextArr" :key="index">{{item}}</li>
          </ul>
        </mt-field>
        <mt-popup
          class="popup-field"
          v-model="personVisible"
          position="bottom">
          <div class="yearPicker">
            <div class="item">
              <mt-checklist
                title="选择工程师"
                v-model="personModel"
                :options="personArr">
              </mt-checklist>
            </div>
          </div>
          <mt-button type="primary" size="large" @click.native="sure(5)">确定</mt-button>
        </mt-popup>
        <mt-popup
          class="popup-field"
          v-model="clsVisible"
          position="bottom">
          <mt-field v-for="(item,index) in clsArr" :key="index" :placeholder="item.name" type="text" readonly class="item-pop" @click.native="checkCls(item)"></mt-field>
        </mt-popup>
        <mt-radio
          title="关联巡检人员"
          v-model="person"
          @change.native="checkPerson"
          :options="['选择工程师', '关联班次']">
        </mt-radio>
        <div v-show="personTextArr.length>0" class="person-box">
          <span>已选工程师：{{personTextArr.join("、")}}</span>
        </div>
        <div v-show="cls && cls.name" class="person-box">
          <span>已选班次：{{cls.name}}</span>
        </div>
        <div class="btn-group">
          <mt-button type="primary" size="large" @click.native="submit">提交</mt-button>
        </div>
    </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
        //巡检任务的名称
        name:"",
        //关联巡检表的选项
        formArr:[],
        //选中的巡检表
        formCheck:{},
        formVisible:false,
        rateVisible:false,
        rateAction:[{name:"按年",method:this.checkR},{name:"按月",method:this.checkR},{name:"按周",method:this.checkR},{name:"自定义",method:this.checkR}],
        rateTxt:'',
        pickerVisible:true,
        dataVal:new Date(),
        cycle1Visible:false,
        cycle2Visible:false,
        cycle3Visible:false,
        equipVisible:false,
        cycle1Txt1:"",
        cycle1Txt2:"",
        dayArr:[],
        CheckCycle1:[],
        cycle2Txt:[],
        CheckCycle2:[],
        cycle3Txt:[],
        CheckCycle3:[],
        CheckCycle4:'',
        picker1Value:new Date(),
        start_time:"",
        picker2Value:new Date(),
        finish_time:"",
        describe:'',
        equipArr:[],
        equipTxt:[],
        equipTextArr:[],
        person:"",
        personVisible:false,
        personModel:[],
        personArr:[],
        personTextArr:[],
        clsVisible:false,
        clsArr:[],
        cls:{},
        rate:'',
    }
  },
  methods:{
    dateFormat(d){
        return d.getFullYear()+"/"+(d.getMonth()+1<10?('0'+(d.getMonth()+1)):(d.getMonth()+1))+"/"+(d.getDate()<10?('0'+d.getDate()):d.getDate());
    },
    back(){
      this.$router.go(-1)
    },
    checkForm(){
        this.formVisible=true;
    },
    checkF(i){
      this.formCheck=i
      this.formVisible=false
    },
    getForm(){
        this.$axios.post("html/PollingManage/pollingFormList").then(res=>{
          this.formArr=res.data.data
        })
    },
    checkRate(){
      this.rateVisible=true;
    },
    checkR(a,b){
      this.rate=b+1;
      this.rateTxt=a.name;
    },
    cycle(idx){
      if(idx===1){
        this.cycle1Visible=true;
      }else if(idx===2){
        this.cycle2Visible=true;
      }else if(idx===3){
        this.cycle3Visible=true;
      }
    },
    sure(idx){
      if(idx===1){
        if(this.cycle1Txt1==""){
          this.$toast({
            message:"请选择月份"
          })
          return ;
        }
        if(this.cycle1Txt2==""){
          this.$toast({
            message:"请选择天"
          })
          return ;
        }
        this.cycle1Visible=false;
        let str=this.cycle1Txt1+"-"+this.cycle1Txt2;
        if(this.CheckCycle1.indexOf(str)==-1){
          this.CheckCycle1.push(str)
        }
        this.cycle1Txt1="";
        this.cycle1Txt2="";
      }else if(idx===2){
        this.CheckCycle2=this.cycle2Txt;
        this.cycle2Txt=[];
        this.cycle2Visible=false;
      }else if(idx===3){
        this.CheckCycle3=this.cycle3Txt;
        this.cycle3Txt=[];
        this.cycle3Visible=false;
      }else if(idx===4){
        //关联设备
        let equipTextArr=[];
        this.equipArr.forEach((i,j)=>{
          this.equipTxt.forEach((k,m)=>{
            if(i.value===k){
              equipTextArr.push(i.label)
            }
          })
        });
        this.equipTextArr=equipTextArr;
        this.equipVisible=false;
      }else if(idx===5){
        //选择工程师
        let personTextArr=[];
        this.personArr.forEach((i,j)=>{
          this.personModel.forEach((k,m)=>{
            if(i.value===k){
              personTextArr.push(i.label)
            }
          })
        });
        this.personTextArr=personTextArr;
        this.personVisible=false;
        this.cls={};
      }
    },
    date(idx){
      if(idx===1){
        this.$refs.datePicker1.open();
      }else{
         this.$refs.datePicker2.open();
      }
    },
    datePicker1(){
      this.start_time=this.dateFormat(this.picker1Value);
    },
    datePicker2(){
      this.finish_time=this.dateFormat(this.picker2Value);
    },
    equip(){
      this.equipVisible=true;
    },
    getEquip(){
      this.$axios.post("html/PollingManage/searchDevice").then(res=>{
        let arr=[];
        res.data.data.forEach((i,j)=>{
          let obj={
            label: i.organ_name+"-"+i.device_class_name+"-"+i.device_name,
            value: i.id,
            disabled: false
          };
          arr.push(obj)
        })
        this.equipArr=arr;
      })
    },
    checkPerson(){
      let _this=this;
      this.$nextTick(function(){
        if(_this.person==="选择工程师"){
          _this.personVisible=true;
          _this.cls={};
        }else if(_this.person==="关联班次"){
          _this.clsVisible=true;
          _this.personModel=[];
          _this.personTextArr=[];
        }
      })
    },
    getPerson(){
      this.$axios.post("html/pollingManage/searchUser").then(res=>{
        let arr=[];
        res.data.data.forEach((i,j)=>{
          let obj={
            label: i.name,
            value: i.id,
            disabled: false
          };
          arr.push(obj)
        })
        this.personArr=arr;
      })
    },
    getClas(){
      this.$axios.post("html/PollingManage/useArrangeData").then(res=>{
        this.clsArr=res.data.data;
      })
    },
    checkCls(i){
      //选中班次
      this.cls=i;
      this.clsVisible=false;
      this.personModel=[];
      this.personTextArr=[];
    },
    submit(){
      let cycle,type,userArr,arrange_id;
      switch (this.rate) {
        case 1:
          //按年
          cycle=this.CheckCycle1.join(",")
          break;
        case 2:
          //按月
          cycle=this.CheckCycle2.join(",")
          break;
        case 3:
          //按周
          let arr=[];
          this.CheckCycle3.forEach((i)=>{
            switch (i) {
              case "星期一":
                arr.push(1)
                break;
              case "星期二":
                arr.push(2)
                break;
              case "星期三":
                arr.push(3)
                break;
              case "星期四":
                arr.push(4)
                break;
              case "星期五":
                arr.push(5)
                break;
              case "星期六":
                arr.push(6)
                break;
              case "星期日":
                arr.push(0)
                break;
              default:
                break;
            }
          })
          cycle=arr.join(",")
          break;
        case 4:
          //按日
          cycle=this.CheckCycle4
          break;
        default:
          break;
      }
      if(this.person==="选择工程师"){
        type=1;
      }else if(this.person==="关联排班"){
        type=2;
      }
      if(type===1){
        userArr=this.personModel;
      }
      if(type===2){
        arrange_id=this.cls.id
      }
      let data={
        uid:JSON.parse(localStorage.getItem("userInfo")).uid,
        title:this.name,
        formIdArray:this.formCheck.id,
        describe:this.describe,
        rate:this.rate,
        cycle:cycle,
        start_time:this.start_time,
        finish_time:this.finish_time,
        deviceArr:this.equipTxt.join(","),
        type:type,
        userArr:userArr.join(","),
        arrange_id:arrange_id
      }
      this.$axios.post("html/PollingManage/releasePolling",data).then(res=>{
        if(res.data.Code==="1"){
          this.$toast({
            message:"提交成功",
            duration:1000
          })
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000);
        }else{
          this.$toast({
            message:res.data.msg,
            duration:1000
          })
        }
      })
    }
  },
  created() {
      let dayArr=[];
      for(var i=1;i<31;i++){
        if(i<10){
          i="0"+i;
        }
        dayArr.push(String(i))
      }
      this.dayArr=dayArr;
      this.getForm();
      this.getEquip();
      this.getPerson();
      this.getClas();
  },
  filters:{
    toString(val){
      return val.join(",")
    }
  },
}
</script>

<style scoped>
.box{
    margin-top:50px;
    margin-bottom:90px;
}
.item-pop{
  width:100%;
}
.popup-field{
  height:300px;
  overflow:hidden;
}
.popup-field .item{
  max-height:259px;
  overflow:auto;
}
.yearPicker{
  display:flex;
}
.yearPicker .item{
  flex:1;
}
.equipList{
  text-align:right;
}
.person-box{
  padding:10px 15px;
  text-align:left;
  line-height:20px;
}
</style>
