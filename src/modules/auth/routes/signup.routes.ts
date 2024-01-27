import { RouteRecordRaw } from "vue-router";

export default [
    {
        path: "registrar",
        name: "RegistratePage",
        component: () => import("../pages/Registrate.vue"),
    }
] as RouteRecordRaw[]