<template>
  <div class="addDiary">
      <mt-header fixed :title="title">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <div class="text-box">
        <label class="mint-radiolist-title">日期：{{date}}</label>
        <mt-field  placeholder="在这里输入内容"  type="textarea" rows="4" v-model="content" @input.native="input"></mt-field>
        <label class="mint-radiolist-title">备注</label>
        <mt-field  placeholder="在这里输入备注"  type="textarea" rows="2" v-model="remark" @input.native="input" ref="text2"></mt-field>
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
      content:"",
      remark:"",
      title:"写日记",
      date:""
    }
  },
  created() {
      let date=this.$route.query.date || new Date().toLocaleDateString();
      this.date=date;
      let data={
        id:JSON.parse(localStorage.getItem("userInfo")).id,
        date:date
      };
      this.$axios.post("/getCurrentDiary",data).then(res=>{
        if(res.data.code===1){
          this.content=res.data.data.content
          this.remark=res.data.data.remark
          this.$nextTick(()=>{
            let $text=document.getElementsByTagName("textarea");
            $text[0].style.height=$text[0].scrollHeight+"px";
            $text[1].style.height=$text[1].scrollHeight+"px";
          })
        }
      })
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    input(event){
      let $text=event.target;
      $text.style.height=$text.scrollHeight+"px";
    },
    submit(){
      if(this.content===""){
        this.$toast("日记内容不能为空");
        return;
      }
      var data={
        content:this.content,
        remark:this.remark,
        date:this.$route.query.date || new Date().toLocaleDateString(),
        id:JSON.parse(localStorage.getItem("userInfo")).id
      }
      this.$axios.post("/diaryAdd",data).then(res=>{
        if(res.data.code===1){
          this.$toast("提交成功")
        }
      })
    }
  }
}
</script>

<style scoped>
.text-box{
  margin-top:60px;
}
</style>
