import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import ForeclosureList from '@/views/ForeclosureList.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'ForeclosureList',
    component: ForeclosureList
  },
  {
    path: '/custom-list',
    name: 'CustomList',
    component: () => import('@/views/CustomList.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/Contact.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

