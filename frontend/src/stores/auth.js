import { defineStore } from 'pinia';
import api from '@/api/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('boniq_user')) || null,
        token: localStorage.getItem('boniq_token') || null,
        logoUrl: localStorage.getItem('boniq_logo') || null,
        siteUrl: localStorage.getItem('boniq_site_url') || null,
        error: null,
        loading: false
    }),
    actions: {
        async login(email, password) {
            this.loading = true;
            this.error = null;
            try {
                const { data } = await api.post('/api/auth/login', { email, password });
                this.user = { id: data._id, name: data.name, email: data.email };
                this.token = data.token;

                localStorage.setItem('boniq_user', JSON.stringify(this.user));
                localStorage.setItem('boniq_token', this.token);

                try {
                    const profileRes = await api.get('/api/profile');
                    if (profileRes.data?.logoUrl) {
                        this.logoUrl = profileRes.data.logoUrl;
                        localStorage.setItem('boniq_logo', profileRes.data.logoUrl);
                    }
                    if (profileRes.data?.siteUrl) {
                        this.siteUrl = profileRes.data.siteUrl;
                        localStorage.setItem('boniq_site_url', profileRes.data.siteUrl);
                    }
                } catch (e) {}

                this.loading = false;
                return true;
            } catch (err) {
                this.error = err.response?.data?.message || err.message;
                this.loading = false;
                return false;
            }
        },
        async loadProfile() {
            try {
                const profileRes = await api.get('/api/profile');
                if (profileRes.data?.logoUrl) {
                    this.logoUrl = profileRes.data.logoUrl;
                    localStorage.setItem('boniq_logo', profileRes.data.logoUrl);
                }
                if (profileRes.data?.siteUrl) {
                    this.siteUrl = profileRes.data.siteUrl;
                    localStorage.setItem('boniq_site_url', profileRes.data.siteUrl);
                }
            } catch (e) {}
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('boniq_user');
            localStorage.removeItem('boniq_token');
        }
    }
});
