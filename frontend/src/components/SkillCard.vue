<template>
  <div class="glass-card p-6 rounded-2xl group hover:border-primary/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
    <div class="flex items-start justify-between gap-4 mb-4">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
          {{ getCategoryIcon(skill.category) }}
        </div>
        <div>
          <h3 class="font-bold text-white text-lg">{{ skill.name }}</h3>
          <span class="text-xs text-slate-500 uppercase tracking-wider">{{ skill.category }}</span>
        </div>
      </div>
      <div class="text-right">
        <span class="text-2xl font-black text-cyan-300">{{ skill.level }}%</span>
      </div>
    </div>
    
    <div class="h-2.5 overflow-hidden rounded-full bg-slate-800">
      <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 transition-all duration-1000 ease-out" :style="{ width: `${skill.level || 0}%` }"></div>
    </div>
    
    <div class="mt-4 flex items-center justify-between">
      <span class="text-xs text-slate-500">Proficiency</span>
      <div v-if="skill.icon" class="text-lg">{{ skill.icon }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  skill: Object,
});

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
</script>