<template>
  <div class="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
    <span class="text-2xl">{{ icon }}</span>
    <div>
      <p class="text-2xl font-bold text-white">{{ value }}</p>
      <p class="text-xs text-slate-500 uppercase tracking-wider">{{ label }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: String,
  icon: String,
});
</script>