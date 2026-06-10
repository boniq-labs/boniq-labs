<template>
  <div class="login-wrapper min-h-[calc(100vh-140px)] flex justify-center items-center px-4 relative overflow-hidden">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse pointer-events-none" style="animation-delay: 2s"></div>
    <div class="absolute top-1/2 right-1/3 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] animate-pulse pointer-events-none" style="animation-delay: 4s"></div>

    <div class="login-card w-full max-w-md relative z-10 animate-fade-in-up">
      <div class="backdrop-blur-2xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        
        <div class="text-center mb-8">
          <img v-if="logoUrl" :src="logoUrl" class="h-12 mx-auto mb-4" alt="boniq" />
          <div v-else class="w-16 h-16 mx-auto bg-gradient-to-tr from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 mb-4 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 class="text-3xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">Admin Portal</h2>
          <p class="text-slate-400 mt-2 text-sm font-medium tracking-wide">Enter credentials to access command center</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div class="form-group group">
            <label for="identifier" class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 group-focus-within:text-primary transition-colors">Username or Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <input
                type="text"
                id="identifier"
                v-model="identifier"
                required
                placeholder="admin or admin@system"
                class="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:bg-black/60 transition-all font-medium placeholder:text-slate-600"
                @keydown.enter="handleLogin"
              />
            </div>
          </div>
          
          <div class="form-group group">
            <label for="password" class="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 group-focus-within:text-accent transition-colors">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500 group-focus-within:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                class="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent focus:bg-black/60 transition-all font-medium placeholder:text-slate-600 tracking-widest"
                @keydown.enter="handleLogin"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors"
                tabindex="-1"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" v-model="rememberMe" class="w-4 h-4 rounded border-white/20 bg-black/30 accent-primary focus:ring-primary cursor-pointer" />
              <span class="text-xs text-slate-400 group-hover:text-white transition-colors">Remember me</span>
            </label>
            <button type="button" @click="showHint = !showHint" class="text-xs text-slate-500 hover:text-accent transition-colors flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Need help?
            </button>
          </div>

          <transition name="expand">
            <div v-if="showHint" class="p-4 bg-slate-900/80 border border-white/10 rounded-xl text-xs text-slate-400 space-y-2">
              <p><span class="text-primary font-semibold">Default admin:</span> Use <code class="text-accent bg-black/40 px-1.5 py-0.5 rounded">goxriddle</code> or <code class="text-accent bg-black/40 px-1.5 py-0.5 rounded">admin@system</code></p>
              <p><span class="text-primary font-semibold">Password:</span> <code class="text-accent bg-black/40 px-1.5 py-0.5 rounded">gutuza.24@</code></p>
              <p class="text-slate-500">Change these in your backend .env or initAdmin.js</p>
            </div>
          </transition>
          
          <div v-if="localError" class="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 animate-fade-in-up">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>
            <p class="text-red-400 text-sm font-medium">{{ localError }}</p>
          </div>
          
          <button type="submit" class="w-full py-4 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-bold text-lg shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group border border-white/10 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0" :disabled="authStore.loading">
            <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span class="relative z-10 flex items-center justify-center gap-2">
              <svg v-if="authStore.loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ authStore.loading ? 'Authenticating...' : 'Sign In to Dashboard' }}
            </span>
          </button>
        </form>
      </div>
      
      <div class="text-center mt-6 space-y-2">
        <router-link to="/" class="text-slate-500 hover:text-white text-sm font-medium inline-flex items-center gap-1 transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Portfolio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const identifier = ref('');
const password = ref('');
const showPassword = ref(false);
const showHint = ref(false);
const rememberMe = ref(false);
const localError = ref(null);
const logoUrl = ref(localStorage.getItem('boniq_logo') || null);

onMounted(() => {
  if (authStore.error) {
    authStore.error = null;
  }
  const saved = localStorage.getItem('boniq_remember');
  if (saved) {
    identifier.value = saved;
    rememberMe.value = true;
  }
});

const handleLogin = async () => {
  localError.value = null;
  if (!identifier.value.trim() || !password.value) {
    localError.value = 'Please enter both username/email and password.';
    return;
  }
  const success = await authStore.login(identifier.value, password.value);
  if (success) {
    if (rememberMe.value) {
      localStorage.setItem('boniq_remember', identifier.value);
    } else {
      localStorage.removeItem('boniq_remember');
    }
    router.push('/admin/dashboard');
  } else {
    localError.value = authStore.error || 'Invalid credentials. Please try again.';
  }
};
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 200px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px #1a1a2e inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
