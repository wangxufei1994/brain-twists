<template>
  <div class="access">
        <mt-header fixed title="设备列表">
            <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
        </mt-header>
        <mt-field placeholder="根据姓名搜索" v-model="username" @input.native="search" class="input-search"></mt-field>
        <div class="filter upDownLine">
            <mt-button type="default" @click.native="start">{{time1?time1:'开始时间'}}</mt-button><mt-button type="default" @click.native="stop">{{time2?time2:'结束时间'}}</mt-button><mt-button type="primary" @click.native="query">查询</mt-button>
            <mt-datetime-picker
                type="date"
                ref="picker1"
                @confirm="confirm1"
                v-model="start_time">
            </mt-datetime-picker>
            <mt-datetime-picker
                type="date"
                ref="picker2"
                @confirm="confirm2"
                v-model="finish_time">
            </mt-datetime-picker>
        </div>
        <div class="diary-list" ref="diaryList"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="moreLoading"
            infinite-scroll-immediate-check="false"
            infinite-scroll-distance="10">
            <mt-cell  v-for="item in data.list" :key="item.id" :title="item.time+'   '+item.content" is-link></mt-cell>
            <div v-show="(!data.list) || data.list.length===0" class="null-data">没有数据</div>
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
        username:'',
        result:[],
        start_time:new Date(),
        time1:'',
        finish_time:new Date(),
        time2:'',
        //分页页数
        num:1,
        //分页大小
        size:15,
        total:0,
        queryLoading:false,
        allLoaded:false,
        moreLoading:false,
        data:{}
    }
  },
  methods: {
    dateFormat(d){
        return d.getFullYear()+"/"+(d.getMonth()+1<10?('0'+(d.getMonth()+1)):(d.getMonth()+1))+"/"+(d.getDate()<10?('0'+d.getDate()):d.getDate());
    },
    back(){
      this.$router.go(-1)
    },
    start(){
        this.$refs.picker1.open();
    },
    stop(){
        this.$refs.picker2.open();
    },
    confirm1(){
        this.time1=this.dateFormat(this.start_time);
        this.num=1;
    },
    confirm2(){
        this.time2=this.dateFormat(this.finish_time);
        this.num=1;
    },
    getList(){
        let data={};
        data.uid=JSON.parse(localStorage.getItem("userInfo")).uid;
        data.pageNum=this.num;
        data.pageSize=this.size;
        data.keyword=this.username;
        data.begin_time=this.time1;
        data.end_time=this.time2;
        data.menu_ids=JSON.parse(localStorage.getItem("userInfo")).menu_ids;
        this.$axios.post("html/monitor/personPassLog",data).then(res=>{
            if(res.data.Code==="0"){
                this.data={};
            }else{
                if(this.num==1){
                    this.data=res.data.data;
                }else{
                    this.data.list=this.data.list.concat(res.data.data.list);
                }
                this.total=res.data.data.total;
                if(this.total<=this.num*this.size){
                    this.allLoaded=true
                }
                this.moreLoading=this.allLoaded;
            }
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
      this.getList();
    },
    search(){
        let _this=this;
        this.num=1;
        this.$nextTick(function(){
            _this.getList();
        })
    },
    query(){
        if(this.time1===""){
            this.$toast("请选择开始时间")
        }else if(this.time2===""){
            this.$toast("请选择结束时间")
        }else if(this.start_time.getTime()>this.finish_time.getTime()){
            this.$toast("开始时间不能大于结束时间")
        }else{
            this.getList();
        }
    }
  },
  mounted(){
    let _this=this;
    this.$nextTick(function(){
      let height=window.screen.height-154+"px";
      _this.$refs.diaryList.style.maxHeight=height;
    })
  },
  created() {
      this.getList();
  },
}
</script>

<style scoped>
.mint-search{
    padding-top:40px;
}
.filter{
    display:flex;
    padding:10px 0;
}
.filter button{
    margin:0 10px;
    border-radius:0;
}
.filter button:nth-child(1),.filter button:nth-child(2){
    flex:2;
}
.filter button:nth-child(3){
    flex:1;
}
.input-search{
    margin-top:40px;
}
.null-data{
  line-height: 80px;
  text-align: center;
  color:#AEAEAE;
  margin-top: 80px;
}
.diary-list{
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
