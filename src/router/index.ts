import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import WkLoayout from '@/components/layout.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 处理路由信息
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: WkLoayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'HomePage',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'demo',
        name: 'DemoPage',
        component: () => import('@/views/demo/index.vue'),
      },
    ],
  },
  {
    path: '/:chapters+',
    redirect: '/home',
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
