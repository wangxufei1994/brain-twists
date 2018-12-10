<template>
  <div class="joke">
      <mt-header fixed title="笑话">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <div class="question">
          <span>{{currentIndex+1}}、</span><span v-html="list[currentIndex].question"></span>
      </div>
      <div class="btn-group">
          <mt-button type="primary" size="large" @click="seeNext" v-show="currentIndex!==list.length-1">下一个</mt-button>
          <mt-button type="danger" size="large" @click="back" v-show="currentIndex===list.length-1">结束</mt-button>
      </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      currentIndex:0,
      list:[{question:''}]
    }
  },
  created() {
    this.$axios.post("/getJoke").then(res=>{
      this.list=res.data.data;
    })
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    seeNext(){
      this.currentIndex+=1;
    }
  }
}
</script>

<style scoped>
.question{
    margin-top: 80px;
    padding: 0 15px;
    font-size: 14px;
    line-height:26px;
}
</style>
