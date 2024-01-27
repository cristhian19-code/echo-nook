import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import postRoutes from '../modules/post/routes';
import authRoutes from '../modules/auth/routes';

const routes = [
    {
        path: '/',
        component: () => import('../layouts/DefaultLayout.vue'),
        children: [
            ...postRoutes
        ],
    },
    {
        path: "/auth/",
        component: () => import("../layouts/AuthLayout.vue"),
        children: [
            ...authRoutes
        ]
    }
] as RouteRecordRaw[];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;