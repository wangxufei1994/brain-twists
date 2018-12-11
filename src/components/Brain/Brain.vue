<template>
  <div class="brain">
      <mt-header fixed title="头脑王者">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <div class="question" v-show="!seeScoreFlag">
          {{currentIndex+1}}、{{list[currentIndex].question}}
      </div>
      <ul class="answer" v-show="!seeScoreFlag">
        <li v-for="(item,index) in list[currentIndex].answer" :key="index" @click="answer(index)" :class="{isTrue:item.flag&&item.check,isFalse:(!item.flag)&&item.check}">
            {{index | numFormat}}、{{item.name}}
        </li>
      </ul>
      <p v-show="hasAnswer&&!seeScoreFlag" class="tip">
        <span class="isFalse">回答错误 </span>，正确答案是: {{trueAnswerText}}
      </p>
      <div class="btn-group" v-show="!seeScoreFlag">
          <mt-button type="primary" size="large" @click="seeNext" v-show="hasAnswer&&!scoreFlag">下一题</mt-button>
          <mt-button type="primary" size="large" v-show="scoreFlag" @click="seeScore">查看得分</mt-button>
      </div>
      <div class="score" v-show="seeScoreFlag">
        <h3>
          {{score}}分
        </h3>
        <p>
          一共{{list.length}}道题，答对了{{score}}道。
        </p>
        <div class="btn-group">
          <mt-button type="danger" size="large" @click="back">结束</mt-button>
        </div>
      </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      list:[{question:"",answer:[{name:"",flag:false,check:false}]}],
      currentIndex:0,
      hasAnswer:false,
      trueAnswerText:"",
      score:0,
      scoreFlag:false,
      seeScoreFlag:false
    }
  },
  created(){
    this.$axios.post('/getBrainList').then(res=>{
      res.data.data.forEach(function(i){
        i.answer.forEach(function(j){
          j.check=false;
        })
      })
      this.list=res.data.data;
    })
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    answer(index){
      if(!this.hasAnswer){
        let flag=this.list[this.currentIndex].answer[index].flag;
        this.list[this.currentIndex].answer[index].check=true;
        //题目打完显示
        if(this.currentIndex===this.list.length-1){
            this.scoreFlag=true;
        }
        if(flag){
          //回答正确
          this.$toast({
            message:"回答正确!",
            duration:1000
          })
          this.score+=1;
          //判断是不是最后一题
          if(this.currentIndex!==this.list.length-1){
            setTimeout(() => {
                this.currentIndex+=1;
            }, 1000);
          }
        }else{
          this.hasAnswer=true;
          // 回答错误的时候将答案为真的选项标出来
          this.list[this.currentIndex].answer.forEach((i,j)=>{
            if(i.flag){
              i.check=true;
              this.trueAnswerText=i.name;
            }
          })
        }
      }
    },
    seeNext(){
      this.currentIndex+=1;
      this.hasAnswer=!this.hasAnswer;
    },
    seeScore(){
      this.seeScoreFlag=true;
    }
  },
  filters:{
    numFormat(value){
      switch (value) {
        case 0:
          return "A"
          break;
        case 1:
          return "B"
          break;
        case 2:
          return "C"
          break;
        case 3:
          return "D"
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style scoped>
.question{
  margin-top: 100px;
  padding: 0 15px;
  font-size: 18px;
  line-height: 28px;
}
.answer{
  padding:15px;
  font-size: 18px;
  line-height: 28px;
  margin:20px 0 0 20px;
}
.isTrue{
  color:#00aff0;
}
.isFalse{
  color:#F00000;
}
.tip{
    margin-top: 20px;
    line-height:24px;
    padding:0 30px;
    color:#00aff0;
}
.score{
  margin:100px auto;
  text-align: center;
}
.score h3{
  font-weight: bold;
  font-size: 24px;
  line-height:80px;
}
</style>
