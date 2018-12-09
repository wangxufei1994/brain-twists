import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Register from '@/components/Register/Register'
import Home from '@/components/Home/Home'
import Category from '@/components/Category/Category'
import My from '@/components/My/My'
import CategoryApp from '@/components/CategoryApp/CategoryApp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },{
      path:"/register",
      name:"register",
      component:Register
    },{
      path:"/home",
      name:"home",
      component:Home,
      children:[{
        path:"category",
        name:"home.category",
        component:Category
      },{
        path:"category/app/:type",
        name:"home.category.app",
        component: CategoryApp
      },{
        path:"my",
        name:"home.my",
        component:My
      }]
    }
  ]
})
