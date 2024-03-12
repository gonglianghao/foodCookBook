import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/HomePage'
    },
    {path:'/login',
    name:'login',
    component:()=>import('@/views/longin/LoginPage.vue'),
    meta:{
        title:'登录'
    }
    },
    {path:'/homePage',
    name:'homePage',
    component:()=>import('@/views/home/HomePage.vue'),
    meta:{
        title:'首页'
    }
  },
  {path:'/cookall',
  name:'cookall',
  component:()=>import('@/views/cookall/cookAll.vue'),
  meta:{
      title:'菜谱大全'
  }
},
  ]
})

export default router
