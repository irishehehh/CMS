import { localCache } from '@/utils/cache'
import { createRouter, createWebHistory, RouteRecordRaw, useRoute } from 'vue-router'
import { watch,ref } from 'vue'
import { firstMenu, mapMenusToRoutes } from '@/utils/map-menu'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/main'

    },
    {
      path:'/login',
      component:()=> import ('../views/login/Login.vue')
    },
    {
      path:'/main',
      name:'main',
      component:()=> import ('../views/main/Main.vue'),
   
    },
    {
      path:'/:pathMatch(.*)',
      component:()=>import('../views/not-found/NotFound.vue')
    }

  ]
})

 export const localRoutes:RouteRecordRaw[]= [
  {
    path:'/main/analysis/overview',
    component:() => import('../views/main/analysis/overview/overview.vue')
  },
  {
    path:'/main/analysis/dashboard',
    component:() => import('../views/main/analysis/dashboard/dashboard.vue')
  },
  {
    path:'/main/system/role',
    component:() => import('../views/main/system/role/role.vue')
  },
  {
    path:'/main/system/user',
    component:() => import('../views/main/system/user/user.vue')
  },
  {
    path:'/main/system/menu',
    component:() => import('../views/main/system/menu/menu.vue')
  },
  {
    path:'/main/system/department',
    component:() => import('../views/main/system/department/department.vue')
  },
  {
    path:'/main/product/category',
    component:() => import('../views/main/product/category/category.vue')
  },
  {
    path:'/main/product/goods',
    component:() => import('../views/main/product/goods/goods.vue')
  },
  {
    path:'/main/story/chat',
    component:() => import('../views/main/story/chat/chat.vue')
  },
  {
    path:'/main/story/list',
    component:() => import('../views/main/story/list/list.vue')
  },





]

// router.addRoute('main',localRoutes[0])
// router.addRoute('main',localRoutes[1])
// router.addRoute('main',localRoutes[2])
// router.addRoute('main',localRoutes[3])
// router.addRoute('main',localRoutes[4])
// router.addRoute('main',localRoutes[5])
// router.addRoute('main',localRoutes[6])
// router.addRoute('main',localRoutes[7])
// router.addRoute('main',localRoutes[8])
// router.addRoute('main',localRoutes[9])





//导航守卫
// to 跳转位置  from 从哪里来
// 返回值 导航的路径








export function addRoutesWithMenu(menus: any) {
  // 1.获取匹配到的所有的路由
  const routes = mapMenusToRoutes(menus)

  // 2.动态添加到router中
  for (const route of routes) {
    router.addRoute('main', route)
  }
}


router.beforeEach((to,from) => {

  if (to.path.startsWith('/main')) {
    const token = localCache.getCache('token')
    if (!token) return '/login'
  }

  if (to.path === '/main' && firstMenu) {
    return firstMenu.path
  }





})





export default router
