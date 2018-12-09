<template>
  <div class="category-app" v-if="list.length>0">
      <mt-header fixed :title="typeText"></mt-header>
      <div class="question" v-show="!answerFlag">
          {{currentIndex+1}}、{{list[currentIndex].question}}
      </div>
      <div class="answer" v-show="answerFlag">
          <p class="answer-text">
            答案：{{list[currentIndex].answer}}
          </p>
          <p class="tip">
            小贴士：{{list[currentIndex].tip}}
          </p>
      </div>
      <div class="btn-group">
          <mt-button type="primary" size="large" @click="seeAnswer" v-show="!answerFlag && !overFlag">查看答案</mt-button>
          <mt-button type="primary" size="large" @click="seeNext" v-show="answerFlag && !overFlag">下一题</mt-button>
          <mt-button type="danger" size="large" @click="over" v-if="overFlag">结束</mt-button>
      </div>
  </div>
</template>

<script type="text/script">
  export default {
   data() {
     return {
         type:"",
         typeText:"",
         currentIndex:0,
         list:[],
         answerFlag:false,
         overFlag:false
     }
   },
   created() {
       //type ===1 脑筋急转弯   type==2 笑话   type==3 谜语 
       const _this=this;
       this.type=this.$route.params.type;
       switch (Number(this.type)) {
           case 1:
               _this.typeText="脑筋急转弯"
               break;
           case 2:
               _this.typeText="笑话"
               break;
           case 2:
               _this.typeText="谜语"
               break;
           default:
               break;
       }
       this.$axios.post('/getList',{type:this.type}).then(res=>{
           console.log("加载上数据")
           this.list=res.data.data;
       });
   },
   methods:{
    seeAnswer(){
        //查看答案
        this.answerFlag=!this.answerFlag;
        if(this.currentIndex===this.list.length-1){
            this.overFlag=true;
        }
    },
    seeNext(){
        //下一题
        this.currentIndex+=1;
        this.answerFlag=!this.answerFlag;
    },
    over(){
        this.$router.go(-1);
    }
   }
  }
</script>

<style scoped>
.question{
    margin-top: 120px;
    padding: 0 15px;
    font-size: 18px;
}
.btn-group{
    margin-top: 80px;
}
.answer{
    margin-top: 120px;
    padding: 0 15px;
    color: #00aff0;
}
.answer-text{
    font-size: 18px;
}
.tip{
    margin-top: 40px;
}
.btn-group{
    margin-bottom: 80px;
}
</style>