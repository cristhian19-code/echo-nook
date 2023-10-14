import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../pages/HomePage.vue')
    },
    {
        path: '/publicacion/:id',
        name: 'Publication',
        component: () => import('../pages/PublicationPage.vue')
    },
    {
        path: '/crear',
        name: 'FormAdd',
        component: () => import('../pages/FormPage.vue')
    },
    {
        path: '/editar/:id',
        name: 'FormEdit',
        component: () => import('../pages/FormPage.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: { path: "/", name: "Home" },
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router