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
      <div v-show="list.length>0" class="diary-list"  ref="diaryList"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="moreLoading"
        infinite-scroll-immediate-check="false"
        infinite-scroll-distance="0">
        <mt-cell v-for="(item,index) in list" :key="index" :to="{name:'home.category.diaryAdd',query:{date:item.date}}" :title="item.date" :label="item.content" is-link></mt-cell>
        <!--底部判断是加载图标还是提示“全部加载”-->
        <div class="more_loading" v-show="!queryLoading">
          <mt-spinner class="icon-loading" type="snake" color="#00ccff" :size="20" v-show="moreLoading&&!allLoaded"></mt-spinner>
          <span v-show="allLoaded">已全部加载</span>
        </div>
      </div>
      
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      list:[],
      //分页页数
      num:1,
      //分页大小
      size:10,
      total:0,
      queryLoading:false,
      allLoaded:false,
      moreLoading:false
    }
  },
  created() {
    this.getDiary();
  },
  mounted() {
    this.$refs.diaryList.style.maxHeight=document.body.clientHeight-105+"px";
  },
  methods:{
    addDiary(){
      this.$router.push({
        name:"home.category.diaryAdd"
      })
    },
    back(){
      this.$router.go(-1);
    },
    getDiary(){
      let data={
        id:JSON.parse(localStorage.getItem("userInfo")).id,
        num:this.num,
        size:this.size
      }
      this.$axios.post("/getDiaryList",data).then(res=>{
        if(this.num==1){
          this.list=res.data.data.list;
        }else{
          this.list.concat(res.data.data.list);
        }
        this.total=res.data.data.total;
        if(this.total<=this.num*this.size){
          this.allLoaded=true
        }
        this.moreLoading=this.allLoaded;
      })
    },
    loadMore(){
      if(this.allLoaded){
        this.moreLoading = true;
        return;
      }
      if(this.queryLoading){
        return;
      }
      this.moreLoading = !this.queryLoading;
      this.num++;
      this.getDiary();
    }
  }
}
</script>

<style scoped>
.mint-palette-button{
  position:fixed;
  bottom:80px;
  right:30px;
  z-index: 10;
}
.null-data{
  line-height: 80px;
  text-align: center;
  color:#AEAEAE;
  margin-top: 80px;
}
.diary-list{
  margin-top: 50px;
  overflow-y:auto;
}
.no-more{
  font-size: 13px;
  line-height:30px;
  text-align:center;
  color:#AEAEAE;
}
.more_loading{
  text-align: center;
  font-size: 13px;
  color: #AEAEAE;
  line-height: 40px;
}
.icon-loading{
  display: flex;
  justify-content: center;
}
</style>
