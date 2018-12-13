<template>
  <div class="diary">
      <mt-header fixed title="日记本">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>

      <mt-palette-button content="+" direction="rb" :radius="30"  mainButtonStyle="color:#fff;background-color:#26a2ff;" @click.native="addDiary">
        <div class="my-icon-button"></div>
        <div class="my-icon-button"></div>
        <div class="my-icon-button"></div>
      </mt-palette-button>

      <!-- 列表 -->
      <div v-show="list.length==0" class="null-data">没有数据</div>
      <div v-show="list.length>0" class="diary-list">
        <mt-cell v-for="(item,index) in list" :key="index" :to="{name:'home.category.diaryAdd',query:{date:item.date}}" :title="item.date" :label="item.content" is-link></mt-cell>
      </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      list:[]
    }
  },
  created() {
    let data={
      id:JSON.parse(localStorage.getItem("userInfo")).id
    }
    this.$axios.post("/getDiaryList",data).then(res=>{
      this.list=res.data.data;
    })
  },
  methods:{
    addDiary(){
      this.$router.push({
        name:"home.category.diaryAdd"
      })
    },
    back(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.mint-palette-button{
  position:fixed;
  bottom:80px;
  right:30px;
}
.null-data{
  line-height: 80px;
  text-align: center;
  color:#AEAEAE;
  margin-top: 80px;
}
.diary-list{
  margin-top: 50px;
}
</style>
