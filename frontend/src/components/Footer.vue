<template>
  <footer class="mt-auto relative z-10 bg-black/40 backdrop-blur-3xl border-t border-white/10 pt-16 pb-8 overflow-hidden">
    <div class="absolute top-0 left-1/4 w-96 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-[200px] bg-accent/5 rounded-full blur-[80px] pointer-events-none"></div>

    <div class="container max-w-6xl mx-auto px-4 relative z-10">
      <div class="flex flex-col items-center text-center">
        <router-link to="/" class="inline-flex items-center gap-3 mb-8 group relative">
          <div v-if="logoUrl" class="relative flex items-center justify-center p-2 rounded-2xl bg-white/[0.03] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-xl group-hover:bg-white/[0.08] group-hover:border-white/20 transition-all duration-500 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img :src="logoUrl" class="h-10 md:h-12 w-auto relative z-10 transition-all duration-700 group-hover:scale-110 drop-shadow-md group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" alt="Logo" />
          </div>
          <span v-else class="text-4xl font-display font-extrabold tracking-tight relative">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent group-hover:from-blue-400 group-hover:to-purple-400 transition-all drop-shadow-lg relative z-10">boniq</span>
            <span class="absolute -inset-4 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full pointer-events-none"></span>
          </span>
        </router-link>
        <h2 class="text-3xl md:text-4xl font-display font-extrabold text-white mb-4 tracking-tight">
          Ready to build something <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">amazing?</span>
        </h2>
        <p class="text-slate-400 mb-8 max-w-lg mx-auto text-lg">
          Let's collaborate on your next project and bring your visionary ideas to life.
        </p>
        
        <router-link to="/contact" class="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 hover:-translate-y-1 mb-16 inline-flex items-center gap-2 overflow-hidden">
          <span class="relative z-10">Start a Conversation</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </router-link>
      </div>
      
      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-slate-500 text-sm font-medium flex items-center gap-2">
          <span>&copy; {{ new Date().getFullYear() }} boniq. All Rights Reserved.</span>
          <span class="w-1 h-1 rounded-full bg-slate-700"></span>
          <span>Crafted with Vue.</span>
        </div>
        
        <div class="text-slate-500 text-sm">
          Aesthetically Designed Digital Experience.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/api';

const logoUrl = ref(localStorage.getItem('boniq_logo') || null);

onMounted(async () => {
  if (!logoUrl.value) {
    try {
      const res = await api.get('/api/profile');
      if (res.data?.logoUrl) {
        logoUrl.value = res.data.logoUrl;
        localStorage.setItem('boniq_logo', res.data.logoUrl);
      }
    } catch (e) {}
  }
});
</script>
