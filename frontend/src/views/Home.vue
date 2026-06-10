<template>
  <div class="home flex flex-col justify-center py-12 lg:py-20 min-h-[calc(100vh-140px)]">
    <section class="hero flex-grow flex items-center justify-center px-4">
      <div v-if="loading" class="flex items-center justify-center h-64">
        <div class="relative w-14 h-14">
          <div class="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div class="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
      </div>
      
      <div v-else class="container max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div class="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10 animate-fade-in-up">
          <div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-lg backdrop-blur-md mb-8 text-sm font-semibold tracking-wide text-accent uppercase">
             <span class="relative flex h-2.5 w-2.5">
               <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
               <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent shadow-[0_0_10px_rgba(56,189,248,0.8)]"></span>
             </span>
             Welcome to the boniq universe
          </div>
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-4 leading-[1.1] text-white drop-shadow-md">
            <span class="inline-block bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">{{ profile.greeting || "Hi, I'm" }}</span><br/>
            <span class="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent animate-gradient-x filter drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              {{ profile.name || "boniq" }}
            </span>
          </h1>
          <h2 class="text-2xl md:text-3xl text-slate-200 font-bold mb-6 tracking-tight">
            {{ profile.role || "Full-Stack Software Engineer" }}
            <span class="inline-block w-1 h-8 ml-1 bg-accent animate-pulse"></span>
          </h2>
          <p class="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed font-light">
            {{ profile.bio || "I craft immersive, high-performance web applications that merge stunning design with robust functionality. Code is my canvas, and innovation is my drive." }}
          </p>
          <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
            <router-link to="/projects" class="group relative px-8 py-4 bg-gradient-to-r from-primary to-blue-600 rounded-full text-white font-bold shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex items-center gap-3">
              <span class="relative z-10">View My Work</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 relative z-10 group-hover:translate-x-1.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </router-link>
            <router-link to="/contact" class="px-8 py-4 rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-sm text-white font-bold hover:bg-white/10 hover:border-primary/50 shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 group">
              Let's Talk
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </router-link>
          </div>
        </div>
        
        <div class="lg:w-1/2 relative flex justify-center mt-12 lg:mt-0 animate-fade-in-up flex-shrink-0" style="animation-delay: 0.2s">
          <div class="relative w-[340px] h-[340px] md:w-[460px] md:h-[460px]">
            <!-- Animated decorative rings -->
            <div class="absolute inset-0 rounded-full border border-primary/20 bg-gradient-to-tr from-primary/5 to-transparent animate-spin-slow" style="animation-duration: 30s;"></div>
            <div class="absolute inset-[18px] rounded-full border border-dashed border-accent/20 animate-spin-slow" style="animation-duration: 25s; animation-direction: reverse;"></div>
            <div class="absolute inset-[36px] rounded-full border border-white/[0.06] animate-pulse" style="animation-duration: 5s;"></div>
            <div class="absolute inset-[54px] rounded-full bg-gradient-to-bl from-secondary/5 to-transparent animate-spin-slow" style="animation-duration: 20s;"></div>
            
            <!-- Avatar / Graphic -->
            <div @click="handleProfileClick" class="absolute inset-[72px] rounded-full flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/30 via-purple-500/15 to-transparent backdrop-blur-xl border border-white/20 shadow-[0_0_80px_rgba(139,92,246,0.3)] hover:shadow-[0_0_120px_rgba(139,92,246,0.5)] transition-all duration-700 hover:scale-105 group cursor-pointer">
              <img v-if="profile.avatarUrl" :src="profile.avatarUrl" alt="Profile" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <span v-else class="text-[100px] md:text-[140px] filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 select-none">👨‍💻</span>
              <div class="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <!-- Floating badges with glass morphism -->
            <div class="absolute top-8 -left-2 px-4 py-3 rounded-2xl flex items-center gap-3 animate-float shadow-xl border border-white/10 bg-white/10 backdrop-blur-xl z-20 hover:scale-105 transition-transform cursor-default" style="animation-delay: 0s;">
              <span class="text-xl drop-shadow-md">⚛️</span>
              <span class="font-bold text-sm text-white">React/Vue</span>
            </div>
            <div class="absolute bottom-20 -right-2 px-4 py-3 rounded-2xl flex items-center gap-3 animate-float shadow-xl border border-white/10 bg-white/10 backdrop-blur-xl z-20 hover:scale-105 transition-transform cursor-default" style="animation-delay: 1.5s;">
              <span class="text-xl drop-shadow-md">🚀</span>
              <span class="font-bold text-sm text-white">Node.js</span>
            </div>
            <div class="absolute top-1/2 -left-4 px-4 py-3 rounded-2xl flex items-center gap-3 animate-float shadow-xl border border-white/10 bg-white/10 backdrop-blur-xl z-20 hover:scale-105 transition-transform cursor-default" style="animation-delay: 3s;">
              <span class="text-xl drop-shadow-md">🎨</span>
              <span class="font-bold text-sm text-white">UI/UX</span>
            </div>
          </div>
          
          <!-- Social Links -->
          <div class="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex justify-center gap-4 z-30">
             <a v-if="profile.whatsapp" :href="getWhatsAppUrl(profile.whatsapp)" target="_blank" class="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-green-400 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 shadow-lg group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
             </a>
             <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" class="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-blue-400 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 shadow-lg group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
             </a>
             <a v-if="profile.instagram" :href="profile.instagram" target="_blank" class="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md flex items-center justify-center text-slate-300 hover:text-pink-400 hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300 shadow-lg group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
             </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const profileClicks = ref(0);
const loading = ref(true);
const profile = ref({
  name: '',
  greeting: '',
  role: '',
  bio: '',
  avatarUrl: '',
  cvUrl: ''
});

let clickTimeout = null;

const getWhatsAppUrl = (value) => {
  if (!value) return '#';
  return value.startsWith('http') ? value : `https://wa.me/${value}`;
};

const handleProfileClick = () => {
  profileClicks.value++;
  if (profileClicks.value >= 4) {
    router.push('/admin');
  } else if (profileClicks.value === 3) {
    console.log('Almost there... one more click!');
  }
  clearTimeout(clickTimeout);
  clickTimeout = setTimeout(() => {
    profileClicks.value = 0;
  }, 1000);
};

onMounted(async () => {
  try {
    const res = await axios.get('/api/profile');
    if (res.data) {
      profile.value = res.data;
    }
  } catch (err) {
    console.error('Error fetching profile', err);
  } finally {
    loading.value = false;
  }
  try {
    await axios.post('/api/stats/visit');
  } catch(e) {
    console.error('Could not log visit', e);
  }
});
</script>

<style scoped>
.animate-spin-slow {
  animation: spin linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradientShift 4s ease infinite;
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
