<template>
  <div class="mb-6 group">
    <div class="flex justify-between items-end mb-2">
      <span class="font-medium text-white group-hover:text-primary transition-colors flex items-center gap-2">
        <span class="text-xl">{{ getRandomEmoji(skill.name) }}</span>
        {{ skill.name }}
      </span>
      <span class="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{{ skill.level }}%</span>
    </div>
    <div class="w-full h-3 bg-slate-800/80 rounded-full overflow-hidden border border-white/5 shadow-inner">
      <div 
        class="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out relative"
        :style="{ width: animateWidth ? `${skill.level}%` : '0%' }"
      >
        <div class="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  skill: {
    type: Object,
    required: true
  }
});

const animateWidth = ref(false);

const emojis = ['🛠️', '⚙️', '⚡', '💡', '🔥', '🧩', '🚀', '🧠', '🌟'];
const getRandomEmoji = (name) => {
  const index = name ? name.length % emojis.length : 0;
  return emojis[index];
};

onMounted(() => {
  setTimeout(() => {
    animateWidth.value = true;
  }, 100);
});
</script>

<style scoped>
@keyframes progress {
  from { background-position: 1rem 0; }
  to { background-position: 0 0; }
}
</style>
