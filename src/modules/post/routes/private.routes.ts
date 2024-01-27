import { RouteRecordRaw } from "vue-router";

export default [
    {
        path: "mis-publicaciones",
        name: "MisPublicacionesPage",
        component: () => import("../pages/MisPublicaciones.vue"),
        meta: {
            public: false,
            auth: true,
        }
    },
    {
        path: "tags",
        name: "TagsPage",
        component: () => import("../pages/Tags.vue"),
        meta: {
            public: false,
            auth: true,
        }
    },
    {
        path: "crear",
        name: "CrearPublicacionesPage",
        component: () => import("../pages/CrearPublicacion.vue"),
        meta: {
            public: false,
            auth: true,
        }
    }
] as RouteRecordRaw[];