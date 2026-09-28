<template>
  <div class="glass-card p-6 rounded-2xl text-center group hover:border-primary/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
    <span class="text-3xl mb-3 block">{{ icon }}</span>
    <h3 class="text-lg font-bold text-white mb-2">{{ title }}</h3>
    <p class="text-slate-400 text-sm">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  description: String,
});
</script>