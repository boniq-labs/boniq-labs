<template>
  <a :href="social.url" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-primary hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group">
    <span class="text-lg">{{ social.icon }}</span>
    <span class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{{ social.name }}</span>
  </a>
</template>

<script setup>
defineProps({
  social: Object,
});
</script>