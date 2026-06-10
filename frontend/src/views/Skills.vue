<template>
  <div class="min-h-screen pt-24 pb-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16 animate-fade-in-up">
        <h2 class="section-title">Technical Arsenal</h2>
        <p class="text-slate-400 max-w-2xl mx-auto text-lg">
          The tools and technologies I use to forge robust, scalable, and stunning digital experiences.
        </p>
      </div>
      
      <div v-if="loading" class="flex justify-center items-center py-20">
         <div class="flex space-x-2">
          <div class="w-4 h-4 bg-primary rounded-full animate-bounce" style="animation-delay: 0s"></div>
          <div class="w-4 h-4 bg-secondary rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
          <div class="w-4 h-4 bg-accent rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        </div>
      </div>
      
      <div v-else-if="error" class="text-center glass-card max-w-md mx-auto p-8 rounded-2xl border-red-500/30">
        <div class="text-red-400 text-5xl mb-4">⚠️</div>
        <p class="text-white">{{ error }}</p>
      </div>
      
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div v-for="(categorySkills, category, index) in skillsByCategory" :key="category" 
             class="glass-card p-8 rounded-2xl relative overflow-hidden group animate-fade-in-up" :style="{ animationDelay: `${index * 0.15}s` }">
          
          <div class="absolute top-0 right-0 p-8 opacity-5 transform translate-x-1/4 -translate-y-1/4 scale-150 rotate-12 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110 pointer-events-none">
            <span class="text-9xl">{{ getCategoryIcon(category) }}</span>
          </div>

          <div class="relative z-10">
            <h3 class="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-8 pb-4 border-b border-white/10 uppercase tracking-widest flex items-center gap-3">
              <span class="text-white">{{ getCategoryIcon(category) }}</span> {{ category }}
            </h3>
            
            <div class="space-y-6">
              <SkillBar v-for="skill in categorySkills" :key="skill._id || skill.name" :skill="skill" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import SkillBar from '../components/SkillBar.vue';

const skills = ref([]);
const loading = ref(true);
const error = ref(null);

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
    const { data } = await axios.get('/api/skills');
    skills.value = data;
    loading.value = false;
  } catch (err) {
    // Generate fallback data
    skills.value = [
      { name: 'Vue.js', category: 'Frontend', level: 95 },
      { name: 'React', category: 'Frontend', level: 85 },
      { name: 'Tailwind CSS', category: 'Frontend', level: 90 },
      { name: 'Node.js', category: 'Backend', level: 88 },
      { name: 'Express', category: 'Backend', level: 85 },
      { name: 'MongoDB', category: 'Database', level: 80 },
      { name: 'PostgreSQL', category: 'Database', level: 75 },
      { name: 'Git & GitHub', category: 'Tools', level: 90 },
      { name: 'Docker', category: 'DevOps', level: 70 }
    ];
    loading.value = false;
  }
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
    categories[cat].sort((a, b) => b.level - a.level);
  });
  
  return categories;
});
</script>
