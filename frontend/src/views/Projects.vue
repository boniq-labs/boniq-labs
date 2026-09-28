<template>
  <div class="min-h-screen pt-24 pb-20 px-4 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <header class="text-center mb-16 animate-fade-in-up">
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold uppercase tracking-wider mb-6">Portfolio</span>
        <h2 class="section-title">Projects Matrix</h2>
        <p class="mt-4 max-w-2xl mx-auto text-slate-400 text-lg">A curated collection of my work spanning various domains and technologies</p>
      </header>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in-up" style="animation-delay: 0.1s;">
        <button 
          v-for="tech in allTechnologies" 
          :key="tech"
          @click="activeFilter = tech"
          :class="[
            'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-sm',
            activeFilter === tech 
              ? 'bg-gradient-to-r from-primary to-blue-600 text-white border-transparent shadow-[0_0_20px_rgba(139,92,246,0.4)]' 
              : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30 hover:text-white hover:bg-white/10'
          ]"
        >
          {{ tech }}
        </button>
      </div>

      <!-- Project Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in-up" style="animation-delay: 0.2s;">
        <StatCard label="Total Projects" :value="projects.length" icon="📦" color="cyan" />
        <StatCard label="Technologies" :value="allTechnologies.length - 1" icon="⚙️" color="violet" />
        <StatCard label="Featured" :value="featuredCount" icon="⭐" color="amber" />
        <StatCard label="Categories" :value="categories.length" icon="📂" color="emerald" />
      </div>

      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-4 border-slate-700"></div>
          <div class="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-center glass-card max-w-md mx-auto p-8 rounded-2xl border-red-500/30">
        <div class="text-red-400 text-6xl mb-4">⚠️</div>
        <h3 class="text-xl font-bold text-white mb-2">Failed to load projects</h3>
        <p class="text-slate-400">{{ error }}</p>
      </div>
      
      <div v-else-if="filteredProjects.length === 0" class="text-center glass-card max-w-2xl mx-auto p-12 rounded-2xl animate-fade-in-up">
        <span class="text-6xl block mb-4">🔍</span>
        <h3 class="text-2xl font-bold text-white mb-2">No matches found</h3>
        <p class="text-slate-400">Try selecting a different technology filter.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <transition-group name="project-list" tag="div">
          <div v-for="(project, index) in filteredProjects" :key="project._id || index" class="h-full">
            <ProjectCard :project="project" :index="index" />
          </div>
        </transition-group>
      </div>

      <!-- Pagination / Load More placeholder -->
      <div v-if="filteredProjects.length > 9" class="mt-12 text-center animate-fade-in-up">
        <button class="btn-outline px-8 py-3" @click="loadMore">
          <span class="flex items-center justify-center gap-2">
            Load More Projects
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/api/api';
import ProjectCard from '../components/ProjectCard.vue';

const projects = ref([]);
const loading = ref(true);
const error = ref(null);
const activeFilter = ref('All');
const displayedCount = ref(9);

const StatCard = {
  template: `
    <div class="glass-card p-4 rounded-xl text-center group hover:border-primary/30 hover:bg-white/10 transition-all">
      <span class="text-2xl">{{ icon }}</span>
      <p class="mt-2 text-3xl font-black text-white">{{ value }}</p>
      <p class="text-xs text-slate-500 uppercase tracking-wider">{{ label }}</p>
    </div>
  `,
  props: ['label', 'value', 'icon', 'color']
}

onMounted(async () => {
  try {
    const { data } = await api.get('/api/projects');
    projects.value = data;
    loading.value = false;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load projects. Please check your connection.';
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

const categories = computed(() => {
  const cats = new Set();
  projects.value.forEach(p => {
    if(p.category) cats.add(p.category);
  });
  return Array.from(cats);
});

const featuredCount = computed(() => projects.value.filter(p => p.featured).length);

const filteredProjects = computed(() => {
  let result = projects.value;
  if (activeFilter.value !== 'All') {
    result = result.filter(p => p.technologies && p.technologies.includes(activeFilter.value));
  }
  return result.slice(0, displayedCount.value);
});

const loadMore = () => {
  displayedCount.value += 6;
};
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

.btn-outline {
  @apply inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-8 py-3 text-white font-bold hover:bg-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1;
}
</style>