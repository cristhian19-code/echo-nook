import { RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '',
        name: "InicioPage",
        component: () => import('../pages/Inicio.vue'),
        meta: {
            public: true,
            auth: false,
        }
    },
    {
        path: "publicaciones",
        name: "PublicacionesPage",
        component: () => import("../pages/Publicaciones.vue"),
        meta: {
            public: true,
            auth: false,
        }
    }
] as RouteRecordRaw[]