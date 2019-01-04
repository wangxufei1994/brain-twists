import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login/Login'
const Login=()=>import('@/components/Login/Login')
// import Home from '@/components/Home/Home'
const Home=()=>import('@/components/Home/Home')
// import My from '@/components/My/My'
const My=()=>import('@/components/My/My')
// import Status from '@/components/Status/Status'
const Status=()=>import('@/components/Status/Status')
// import Source from '@/components/Source/Source'
const Source=()=>import('@/components/Source/Source')
// import Motor from '@/components/Source/Motor'
const Motor=()=>import('@/components/Source/Motor')
// import Device from '@/components/Source/Device'
const Device=()=>import('@/components/Source/Device')
// import EquipList from '@/components/Source/EquipList'
const EquipList=()=>import('@/components/Source/EquipList')
// import Inspect from '@/components/Inspect/Inspect'
const Inspect=()=>import('@/components/Inspect/Inspect')
// import InspectList from '@/components/Inspect/InspectList'
const InspectList=()=>import('@/components/Inspect/InspectList')
// import InspectDetail from '@/components/Inspect/InspectDetail'
const InspectDetail=()=>import('@/components/Inspect/InspectDetail')
// import iList from '@/components/Inspect/iList'
const iList=()=>import('@/components/Inspect/iList')
// import iDetail from '@/components/Inspect/iDetail'
const iDetail=()=>import('@/components/Inspect/iDetail')

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
        path:"inspectList",
        name:"home.inspect.list",
        component:InspectList
      },{
        path:"inspectDetail/:id",
        name:"home.inspect.detail",
        component:InspectDetail
      },{
        path:"iList",
        name:"home.inspect.iList",
        component:iList
      },{
        path:"iDetail",
        name:"home.inspect.iDetail",
        component:iDetail
      },{
        path:"my",
        name:"home.my",
        component:My
      },{
        path:"motor/:id",
        name:"home.source.motor",
        component:Motor
      },{
        path:"device",
        name:"home.source.device",
        component:Device
      },{
        path:"equipList/:id",
        name:"home.source.equipList",
        component:EquipList
      }]
    }
  ]
})
