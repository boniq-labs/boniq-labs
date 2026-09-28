<template>
  <button 
    @click="$emit('click')"
    class="group rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/5 hover:shadow-lg hover:shadow-black/30"
    :class="colorClass"
  >
    <div class="flex items-center gap-2">
      <span class="text-2xl">{{ icon }}</span>
      <div class="text-xs uppercase tracking-wider text-slate-400">{{ label }}</div>
    </div>
    <div class="mt-3 text-lg font-bold text-white transition duration-300 group-hover:scale-105">{{ value }}</div>
    <div class="mt-1 text-sm text-slate-400">{{ desc }}</div>
  </button>
</template>

<script setup>
defineProps({
  label: String,
  value: String,
  desc: String,
  icon: String,
  color: String,
});

const colorClasses = {
  sky: 'border-sky-500/30 hover:border-sky-500/50 hover:bg-sky-500/10',
  cyan: 'border-cyan-500/30 hover:border-cyan-500/50 hover:bg-cyan-500/10',
  violet: 'border-violet-500/30 hover:border-violet-500/50 hover:bg-violet-500/10',
  amber: 'border-amber-500/30 hover:border-amber-500/50 hover:bg-amber-500/10',
  purple: 'border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/10',
};

const colorClass = computed(() => colorClasses[color] || '');
</script>