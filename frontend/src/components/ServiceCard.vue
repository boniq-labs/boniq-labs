<template>
  <div class="glass-card p-6 rounded-2xl group hover:border-primary/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
    <div class="flex items-center gap-3 mb-4">
      <span class="text-3xl">{{ service.icon || '🛠️' }}</span>
      <h3 class="text-xl font-bold text-white">{{ service.title }}</h3>
    </div>
    <p class="text-slate-400 leading-relaxed mb-4">{{ service.description }}</p>
    <div v-if="service.features && service.features.length" class="space-y-2">
      <span v-for="feat in service.features" :key="feat" class="block px-3 py-1.5 text-sm bg-primary/10 text-primary border border-primary/20 rounded-full">{{ feat }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  service: Object,
});
</script>