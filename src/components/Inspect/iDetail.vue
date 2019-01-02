<template>
  <div class="page">
    <mt-header fixed :title="data.title">
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div class="box" v-if="data.question && data.question.length>0">
        <div v-for="(item,index) in data.question" :key="item.id">
            <!-- 单选 -->
            <mt-radio
            v-if="item.type===1"
            :title="(index+1)+'、'+item.title+(item.need===2?'(选填)':'')"
            :value="answerData[index]"
            @change.native="change(item.type)"
            :options="item.contents">
            </mt-radio>
            <!-- 多选 -->
            <mt-checklist
            v-if="item.type===2"
            :title="(index+1)+'、'+item.title+(item.need===2?'(选填)':'')"
            :value="answerData[index]"
            :options="item.contents">
            </mt-checklist>
            <!-- 异常录入题 -->
            <div v-if="item.type===3">
                <mt-radio
                :title="(index+1)+'、'+item.title+(item.need===2?'(选填)':'')"
                :value="answerData[index]!='正常'?answerData[index]:'正常'"
                :options="['正常', '异常']">
                </mt-radio>
                <mt-field v-show="item.showInput" placeholder="请输入异常内容" type="textarea" rows="2"></mt-field>
            </div>
            <!-- 简答题 -->
            <div v-if="item.type===4">
                <label class="mint-radiolist-title">{{index+1}}、{{item.title}}{{item.need===2?'(选填)':''}}</label>
                <mt-field  placeholder="在这里输入内容" :value="answerData[index]"  type="textarea" rows="4"></mt-field>
            </div>
            <!-- 表格题 -->
            <div v-if="item.type===5">
                <label class="mint-radiolist-title">{{index+1}}、{{item.title}}{{item.need===2?'(选填)':''}}</label>
                <div class="tab-container">
                    <table border="1">
                        <thead>
                            <tr>
                                <th v-for="(th,index) in item.tableList[0]" :key="index" >{{th.name}}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="index>0" v-for="(tr,index) in item.tableList" :key="index">
                                <td v-for="(td,i) in tr" :key="i">
                                    <textarea :readonly="td.isnull==2?false:'readonly'">{{td.name}}</textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="btn-group" v-if="data.isMy===1">
            <mt-button type="primary" size="large">提交</mt-button>
        </div>
    </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
     data:{},
     sta:''
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    getDetail(){
        let data={};
        data.nid=this.$route.query.id;
        data.uid=JSON.parse(localStorage.getItem("userInfo")).uid;
        this.$axios.post('html/PollingManage/getPollingNotFinishInfo',data).then(res=>{
            this.data=res.data.data;
        })
    },
    input(event){
      let $text=event.target;
      $text.style.height=$text.scrollHeight+"px";
    },
    change(type){
        console.log(type);
    },
    getAnswer(){
        let data={};
        data.nid=this.$route.query.id;
        this.$axios.post('html/PollingManage/getPollingFinishInfo',data).then(res=>{
            let data=res.data.detail.question;
            let answerData=[];
            data.forEach((i)=>{
                switch (parseInt(i.type)) {
                    case 1:
                        //单选题
                        answerData.push(i.answer[0].answer)
                        break;
                    case 2:
                        //多选题
                        let arr=[];
                        i.answer.forEach((k)=>{
                            arr.push(k.answer)
                        })
                        answerData.push(arr)
                        break;
                    case 3:
                        //异常体
                        answerData.push(i.answer[0].answer)
                        break;
                    case 4:
                        //简答题
                        answerData.push(i.answer[0].answer)
                        break;
                    case 5:
                        //表格题
                        answerData.push([])
                        break;
                    default:
                        break;
                }
            })
            console.log(answerData)
            this.answerData=answerData;
        })
    }
  },
  created() {
    this.sta=this.$route.query.sta;
    if(this.sta==1){
        this.getAnswer();
    }
    this.getDetail();
  }
}
</script>

<style scoped>
    .box{
        padding-top: 20px;
    }
    .tab-container{
        width:100%;
        overflow-x:auto;
    }
    table{
        min-width:100%;
        text-align:center;
    }
    table th,table td{
        padding:6px 8px;
    }
    .btn-group{
        padding-bottom: 20px;
    }
</style>
