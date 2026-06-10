<template>
  <div class="glass-card flex flex-col h-full group">
    <div class="relative h-56 w-full overflow-hidden bg-slate-800">
      <img v-if="project.imageUrl" :src="project.imageUrl" :alt="project.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 transition-transform duration-700 group-hover:scale-110">
        <span class="text-5xl opacity-50 group-hover:opacity-100 transition-opacity drop-shadow-2xl">
          {{ getRandomEmoji(project.title) }}
        </span>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80"></div>
    </div>
    
    <div class="flex-1 p-6 flex flex-col -mt-8 relative z-10">
      <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors drop-shadow-md">{{ project.title }}</h3>
      <p class="text-slate-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">{{ project.description }}</p>
      
      <div class="flex flex-wrap gap-2 mb-6">
        <span v-for="(tech, index) in project.technologies" :key="index" 
              class="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.1)]">
          {{ tech }}
        </span>
      </div>
      
      <div class="flex gap-4 mt-auto">
        <a :href="project.githubUrl || project.githubLink || '#'" target="_blank" rel="noopener noreferrer" 
           class="flex-1 py-2 text-center text-sm font-medium border border-slate-600 rounded-lg hover:border-white hover:text-white transition-all bg-white/5 backdrop-blur-sm">
          Source Code
        </a>
        <a :href="project.liveUrl || project.liveDemo || '#'" target="_blank" rel="noopener noreferrer" 
           class="flex-1 py-2 text-center text-sm font-medium bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white rounded-lg transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)]">
          Live Preview
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
});

const emojis = ['🚀', '⚡', '🔥', '💻', '🔮', '🌌', '✨', '💎'];
const getRandomEmoji = (title) => {
  // Use title length to consistently pick the same emoji for the same title
  const index = title ? title.length % emojis.length : 0;
  return emojis[index];
};
</script>
