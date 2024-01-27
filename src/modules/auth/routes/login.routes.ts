import { RouteRecordRaw } from "vue-router";

export default [
    {
        path: "login",
        name: "LoginPage",
        component: () => import("../pages/Login.vue"),
    },
] as RouteRecordRaw[]