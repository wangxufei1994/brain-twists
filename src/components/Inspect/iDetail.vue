<template>
  <div class="page">
    <mt-header fixed :title="data.title">
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div class="box" v-if="data.question && data.question.length>0 && answerData.length>0">
        <div v-for="(item,index) in data.question" :key="item.id">
            <!-- 单选 -->
            <mt-radio
            v-if="item.type===1"
            :title="(index+1)+'、'+item.title+(item.need===2?'(选填)':'')"
            :value="answerData[index]"
            v-model="answerData[index]"
            @change.native="change(item.id,item.type,index)"
            :options="item.contents">
            </mt-radio>
            <!-- 多选 -->
            <mt-checklist
            v-if="item.type===2"
            :title="(index+1)+'、'+item.title+(item.need===2?'(选填)':'')"
            :value="answerData[index]"
            v-model="answerData[index]"
            @change.native="change(item.id,item.type,index)"
            :options="item.contents">
            </mt-checklist>
            <!-- 异常录入题 -->
            <div v-if="item.type===3">
                <mt-radio
                :title="(index+1)+'、'+item.title+(item.need===2?'(选填)':'')"
                :value="answerData[index]!='正常'?answerData[index]:'正常'"
                @change.native="change(item.id,item.type,index)"
                v-model="answerData[index]"
                :options="['正常', '异常']">
                </mt-radio>
                <mt-field v-show="item.showInput" @input.native="change(item.id,item.type,index)" v-model="item.inputTxt" placeholder="请输入异常内容" type="textarea" rows="2"></mt-field>
            </div>
            <!-- 简答题 -->
            <div v-if="item.type===4">
                <label class="mint-radiolist-title">{{index+1}}、{{item.title}}{{item.need===2?'(选填)':''}}</label>
                <mt-field  placeholder="在这里输入内容" v-model="answerData[index]" @input.native="change(item.id,item.type,index)"  :value="answerData[index]"  type="textarea" rows="4"></mt-field>
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
                                    <textarea :readonly="td.isnull==2?false:'readonly'" v-model="td.name" @input="changeT(td.id,td.name)">{{td.name}}</textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="btn-group" v-if="data.isMy===1&&sta===0">
            <mt-button type="primary" size="large" @click.native="submit">提交</mt-button>
        </div>
    </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
     data:{},
     sta:'',
     answerData:[],
     resultArr:[],
     table_array:[]
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
            let result=res.data.data;
            result.question.forEach((i)=>{
                if(i.type===3){
                    i.showInput=false;
                    i.inputTxt='';
                }
            })
            this.data=result;
            this.getAnswer();
        })
    },
    input(event){
      let $text=event.target;
      $text.style.height=$text.scrollHeight+"px";
    },
    change(id,type,index){
        this.$nextTick(function(){
            switch (parseInt(type)) {
                case 1:
                    //单选题
                    this.resultArr.forEach((i)=>{
                        if(i.id==id){
                            i.content=this.answerData[index];
                        }
                    })
                    break;
                case 2:
                    //多选题
                    this.resultArr.forEach((i)=>{
                        if(i.id==id){
                            i.content=this.answerData[index].join("|");
                        }
                    })
                    break;
                case 3:
                    //异常录入题
                    let answer="正常"
                    if(this.answerData[index]==="正常"){
                        this.data.question[index].showInput=false;
                    }else{
                        this.data.question[index].showInput=true;
                    }
                    if(this.data.question[index].showInput){
                        answer=this.data.question[index].inputTxt;
                    }
                    this.resultArr.forEach((i)=>{
                        if(i.id==id){
                            i.content=answer;
                        }
                    })
                    break;
                case 4:
                    //简答题inputTxt
                    this.resultArr.forEach((i)=>{
                        if(i.id==id){
                            i.content=this.answerData[index];
                        }
                    })
                    break;
                default:
                    break;
            }
        })
    },
    changeT(id,name){
        this.table_array.forEach((i)=>{
            if(i.id===id){
                i.name=name;
            }
        })
    },
    getAnswer(){
        if(this.sta===1){
            //已完成
            let data={};
            data.nid=this.$route.query.id;
            this.$axios.post('html/PollingManage/getPollingFinishInfo',data).then(res=>{
                let data=res.data.detail.question;
                let answerData=[];
                data.forEach((i,j)=>{
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
                            answerData.push(i.answer[0].answer==="正常"?"正常":"异常")
                            this.data.question[j].showInput=true;
                            this.data.question[j].inputTxt=i.answer[0].answer;
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
                this.answerData=answerData;
            })
        }else{
            //未完成
            let data=[];
            let resultArr=[];
            let table_array=[];
            this.data.question.forEach((i)=>{
                let obj={};
                switch (i.type) {
                    case 1:
                        //单选题
                        data.push('');
                        break;
                    case 2:
                        //多选题
                        data.push([[]])
                        break;
                    case 3:
                        //异常题
                        data.push('正常')
                        break;
                    case 4:
                        //简答题
                        data.push('')
                        break;
                    case 5:
                        //表格题
                        data.push([])
                        i.tableList.forEach((j)=>{
                            j.forEach((v)=>{
                                let o={};
                                o.name=v.name;
                                o.id=v.id;
                                table_array.push(o)
                            })
                        })
                        break;
                    default:
                        break;
                }
                obj.id=i.id;
                obj.fid=i.fid;
                obj.content="";
                if(i.type!==5){
                    //不是表格题
                    resultArr.push(obj)
                }
            })
            this.answerData=data;
            this.resultArr=resultArr;
            this.table_array=table_array;
        }
    },
    submit(){
        //提交
        let data={};
        data.nid=this.$route.query.id;
        data.uid=JSON.parse(localStorage.getItem("userInfo")).uid;
        data.resultArr=JSON.stringify(this.resultArr);
        data.table_array=JSON.stringify(this.table_array);
        this.$axios.post("html/PollingManage/submitPollingNotFinishInfo",data).then(res=>{
            if(res.data.Code==="1"){
                this.$toast({
                    message:"提交成功",
                    duration:1000
                })
                setTimeout(() => {
                    this.$router.go(-1);
                }, 1000);
            }else{
                this.$toast(res.data.msg)
            }
        })
    }
  },
  created() {
    this.sta=parseInt(this.$route.query.sta);
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
