<template>
  <div class="page">
    <mt-header fixed title="巡检详情">
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div class="box1" v-if="data.baseData">
        <mt-field label="任务名称"  type="text" :value="data.baseData.name"></mt-field>
        <mt-field label="巡检表单"  type="text" :value="data.baseData.poll_form_name"></mt-field>
        <mt-field label="任务描述"  type="text" :value="data.baseData.describe"></mt-field>
        <mt-field label="周期频率"  type="text" :value="data.baseData.rate"></mt-field>
        <mt-field label="周期"  type="text" :value="data.baseData.cycle"></mt-field>
        <mt-field label="开始时间"  type="text" :value="data.baseData.start_time"></mt-field>
        <mt-field label="停止时间"  type="text" :value="data.baseData.finish_time"></mt-field>
        <mt-field label="巡检人员"  type="text" :value="data.baseData.dispose_user_name"></mt-field>
        <mt-field label="任务状态"  type="text" :value="data.baseData.status_name"></mt-field>
    </div>
    <div class="box2">
        <mt-cell title="已完成巡检任务" is-link :to="{name:'home.inspect.iList',query:{type:1,id:this.$route.params.id}}">
           <mt-badge size="small" type="primary">{{data.finishCount}}</mt-badge>
        </mt-cell>
        <mt-cell title="待完成巡检任务" is-link :to="{name:'home.inspect.iList',query:{type:0,id:this.$route.params.id}}">
            <mt-badge size="small" type="primary">{{data.notFinishCount}}</mt-badge>
        </mt-cell>
    </div>
    <div class="box2 btn-group" v-if="btnTxt!==''">
        <mt-button :class="{color1:status===1,color2:status===2}" size="large" type="primary" @click="sta">{{btnTxt}}</mt-button>
    </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
        data:{},
        btnTxt:"",
        status:''
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    getDetail(){
        let data={};
        data.uid=JSON.parse(localStorage.getItem("userInfo")).uid;
        data.id=this.$route.params.id;
        this.$axios.post('html/PollingManage/pollingDetail',data).then(res=>{
            this.data=res.data.data;
            switch (parseInt(this.data.baseData.status)) {
                case 1:
                    this.btnTxt="暂停"
                    this.status=2;
                    break;
                case 4:
                    this.btnTxt="启用"
                    this.status=1;
                    break;
                default:
                    break;
            }
        })
    },
    //暂停或启用
    sta(){
        let status=this.data.baseData.status;
        this.$messagebox.confirm("确定执行此操作？").then(action=>{
            let data={
                id:this.$route.params.id,
                //启动的时候穿1 暂停的时候传2
                status:this.status,
                uid:JSON.parse(localStorage.getItem("userInfo")).uid

            }
            this.$axios.post("html/PollingManage/changePollingStatus",data).then(res=>{
                this.$toast({
                    message:"操作成功",
                    duration:1000
                })
                if(this.status===1){
                    this.status=2;
                    this.btnTxt="暂停"
                }else{
                    this.status=1;
                    this.btnTxt="启用"
                }
            })
        }).catch(err=>{
            console.log(err)
        })
    }
  },
  created() {
      this.getDetail();
  },
}
</script>

<style scoped>
.box1{
    margin-top:60px;
}
.box2{
    margin-top:20px;
}
.btn-group{
    padding-bottom:20px;
}
.color1{
    background:#4cd964;
}
.color2{
    background:#f0ad4e;
}
</style>
