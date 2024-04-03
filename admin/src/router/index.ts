import { createRouter, createWebHistory } from "vue-router";

import store from "@/store";

import Login from "@/views/Login.vue";
import NotFound from "@/views/NotFound.vue";
import Dashboard from "@/views/Dashboard.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import RequestPassword from "@/views/RequestPassword.vue";

import AppLayout from "@/components/AppLayout.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/app/dashboard",
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                requiresGuest: true,
            },
        },
        {
            path: "/request-password",
            name: "requestPassword",
            component: RequestPassword,
            meta: {
                requiresGuest: true,
            },
        },
        {
            path: "/reset-password",
            name: "resetPassword/:token",
            component: ResetPassword,
            meta: {
                requiresGuest: true,
            },
        },
        {
            path: "/app",
            name: "app",
            redirect: "/app/dashboard",
            component: AppLayout,
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: "dashboard",
                    name: "app.dashboard",
                    component: Dashboard,
                },
                {
                    path: "categories",
                    name: "app.categories",
                    component: Dashboard,
                },
                {
                    path: "products",
                    name: "app.products",
                    component: Dashboard,
                },
                {
                    path: "orders",
                    name: "app.orders",
                    component: Dashboard,
                },
                {
                    path: "users",
                    name: "app.users",
                    component: Dashboard,
                },
                {
                    path: "customers",
                    name: "app.customers",
                    component: Dashboard,
                },
            ],
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notFound",
            component: NotFound,
        },
    ],
});

router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: "login" });
    } else if (to.meta.requiresGuest && store.state.user.token) {
        next({ name: "app.dashboard" });
    } else {
        next();
    }
});

export default router;
