<template>
  <div class="addDiary">
      <mt-header fixed title="写日记">
        <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      </mt-header>
      <div class="text-box">
        <label class="mint-radiolist-title">日记</label>
        <mt-field  placeholder="在这里输入"  type="textarea" rows="1" v-model="content" @input.native="input" ref="textarea"></mt-field>
        <label class="mint-radiolist-title">备注</label>
        <mt-field  placeholder="在这里输入备注"  type="textarea" rows="2" v-model="remark"></mt-field>
      </div>
      <div class="btn-group">
        <mt-button type="primary" size="large">提交</mt-button>
      </div>
  </div>
</template>

<script type="text/script">
export default {
  data() {
    return {
      content:"",
      remark:""
    }
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    input(){
      console.log(this.$refs.textarea.$el);
    }
  }
}
</script>

<style scoped>
.text-box{
  margin-top:60px;
}
</style>
