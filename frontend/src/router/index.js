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
            meta: { requiresAuth: true },
            children: [
                { path: '', redirect: 'overview' },
                { path: 'overview', name: 'admin-overview', component: () => import('../views/admin/DashboardOverview.vue') },
                { path: 'profile', name: 'admin-profile', component: () => import('../views/admin/ProfileManager.vue') },
                { path: 'projects', name: 'admin-projects', component: () => import('../views/admin/ProjectManager.vue') },
                { path: 'skills', name: 'admin-skills', component: () => import('../views/admin/SkillManager.vue') },
                { path: 'experience', name: 'admin-experience', component: () => import('../views/admin/ExperienceManager.vue') },
                { path: 'education', name: 'admin-education', component: () => import('../views/admin/EducationManager.vue') },
                { path: 'services', name: 'admin-services', component: () => import('../views/admin/ServiceManager.vue') },
                { path: 'inbox', name: 'admin-inbox', component: () => import('../views/admin/InboxManager.vue') },
                { path: 'settings', name: 'admin-settings', component: () => import('../views/admin/SettingsManager.vue') },
            ]
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