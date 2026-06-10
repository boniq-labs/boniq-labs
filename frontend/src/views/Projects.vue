<template>
  <div class="min-h-screen pt-24 pb-20 px-4">
    <div class="max-w-6xl mx-auto">
      <h2 class="section-title animate-fade-in-up">Projects Matrix</h2>
      
      <div class="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up" style="animation-delay: 0.1s;">
        <button 
          v-for="tech in allTechnologies" 
          :key="tech"
          @click="activeFilter = tech"
          :class="[
            'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-sm',
            activeFilter === tech 
              ? 'bg-primary/20 text-white border-primary shadow-[0_0_15px_rgba(139,92,246,0.5)]' 
              : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30 hover:text-white'
          ]"
        >
          {{ tech }}
        </button>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-4 border-slate-700"></div>
          <div class="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-center glass-card max-w-md mx-auto p-8 rounded-2xl border-red-500/30">
        <div class="text-red-400 text-6xl mb-4">⚠️</div>
        <h3 class="text-xl font-bold text-white mb-2">Oops! Let's pretend that worked.</h3>
        <p class="text-slate-400">{{ error }}</p>
      </div>
      
      <div v-else-if="filteredProjects.length === 0" class="text-center glass-card max-w-2xl mx-auto p-12 rounded-2xl animate-fade-in-up">
        <span class="text-6xl block mb-4">🔍</span>
        <h3 class="text-2xl font-bold text-white mb-2">No matches found</h3>
        <p class="text-slate-400">Try selecting a different technology filter.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <transition-group name="project-list">
          <div v-for="(project, index) in filteredProjects" :key="project._id || index" class="h-full">
            <ProjectCard :project="project" />
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard.vue';

const projects = ref([]);
const loading = ref(true);
const error = ref(null);
const activeFilter = ref('All');

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/projects');
    projects.value = data;
    loading.value = false;
  } catch (err) {
    // Generate fallback dummy data for demo purposes if backend isn't ready
    projects.value = [
      { _id: '1', title: 'Cosmic Analytics Dashboard', description: 'A futuristic data visualization dashboard using WebGL and real-time streaming data.', technologies: ['Vue.js', 'Three.js', 'Tailwind CSS'], liveUrl: '#', githubUrl: '#' },
      { _id: '2', title: 'Aura Social Network', description: 'A decentralized social platform with glassmorphism UI and end-to-end encryption built on blockchain.', technologies: ['React', 'Web3.js', 'Node.js'], liveUrl: '#', githubUrl: '#' },
      { _id: '3', title: 'Nexus E-Commerce', description: 'Headless e-commerce platform built for speed and seamless checkout experiences with Stripe integration.', technologies: ['Next.js', 'GraphQL', 'Stripe'], liveUrl: '#', githubUrl: '#' },
      { _id: '4', title: 'SynthWave Music Player', description: 'Web-based music player with audio visualization and a retro-futuristic aesthetic.', technologies: ['Vue.js', 'Web Audio API', 'Canvas'], liveUrl: '#', githubUrl: '#' },
      { _id: '5', title: 'Quantum Task Manager', description: 'Real-time collaborative task manager with AI task prioritization and team analytics.', technologies: ['React', 'Firebase', 'OpenAI'], liveUrl: '#', githubUrl: '#' }
    ];
    loading.value = false;
  }
});

const allTechnologies = computed(() => {
  const techs = new Set(['All']);
  projects.value.forEach(p => {
    if(p.technologies) {
      p.technologies.forEach(t => techs.add(t));
    }
  });
  return Array.from(techs);
});

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects.value;
  }
  return projects.value.filter(p => p.technologies && p.technologies.includes(activeFilter.value));
});
</script>

<style scoped>
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.5s ease;
}
.project-list-enter-from,
.project-list-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}
.project-list-leave-active {
  position: absolute;
}
</style>
