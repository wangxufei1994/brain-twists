<template>
  <div>
      <mt-header fixed title="谜语">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <div class="question">
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
          <mt-button type="danger" size="large" @click="back" v-if="overFlag">结束</mt-button>
      </div>
  </div>
</template>

<script type="text/script">
  export default {
   data() {
     return {
         currentIndex:0,
         list:[{question:'',tip:'',answer:''}],
         answerFlag:false,
         overFlag:false
     }
   },
   created() {
       this.$axios.post('/getRiddle').then(res=>{
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
    back(){
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
    margin-top: 60px 0 80px;
}
.answer{
    margin-top: 40px;
    padding: 0 15px;
    color: #00aff0;
}
.answer-text{
    font-size: 18px;
}
.tip{
    margin-top: 40px;
    line-height:24px;
}
</style>