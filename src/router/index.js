import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('../pages/AppMainPage.vue'),
        meta: {
            public: true,
            title: 'Home' }
    },
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
        path: '/register',
        name: 'register',
        component: () => import('../pages/AppRegisterPage.vue'),
        meta: {
            public: true,
            title: 'Register'
        }
    },
    {
        path: '/account',
        name: 'account',
        component: () => import('../pages/AppAccountPage.vue'),
        meta: {
            public: true,
            title: 'Account'
        }
    },
    {
        path: '/movie/:id',
        name: 'movie-details',
        component: () => import('../pages/MovieDetailsPage.vue'),
        meta: {
            public: true,
            title: 'Movie Details',
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;