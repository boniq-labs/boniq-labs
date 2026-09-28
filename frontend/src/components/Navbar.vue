<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-500" :class="{ 'backdrop-blur-xl bg-dark/80 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-3': scrolled, 'py-5 bg-transparent': !scrolled }">
    <div class="container max-w-6xl mx-auto px-4 flex justify-between items-center">
      <router-link to="/" class="flex items-center gap-3 group relative">
        <div v-if="logoUrl" class="relative flex items-center justify-center p-1.5 rounded-xl bg-white/[0.03] border border-white/10 shadow-lg backdrop-blur-md group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all duration-500 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <img :src="logoUrl" class="h-9 md:h-10 w-auto relative z-10 transition-all duration-500 group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]" alt="Logo" />
        </div>
        <span v-else class="text-2xl font-display font-extrabold tracking-tight relative">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent group-hover:from-blue-400 group-hover:to-purple-400 transition-all drop-shadow-md relative z-10">boniq</span>
          <span class="absolute -inset-2 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full pointer-events-none"></span>
        </span>
      </router-link>
      
      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] shadow-lg backdrop-blur-md">
        <router-link to="/" class="nav-link px-4 py-2 rounded-xl text-slate-300 hover:text-white font-medium text-sm transition-all duration-300 relative group">
          Home
          <span class="absolute inset-x-3 -bottom-0 h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
        </router-link>
        <router-link to="/about" class="nav-link px-4 py-2 rounded-xl text-slate-300 hover:text-white font-medium text-sm transition-all duration-300 relative group">
          About
          <span class="absolute inset-x-3 -bottom-0 h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
        </router-link>
        <router-link to="/projects" class="nav-link px-4 py-2 rounded-xl text-slate-300 hover:text-white font-medium text-sm transition-all duration-300 relative group">
          Projects
          <span class="absolute inset-x-3 -bottom-0 h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
        </router-link>
        <router-link to="/skills" class="nav-link px-4 py-2 rounded-xl text-slate-300 hover:text-white font-medium text-sm transition-all duration-300 relative group">
          Skills
          <span class="absolute inset-x-3 -bottom-0 h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
        </router-link>
        <router-link to="/contact" class="nav-link px-4 py-2 rounded-xl text-slate-300 hover:text-white font-medium text-sm transition-all duration-300 relative group">
          Contact
          <span class="absolute inset-x-3 -bottom-0 h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
        </router-link>
      </nav>

      <div class="hidden md:flex items-center gap-3">
        <!-- Profile Access Button - 3 clicks to open admin -->
        <button 
          @click="handleProfileClick"
          class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm"
          :aria-label="authStore && authStore.user ? 'Profile (3 clicks for admin)' : 'Login (3 clicks for admin)'"
        >
          <div v-if="avatarUrl" class="w-8 h-8 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
            <img :src="avatarUrl" alt="Profile" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
            {{ profileInitials }}
          </div>
          <span v-if="authStore && authStore.user" class="hidden sm:inline">{{ authStore.user.name }}</span>
        </button>
      </div>
      
      <!-- Mobile Menu Button -->
      <button class="md:hidden text-white p-2 rounded-xl hover:bg-white/10 transition-all" @click="mobileMenuOpen = !mobileMenuOpen">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300" :class="{'rotate-90': mobileMenuOpen}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <!-- Mobile Nav -->
    <transition name="slide-down">
      <div v-if="mobileMenuOpen" class="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 p-5 flex flex-col gap-2 border border-white/10 shadow-2xl rounded-2xl bg-dark/95 backdrop-blur-2xl">
        <router-link to="/" class="mobile-nav-link" @click="mobileMenuOpen = false">Home</router-link>
        <router-link to="/about" class="mobile-nav-link" @click="mobileMenuOpen = false">About</router-link>
        <router-link to="/projects" class="mobile-nav-link" @click="mobileMenuOpen = false">Projects</router-link>
        <router-link to="/skills" class="mobile-nav-link" @click="mobileMenuOpen = false">Skills</router-link>
        <router-link to="/contact" class="mobile-nav-link" @click="mobileMenuOpen = false">Contact</router-link>
        <div class="border-t border-white/10 my-2"></div>
        <button v-if="authStore && authStore.user" @click="handleLogout; mobileMenuOpen = false" class="mobile-nav-link text-red-400 border-red-500/30 hover:bg-red-500/10">Sign Out</button>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import api from '@/api/api';

let authStore = null;
try {
  authStore = useAuthStore();
} catch (e) {}

const router = useRouter();
const scrolled = ref(false);
const mobileMenuOpen = ref(false);
const logoUrl = ref(localStorage.getItem('boniq_logo') || null);
const avatarUrl = ref(localStorage.getItem('boniq_avatar') || null);

// 3-click mechanism for admin access
const profileClickCount = ref(0);
let clickTimeout = null;

const profileInitials = computed(() => {
  const name = authStore?.user?.name || 'boniq';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

const handleLogout = () => {
  if (authStore) authStore.logout();
  router.push('/admin');
};

const handleProfileClick = () => {
  profileClickCount.value++;
  if (profileClickCount.value >= 3) {
    router.push('/admin');
    profileClickCount.value = 0;
  } else if (profileClickCount.value === 2) {
    // Subtle hint on second click
    console.log('One more click for admin access...');
  }
  clearTimeout(clickTimeout);
  clickTimeout = setTimeout(() => {
    profileClickCount.value = 0;
  }, 1000);
};

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
  if (!logoUrl.value || !avatarUrl.value) {
    try {
      const res = await api.get('/api/profile');
      if (res.data?.logoUrl) {
        logoUrl.value = res.data.logoUrl;
        localStorage.setItem('boniq_logo', res.data.logoUrl);
      }
      if (res.data?.avatarUrl) {
        avatarUrl.value = res.data.avatarUrl;
        localStorage.setItem('boniq_avatar', res.data.avatarUrl);
      }
    } catch (e) {}
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.nav-link.router-link-active {
  @apply text-white bg-white/10;
}

.nav-link.router-link-active span {
  @apply scale-x-100;
}

.mobile-nav-link {
  @apply text-slate-300 font-medium py-3 px-4 rounded-xl hover:bg-white/10 hover:text-white transition-all text-center border border-transparent;
}

.mobile-nav-link.router-link-active {
  @apply bg-gradient-to-r from-primary/20 to-accent/20 text-white border-white/10 shadow-inner;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>