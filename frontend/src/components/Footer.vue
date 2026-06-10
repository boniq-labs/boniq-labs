<template>
  <footer class="mt-auto relative z-10 bg-black/40 backdrop-blur-3xl border-t border-white/10 pt-16 pb-8 overflow-hidden">
    <div class="absolute top-0 left-1/4 w-96 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-[200px] bg-accent/5 rounded-full blur-[80px] pointer-events-none"></div>

    <div class="container max-w-6xl mx-auto px-4 relative z-10">
      <div class="flex flex-col items-center text-center">
        <router-link to="/" class="inline-flex items-center gap-2 mb-6">
          <img v-if="logoUrl" :src="logoUrl" class="h-8 w-auto" alt="boniq" />
          <span v-else class="text-3xl font-display font-extrabold"><span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">boniq</span></span>
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
import axios from 'axios';

const logoUrl = ref(localStorage.getItem('boniq_logo') || null);

onMounted(async () => {
  if (!logoUrl.value) {
    try {
      const res = await axios.get('/api/profile');
      if (res.data?.logoUrl) {
        logoUrl.value = res.data.logoUrl;
        localStorage.setItem('boniq_logo', res.data.logoUrl);
      }
    } catch (e) {}
  }
});
</script>
