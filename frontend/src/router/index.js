import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/about', name: 'about', component: () => import('../views/About.vue') },
        { path: '/projects', name: 'projects', component: () => import('../views/Projects.vue') },
        { path: '/skills', name: 'skills', component: () => import('../views/Skills.vue') },
        { path: '/contact', name: 'contact', component: () => import('../views/Contact.vue') },
        { path: '/admin', name: 'admin-login', component: () => import('../views/admin/Login.vue') },
        {
            path: '/admin/dashboard',
            name: 'admin-dashboard',
            component: () => import('../views/admin/Dashboard.vue'),
            meta: { requiresAuth: true }
        }
    ],
    scrollBehavior() {
        return { top: 0 }
    }
});

router.beforeEach((to, from, next) => {
    const isAuth = localStorage.getItem('boniq_token');
    if (to.meta.requiresAuth && !isAuth) {
        next({ name: 'admin-login' });
    } else {
        next();
    }
});

export default router;
