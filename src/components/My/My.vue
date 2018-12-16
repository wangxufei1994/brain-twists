<template>
  <div class="my">
      <img :src="user.headImg" alt="" @click="uploadImg">
      <input type="file" ref="uploadInput" class="uploadInput" @change="upload" accept="image/*"/>
      <div class="user-info">
        <mt-field label="昵称" v-model="user.nick" readonly disableClear @click.native="changeName"></mt-field>
        <mt-field label="性别" v-model="user.sex===1?'男':'女'" readonly disableClear @click.native="changeSex"></mt-field>
        <mt-actionsheet
          :actions="sexActions"
          v-model="sexVisible">
        </mt-actionsheet>
      </div>
      <div class="btn-group">
        <mt-button type="danger" size="large" @click="logout">退出</mt-button>
      </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
        user:{},
        sexVisible:false,
        sexActions:[{name:"男",method:this.editSex},{name:"女",method:this.editSex}]
    }
  },
  created() {
    this.user=JSON.parse(localStorage.getItem("userInfo"))
  },
  methods:{
    logout(){
      localStorage.removeItem("userInfo");
      this.$router.replace({
        name:"login"
      });
    },
    changeName(){
      this.$messagebox.prompt('请输入姓名').then(({ value, action }) => {
        if(action==="confirm"){
          this.$axios.post("/editNick",{id:this.user.id,value:value}).then(res=>{
            if(res.data.code===1){
              this.$toast({
                duration:1000,
                message:"修改成功"
              })
              this.user.nick=value;
              localStorage.setItem("userInfo",JSON.stringify(this.user))
            }
          })
        }
      })
    },
    changeSex(){
      this.sexVisible=true;
    },
    editSex(i,j){
      this.$axios.post('/editSex',{id:this.user.id,value:j+1}).then(res=>{
        if(res.data.code===1){
          this.$toast("修改成功")
          this.user.sex=j+1;
          localStorage.setItem("userInfo",JSON.stringify(this.user))
        }
      })
    },
    uploadImg(){
      //点击图片，触发事件
      this.$refs.uploadInput.click();
    },
    upload(event){
      if(event.target.files[0]){
        this.$indicator.open({
          text:"上传中",
          spinnerType: 'fading-circle'
        });
        lrz(event.target.files[0],{width:300,height:300}).then(rlt=>{
          //上传
          let formData=new FormData();
          formData.append("id",this.user.id)
          formData.append("file",rlt.file)
          const instance=this.$axios.create({
            withCredentials:true
          })
          let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          };
          instance.post('/upload',formData,config).then(res=>{
            if(res.data.code===1){
              this.user.headImg=res.data.headImg;
              localStorage.setItem("userInfo",JSON.stringify(this.user))
              this.$indicator.close();
            }
          })
        });
      }
    }
  }
}
</script>

<style scoped>
.my{
  width:100%;
}
img{
  display:block;
  width: 70px;
  height:70px;
  border-radius:50%;
  border:1px solid #F4F4F4;
  margin:20px auto;
}
.user-info{
  margin-top:50px;
}
</style>
