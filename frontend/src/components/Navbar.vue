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
        <!-- Profile/Admin Access Button -->
        <div class="relative" ref="profileDropdownRef">
          <button 
            @click="toggleProfileDropdown"
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm"
            :aria-expanded="profileDropdownOpen"
          >
            <div v-if="avatarUrl" class="w-8 h-8 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
              <img :src="avatarUrl" alt="Profile" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
              {{ profileInitials }}
            </div>
            <span v-if="authStore && authStore.user" class="hidden sm:inline">{{ authStore.user.name }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-180': profileDropdownOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <!-- Profile Dropdown -->
          <transition name="dropdown">
            <div v-if="profileDropdownOpen" class="absolute right-0 mt-2 w-56 bg-dark/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in-up">
              <div class="p-3 border-b border-white/10">
                <div class="flex items-center gap-3">
                  <div v-if="avatarUrl" class="w-10 h-10 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
                    <img :src="avatarUrl" alt="Profile" class="w-full h-full object-cover" />
                  </div>
                  <div v-else class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 text-white font-bold">
                    {{ profileInitials }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-white font-medium truncate">{{ authStore?.user?.name || 'boniq' }}</p>
                    <p class="text-xs text-slate-400 truncate">{{ authStore?.user?.email || 'admin@system' }}</p>
                  </div>
                </div>
              </div>
              
              <div class="p-2 space-y-1">
                <router-link 
                  v-if="authStore && authStore.user" 
                  to="/admin/dashboard" 
                  class="dropdown-item flex items-center gap-3 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                  @click="profileDropdownOpen = false"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                  <span>Admin Dashboard</span>
                </router-link>
                
                <router-link 
                  v-if="(!authStore || !authStore.user)" 
                  to="/admin" 
                  class="dropdown-item flex items-center gap-3 px-3 py-2 rounded-xl text-accent hover:bg-accent/10 transition-all"
                  @click="profileDropdownOpen = false"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <span>Admin Login</span>
                </router-link>
                
                <hr class="border-white/10 my-2" v-if="authStore && authStore.user" />
                
                <button 
                  v-if="authStore && authStore.user"
                  @click="handleLogout" 
                  class="dropdown-item flex items-center gap-3 w-full px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000.svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </transition>
        </div>
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
        <router-link v-if="authStore && authStore.user" to="/admin/dashboard" class="mobile-nav-link text-accent" @click="mobileMenuOpen = false">Admin Dashboard</router-link>
        <router-link v-if="(!authStore || !authStore.user)" to="/admin" class="mobile-nav-link text-accent border-accent/20" @click="mobileMenuOpen = false">Admin Login</router-link>
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
const profileDropdownOpen = ref(false);
const profileDropdownRef = ref(null);

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

const toggleProfileDropdown = () => {
  profileDropdownOpen.value = !profileDropdownOpen.value;
};

const closeProfileDropdown = (e) => {
  if (profileDropdownRef.value && !profileDropdownRef.value.contains(e.target)) {
    profileDropdownOpen.value = false;
  }
};

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', closeProfileDropdown);
  
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
  document.removeEventListener('click', closeProfileDropdown);
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

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.dropdown-item {
  @apply text-sm;
}

.dropdown-item svg {
  @apply flex-shrink-0;
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
