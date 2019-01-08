<template>
  <div class="page">
    <mt-header fixed title="机房出入审核列表">
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <!-- //列表 -->
    <div class="diary-list" ref="diaryList"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="moreLoading"
      infinite-scroll-immediate-check="false"
      infinite-scroll-distance="10">
      <ul class='ul-list'>
        <li v-if="data.list && data.list.length>0" v-for="item in data.list" :key="item.id" @click="detail(item.id,item.audit_status)">
            <div class="left">
              <h3>申请人：{{item.apply_name}}</h3>
              <p>进入时间：{{item.enter_time}}</p>
              <p>进入事由：{{item.reason}}</p>
              <p class="ellipsis" v-if="item.agent">关联代理商：{{item.agent}}</p>
              <p v-if="item.audit_status===2||item.audit_status===3">申请结果：{{item.audit_status===2?"已通过":item.audit_status===3?"未通过":''}}</p>
            </div>
            <mt-badge type="primary" size="small" class="tip" v-if="item.audit_status===2||item.audit_status===3">已审核</mt-badge>
            <mt-badge type="warning" size="small" class="tip" v-if="item.audit_status===1">未审核</mt-badge>
        </li>
      </ul>
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
      data:{},
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
  methods: {
    back(){
      this.$router.go(-1)
    },
    getList(){
      let data={},url="html/monitor/auditEnterList";
      data.uid=JSON.parse(localStorage.getItem("userInfo")).uid;
      data.pageNum=this.num;
      data.pageSize=this.size;
      this.$axios.post(url,data).then(res=>{
        if(res.data.Code==="0"){
          this.data={};
          this.allLoaded=false;
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
        this.queryLoading=false;
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
    detail(id,sta){
      if(sta===1){
        this.$messagebox({
          message:"是否通过审核?",
          confirmButtonText:"通过",
          showCancelButton:true,
          cancelButtonText:"不通过"
        }).then(action=>{
          if(action==="confirm"){
            //通过
            this.audit(id,2);
          }else if(action==="cancel"){
            //不通过
            this.$messagebox.prompt('请输入不通过的原因').then(({ value, action }) => {
              //确实不通过
              if(value==null || value.length>100){
                this.$toast({
                  message:"原因必填且不超过100字"
                })
                return ;
              }
              this.audit(id,3,value);
            }).catch(err=>{
              //取消了不通过的操作
            })
          }
        })
      }
    },
    audit(id,sta,reason){
      let data={};
      data.uid=JSON.parse(localStorage.getItem("userInfo")).uid;
      data.id=id;
      data.audit_status=sta;
      data.audit_reason=reason;
      this.$axios.post("html/monitor/auditEnter",data).then(res=>{
        if(res.data.Code==="1"){
          this.data.list=[];
          this.num=1;
          this.queryLoading=true
          this.allLoaded=false
          this.moreLoading=false
          this.getList();
        }else{
          this.$toast({
            message:res.data.msg,
            duration:1000
          })
        }
      })
    }
  },
  created() {
    this.getList();
  },
  mounted(){
    let _this=this;
    this.$nextTick(function(){
      let height=window.screen.height-40+"px";
      _this.$refs.diaryList.style.height=height;
    })
  }
}
</script>

<style scoped>
p.page-range-header{
  margin:0 0 8px 0;
  padding: 15px 15px 10px;
}
.btn-group{
  margin-top:0px;
}
.ul-list{
  border-top:1px solid #c8c7cc;
  border-bottom:1px solid #c8c7cc;
}
.ul-list li{
  display:flex;
  padding: 10px 15px;
  line-height: 22px;
  position: relative;
}
.ul-list li .tip{
  position:absolute;
  right:10px;top:10px;
}
.ul-list li a{
  display: block;
}
.ul-list li:after{
  position: absolute;
  right: 0;
  bottom: 0;
  left: 15px;
  height: 1px;
  content: '';
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
  background-color: #c8c7cc;
}
.ul-list li:active{
  background:#efeff4;
}
.ul-list li .left{
  flex:3;
  overflow: hidden;
}
.ul-list li h3{
  font-weight: bold;
  font-size:18px;
}
.ul-list li p{
  color:#8f8f94;
}
.ul-list li span{
  border: 1px solid #aeaeae;
  text-align: center;
  position: absolute;
  padding: 2px 8px;
  top: 26%;
  color: #FFFFFF;
  display:block;
}
.ul-list li span.color1{
	background:#FF9500;
}
.ul-list li span.color2{
	background:#bbbbbb;
}
.ul-list li span.color3{
	background:#99e680;
}
.ul-list li span.color4{
	background:#FB7070;
}
.null-data{
  line-height: 80px;
  text-align: center;
  color:#AEAEAE;
  margin-top: 80px;
}
.diary-list{
  margin-top: 40px;
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
