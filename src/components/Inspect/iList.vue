<template>
  <div class="page">
    <mt-header fixed title="我的巡检">
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <p class="page-range-header">巡检列表状态</p>
    <div class="btn-group">
      <mt-button type="default" size='large' @click="filter">{{statusTxt}}</mt-button>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
      </mt-actionsheet>
    </div>
    <!-- //列表 -->
    <ul class='ul-list'>
      <li v-if="data.list && data.list.length>0" v-for="item in data.list" :key="item.id" @click="detail(item.id)">
          <div class="left">
            <h3>{{item.name}}</h3>
            <p>{{item.polling_time}}</p>
            <p class="ellipsis">{{item.dispose_user_name}}</p>
          </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      data:{},
      sheetVisible:false,
      actions:[{name:'未完成',method:this.act},{name:'已完成',method:this.act}],
      status:0,
      statusTxt:''
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    getList(){
      let data={};
      data.uid=JSON.parse(localStorage.getItem("userInfo")).uid;
      data.pageNum=1;
      data.pageSize=100;
      //1 已完成   0 未完成
      data.status=this.status;
      data.pid=this.$route.query.id;
      this.$axios.post('html/PollingManage/pollingNotesList',data).then(res=>{
        if(res.data.Code==="0"){
          this.data={};
        }else{
          this.data=res.data.data;
        }
      })
    },
    filter(){
      this.sheetVisible=true;
    },
    act(a,b){
      this.status=b;
      this.statusTxt=a.name;
      this.getList();
    },
    detail(id){
      this.$router.push({
        name:"home.inspect.iDetail",
        query:{
          id:id,
          //状态
          sta:this.status
        }
      })
    }
  },
  created() {
    this.status=parseInt(this.$route.query.type);
    switch (this.status) {
      case 0:
        this.statusTxt='未完成'
        break;
      case 1:
        this.statusTxt='已完成'
      default:
        break;
    }
    this.getList();
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
</style>
