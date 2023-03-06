import { createRouter, createWebHistory } from 'vue-router'

// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/',
    props: true,
    component: () => import('../components/homepage.vue')
  },
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../components/intakeform.vue')
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../components/findclient.vue')
  },
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../components/updateclient.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../components/eventform.vue')
  },
  {
    path: '/createservices',
    name: 'createservices',
    component: () => import('../components/createservices.vue')
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findevents.vue')
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../components/eventdetails.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
