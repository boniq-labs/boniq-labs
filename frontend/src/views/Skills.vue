<template>
  <div class="min-h-screen pt-24 pb-20 px-4 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <header class="text-center mb-16 animate-fade-in-up">
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold uppercase tracking-wider mb-6">Technical Arsenal</span>
        <h2 class="section-title">Technical Arsenal</h2>
        <p class="mt-4 max-w-2xl mx-auto text-slate-400 text-lg">The tools and technologies I use to forge robust, scalable, and stunning digital experiences</p>
      </header>

      <!-- Skills Overview Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in-up">
        <StatCard label="Total Skills" :value="skills.length" icon="⚡" color="cyan" />
        <StatCard label="Categories" :value="categoryCount" icon="📂" color="violet" />
        <StatCard label="Avg Proficiency" :value="avgLevel + '%'" icon="📊" color="amber" />
        <StatCard label="Top Skill" :value="topSkill?.name || '-'" icon="🏆" color="emerald" />
      </div>

      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-4 border-slate-700"></div>
          <div class="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-center glass-card max-w-md mx-auto p-8 rounded-2xl border-red-500/30">
        <div class="text-red-400 text-5xl mb-4">⚠️</div>
        <p class="text-white">{{ error }}</p>
      </div>
      
      <div v-else class="space-y-8">
        <!-- Category Tabs -->
        <div class="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in-up">
          <button 
            v-for="cat in allCategories" 
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-sm',
              activeCategory === cat 
                ? 'bg-gradient-to-r from-primary to-blue-600 text-white border-transparent shadow-[0_0_20px_rgba(139,92,246,0.4)]' 
                : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30 hover:text-white hover:bg-white/10'
            ]"
          >
            <span class="flex items-center gap-2">
              <span>{{ getCategoryIcon(cat) }}</span>
              {{ cat }}
            </span>
          </button>
        </div>

        <!-- Skills Grid -->
        <div v-if="filteredSkills.length === 0" class="text-center glass-card max-w-2xl mx-auto p-12 rounded-2xl animate-fade-in-up">
          <span class="text-6xl block mb-4">🔍</span>
          <h3 class="text-2xl font-bold text-white mb-2">No skills found</h3>
          <p class="text-slate-400">Try selecting a different category.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkillCard 
            v-for="skill in filteredSkills" 
            :key="skill._id || skill.name" 
            :skill="skill" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '@/api/api';

const skills = ref([]);
const loading = ref(true);
const error = ref(null);
const activeCategory = ref('All');

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

const getCategoryIcon = (category) => {
  const icons = {
    'Frontend': '🎨',
    'Backend': '⚙️',
    'Database': '🗄️',
    'Tools': '🛠️',
    'DevOps': '🚀',
    'Other': '🧩'
  };
  return icons[category] || '💡';
};

onMounted(async () => {
  try {
    const { data } = await api.get('/api/skills');
    skills.value = data;
    loading.value = false;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load skills. Please check your connection.';
    loading.value = false;
  }
});

const allCategories = computed(() => {
  const cats = new Set(['All']);
  skills.value.forEach(s => cats.add(s.category));
  return Array.from(cats);
});

const categoryCount = computed(() => allCategories.value.length - 1);

const avgLevel = computed(() => {
  if (skills.value.length === 0) return 0;
  const sum = skills.value.reduce((acc, s) => acc + (s.level || 0), 0);
  return Math.round(sum / skills.value.length);
});

const topSkill = computed(() => {
  if (skills.value.length === 0) return null;
  return [...skills.value].sort((a, b) => (b.level || 0) - (a.level || 0))[0];
});

const filteredSkills = computed(() => {
  if (activeCategory.value === 'All') return skills.value;
  return skills.value.filter(s => s.category === activeCategory.value);
});

const skillsByCategory = computed(() => {
  const categories = {};
  skills.value.forEach(skill => {
    if (!categories[skill.category]) {
      categories[skill.category] = [];
    }
    categories[skill.category].push(skill);
  });
  
  Object.keys(categories).forEach(cat => {
    categories[cat].sort((a, b) => (b.level || 0) - (a.level || 0));
  });
  
  return categories;
});
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.glass-card {
  @apply rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl;
}
</style>