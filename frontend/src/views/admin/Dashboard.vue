<template>
  <div class="admin-dashboard min-h-screen bg-slate-950">
    <!-- Mobile sidebar overlay -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" 
      @click="sidebarOpen = false"
      aria-hidden="true"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
      aria-label="Admin navigation"
    >
      <div class="flex h-full flex-col">
        <!-- Logo/Brand -->
        <div class="flex h-16 items-center justify-between px-4 border-b border-white/10">
          <router-link to="/admin/dashboard" class="flex items-center gap-3">
            <div v-if="logoUrl" class="h-8 w-8 rounded-lg bg-white/5 p-1 overflow-hidden">
              <img :src="logoUrl" alt="Logo" class="h-full w-full object-contain" />
            </div>
            <div v-else class="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span class="text-white font-bold text-sm">B</span>
            </div>
            <span class="font-display font-extrabold text-white text-lg">boniq</span>
          </router-link>
          <button 
            v-if="!sidebarOpen" 
            @click="sidebarCollapsed = !sidebarCollapsed"
            class="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path :class="sidebarCollapsed ? 'rotate-180' : ''" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" transition-transform />
            </svg>
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Main navigation">
          <template v-for="section in navSections" :key="section.key">
            <div v-if="section.children" class="space-y-1">
              <button
                @click="toggleSection(section.key)"
                class="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                :aria-expanded="openSections.includes(section.key)"
              >
                <span>{{ section.label }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-180': openSections.includes(section.key) }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <Transition name="accordion">
                <div v-show="openSections.includes(section.key)" class="pl-2 mt-1 space-y-0.5">
                  <router-link
                    v-for="item in section.children"
                    :key="item.key"
                    :to="item.path"
                    class="nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                    :class="activeTab === item.key ? 'bg-gradient-to-r from-primary/20 to-blue-600/20 text-white shadow-[0_4px_14px_rgba(59,130,246,0.15)]' : ''"
                  >
                    <span v-html="item.icon" class="h-5 w-5 flex-shrink-0"></span>
                    <span v-if="!sidebarCollapsed">{{ item.label }}</span>
                    <span v-if="item.badge" class="ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300">{{ item.badge }}</span>
                  </router-link>
                </div>
              </Transition>
            </div>
            <router-link
              v-else
              :to="section.path"
              class="nav-item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200"
              :class="activeTab === section.key ? 'bg-gradient-to-r from-primary/20 to-blue-600/20 text-white shadow-[0_4px_14px_rgba(59,130,246,0.15)]' : ''"
            >
              <span v-html="section.icon" class="h-5 w-5 flex-shrink-0"></span>
              <span v-if="!sidebarCollapsed">{{ section.label }}</span>
              <span v-if="section.badge" class="ml-auto px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300">{{ section.badge }}</span>
            </router-link>
          </template>
        </nav>

        <!-- User info / Sign out -->
        <div class="p-3 border-t border-white/10">
          <div class="flex items-center gap-3 px-3 py-2">
            <div v-if="avatarUrl" class="w-9 h-9 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
              <img :src="avatarUrl" alt="Profile" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
              {{ profileInitials }}
            </div>
            <div v-if="!sidebarCollapsed" class="flex-1 min-w-0">
              <p class="text-white font-medium truncate">{{ authStore.user?.name || 'Administrator' }}</p>
              <p class="text-xs text-slate-500 truncate">{{ authStore.user?.email || 'admin@system' }}</p>
            </div>
          </div>
          <button
            @click="logout"
            class="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white transition-all duration-200 text-sm font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span v-if="!sidebarCollapsed">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main 
      :class="[
        'lg:ml-64 min-h-screen transition-all duration-300',
        sidebarCollapsed && !sidebarOpen ? 'lg:ml-20' : ''
      ]"
    >
      <!-- Top Bar -->
      <header class="sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 lg:px-8">
        <div class="flex items-center gap-4">
          <button 
            @click="sidebarOpen = true"
            class="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 class="text-xl font-display font-bold text-white">{{ pageTitle }}</h1>
        </div>
        <div class="flex items-center gap-3">
          <button @click="refreshData" :disabled="loading" class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50" aria-label="Refresh data">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="loading ? 'animate-spin' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h5M20 20v-5h-5M5.636 18.364A9 9 0 103.34 9.34M18.364 5.636A9 9 0 0120.66 14.66" /></svg>
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer" class="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7z" /></svg>
            Preview
          </a>
        </div>
      </header>

      <!-- Page Content -->
      <div class="p-4 lg:p-8">
        <!-- Toast Notifications -->
        <Teleport to="body">
          <div v-for="toast in toasts" :key="toast.id" class="fixed bottom-6 right-6 z-[9999] flex items-start gap-3 rounded-2xl border px-5 py-4 text-sm shadow-2xl backdrop-blur-2xl animate-slide-in" :class="toast.type === 'error' ? 'border-red-500/30 bg-red-500/20 text-red-200 shadow-red-500/20' : 'border-emerald-500/30 bg-emerald-500/20 text-emerald-200 shadow-emerald-500/20'">
            <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="toast.type === 'error'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <div class="leading-6 font-semibold pr-4">{{ toast.message }}</div>
            <button @click="removeToast(toast.id)" class="absolute right-3 top-3 text-white/40 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </Teleport>

        <component :is="currentView" :refresh-key="refreshKey" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';

// Views
import DashboardOverview from './DashboardOverview.vue';
import ProfileManager from './ProfileManager.vue';
import ProjectManager from './ProjectManager.vue';
import SkillManager from './SkillManager.vue';
import ExperienceManager from './ExperienceManager.vue';
import EducationManager from './EducationManager.vue';
import ServiceManager from './ServiceManager.vue';
import InboxManager from './InboxManager.vue';
import SettingsManager from './SettingsManager.vue';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const sidebarOpen = ref(false);
const sidebarCollapsed = ref(false);
const openSections = ref(['content', 'management']);
const refreshKey = ref(0);
const toasts = ref([]);
const loading = ref(false);
const logoUrl = ref(localStorage.getItem('boniq_logo') || null);
const avatarUrl = ref(localStorage.getItem('boniq_avatar') || null);

const navSections = [
  { key: 'overview', label: 'Overview', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>', path: '/admin/dashboard' },
  { 
    key: 'content', 
    label: 'Content', 
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>',
    children: [
      { key: 'projects', label: 'Projects', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>', path: '/admin/projects' },
      { key: 'skills', label: 'Skills', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>', path: '/admin/skills' },
      { key: 'experience', label: 'Experience', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>', path: '/admin/experience' },
      { key: 'education', label: 'Education', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>', path: '/admin/education' },
      { key: 'services', label: 'Services', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>', path: '/admin/services' },
    ]
  },
  { 
    key: 'management', 
    label: 'Management', 
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
    children: [
      { key: 'profile', label: 'Profile', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>', path: '/admin/profile' },
      { key: 'inbox', label: 'Inbox', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>', path: '/admin/inbox', badge: '0' },
      { key: 'settings', label: 'Settings', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>', path: '/admin/settings' },
    ]
  },
];

const viewsMap = {
  overview: DashboardOverview,
  projects: ProjectManager,
  skills: SkillManager,
  experience: ExperienceManager,
  education: EducationManager,
  services: ServiceManager,
  profile: ProfileManager,
  inbox: InboxManager,
  settings: SettingsManager,
};

const pageTitles = {
  overview: 'Dashboard',
  projects: 'Projects',
  skills: 'Skills',
  experience: 'Experience',
  education: 'Education',
  services: 'Services',
  profile: 'Profile',
  inbox: 'Inbox',
  settings: 'Settings',
};

const currentView = computed(() => {
  const key = route.params.tab || 'overview';
  return viewsMap[key] || DashboardOverview;
});

const pageTitle = computed(() => {
  const key = route.params.tab || 'overview';
  return pageTitles[key] || 'Dashboard';
});

const profileInitials = computed(() => {
  const name = authStore.user?.name || 'boniq';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
});

const toggleSection = (key) => {
  if (openSections.value.includes(key)) {
    openSections.value = openSections.value.filter(s => s !== key);
  } else {
    openSections.value.push(key);
  }
};

const showToast = (type, message) => {
  const id = Date.now();
  toasts.value.push({ id, type, message });
  setTimeout(() => removeToast(id), 5000);
};

const removeToast = (id) => {
  toasts.value = toasts.value.filter(t => t.id !== id);
};

const refreshData = async () => {
  loading.value = true;
  refreshKey.value++;
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    showToast('success', 'Data refreshed successfully');
  } catch (e) {
    showToast('error', 'Failed to refresh data');
  } finally {
    loading.value = false;
  }
};

const logout = () => {
  authStore.logout();
  router.push('/admin');
};

const getAuthConfig = () => {
  const token = authStore.token || localStorage.getItem('boniq_token');
  if (!token) {
    router.push('/admin');
    return {};
  }
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

const fetchProfileAssets = async () => {
  try {
    const res = await axios.get('/api/profile');
    if (res.data?.logoUrl) {
      logoUrl.value = res.data.logoUrl;
      localStorage.setItem('boniq_logo', res.data.logoUrl);
    }
    if (res.data?.avatarUrl) {
      avatarUrl.value = res.data.avatarUrl;
      localStorage.setItem('boniq_avatar', res.data.avatarUrl);
    }
    if (authStore.user && route.params.tab === 'inbox') {
      // Update inbox badge
      const msgRes = await axios.get('/api/messages', getAuthConfig());
      const unread = msgRes.data?.filter(m => !m.isRead).length || 0;
      // Badge updates via reactive navSections
    }
  } catch (e) {}
};

const handleRouteChange = () => {
  sidebarOpen.value = false;
};

onMounted(() => {
  fetchProfileAssets();
  router.beforeEach(handleRouteChange);
});

onUnmounted(() => {
  router.beforeEach(() => {});
});

// Provide global functions to child components
const provide = {
  showToast,
  getAuthConfig,
  refreshKey,
};

import { provide as provideFn } from 'vue';
provideFn('toast', { show: showToast });
provideFn('auth', { getAuthConfig });
provideFn('refreshKey', refreshKey);
</script>

<style scoped>
.admin-dashboard {
  @apply font-sans antialiased;
}

.nav-item {
  @apply relative;
}

.nav-item.router-link-active::before {
  content: '';
  @apply absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 bg-primary rounded-r-full;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: -8px;
}

.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 500px;
  margin-top: 0;
}

.animate-slide-in {
  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-white/10 rounded-full hover:bg-white/20 transition-colors;
}

::-webkit-scrollbar-corner {
  @apply bg-transparent;
}

/* Focus visible for accessibility */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  @apply outline-none ring-2 ring-primary ring-offset-2 ring-offset-slate-900;
}
</style>