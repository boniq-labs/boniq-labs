<template>
  <div class="group relative overflow-hidden rounded-2xl border p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-black/30" :class="colorClass">
    <div class="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
    <div class="relative z-10">
      <div class="flex items-center gap-2">
        <span v-html="icon" class="text-lg"></span>
        <div class="text-xs font-semibold uppercase tracking-wider text-slate-400">{{ label }}</div>
      </div>
      <div class="mt-3 flex items-end justify-between gap-4">
        <div class="text-3xl font-black text-white transition duration-300 group-hover:scale-105">{{ value }}</div>
        <div class="rounded-xl border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-sm">{{ note }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number],
  note: String,
  icon: String,
  color: String,
});

const colorClasses = {
  emerald: 'border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent',
  sky: 'border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-transparent',
  cyan: 'border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent',
  amber: 'border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent',
  violet: 'border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-transparent',
};

const colorClass = computed(() => colorClasses[color] || '');
</script>