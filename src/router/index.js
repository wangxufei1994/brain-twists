import Vue from 'vue'
import Router from 'vue-router'
const Login=()=>import('@/components/Login/Login')
const Home=()=>import('@/components/Home/Home')
const My=()=>import('@/components/My/My')
const Status=()=>import('@/components/Status/Status')
const Access=()=>import('@/components/Status/Access')
const Apply=()=>import('@/components/Status/Apply')
const Record=()=>import('@/components/Status/Record')
const Source=()=>import('@/components/Source/Source')
const Motor=()=>import('@/components/Source/Motor')
const Device=()=>import('@/components/Source/Device')
const EquipList=()=>import('@/components/Source/EquipList')
const Inspect=()=>import('@/components/Inspect/Inspect')
const InspectList=()=>import('@/components/Inspect/InspectList')
const InspectDetail=()=>import('@/components/Inspect/InspectDetail')
const iList=()=>import('@/components/Inspect/iList')
const iDetail=()=>import('@/components/Inspect/iDetail')
const InspectAdd=()=>import('@/components/Inspect/InspectAdd')


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
        path:"inspectAdd",
        name:"home.inspect.add",
        component:InspectAdd
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
    },{
      path:"/access",
      name:"access",
      component:Access
    },{
      path:"/apply",
      name:"apply",
      component:Apply
    },{
      path:"/record",
      name:"record",
      component:Record
    }
  ]
})
