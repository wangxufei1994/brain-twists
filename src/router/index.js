import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Home from '@/components/Home/Home'
import My from '@/components/My/My'
import Status from '@/components/Status/Status'
import Source from '@/components/Source/Source'
import Motor from '@/components/Source/Motor'
import Device from '@/components/Source/Device'
import Inspect from '@/components/Inspect/Inspect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },{
      path:"/home",
      name:"home",
      component:Home,
      children:[{
        path:"status",
        name:"home.status",
        component:Status
      },{
        path:"source",
        name:"home.source",
        component:Source
      },{
        path:"inspect",
        name:"home.inspect",
        component:Inspect
      },{
        path:"my",
        name:"home.my",
        component:My
      },{
        path:"motor/:id",
        name:"home.motor",
        component:Motor
      },{
        path:"device",
        name:"home.device",
        component:Device
      }]
    }
  ]
})
