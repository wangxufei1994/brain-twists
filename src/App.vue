<template>
  <div id="app">
    <router-view class="container"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      
    }
  }
}
</script>

<style>
#app{
  width:100%;
  height:100%;
}
#app>div{
  height:100%;
  overflow: auto;
}
</style>
