import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Register from '@/components/Register/Register'
import Home from '@/components/Home/Home'
import Category from '@/components/Category/Category'
import My from '@/components/My/My'
import Twists from '@/components/Twists/Twists'
import Brain from '@/components/Brain/Brain'
import Joke from '@/components/Joke/Joke'
import Riddle from '@/components/Riddle/Riddle'
import Diary from '@/components/Diary/Diary'
import DiaryAdd from '@/components/Diary/DiaryAdd'

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
        path:"twists",
        name:"home.category.twists",
        component: Twists
      },{
        path:"my",
        name:"home.my",
        component:My
      },{
        path:"brain",
        name:"home.category.brain",
        component:Brain
      },{
        path:"joke",
        name:"home.category.joke",
        component:Joke
      },{
        path:"riddle",
        name:"home.category.riddle",
        component:Riddle
      },{
        path:"diary",
        name:"home.category.diary",
        component:Diary
      },{
        path:"diaryAdd",
        name:"home.category.diaryAdd",
        component:DiaryAdd
      }]
    }
  ]
})
