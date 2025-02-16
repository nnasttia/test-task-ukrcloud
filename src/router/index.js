import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/AppLoginPage.vue'),
        meta: {
            public: true,
            title: 'Login'
        }
    },
    {
        path: '/',
        name: 'main',
        component: () => import('../pages/AppMainPage.vue'),
        meta: {
            requiresAuth: true,
            title: 'Home'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../pages/AppRegisterPage.vue'),
        meta: {
            public: true,
            title: 'Register'
        }
    },
    {
        path:'/forgottenpassword',
        name: 'forgottenpassword',
        component: () => import('../pages/AppForgottenPassword.vue'),
        meta: {
            public: true,
            title: 'Forgotten Password'
        }
    },
    {
        path: '/movie/:id',
        name: 'movie-details',
        component: () => import('../pages/MovieDetailsPage.vue'),
        meta: {
            requiresAuth: true,
            title: 'Movie Details',
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem("token");

    if (!isAuthenticated && to.name !== "login" && to.name !== "register") {
        next("/login");
    } else {
        next();
    }
});

export default router;