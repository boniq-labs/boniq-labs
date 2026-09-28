<template>
  <div class="group rounded-2xl border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-lg hover:shadow-black/30" :class="colorClass">
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span class="text-lg">{{ icon }}</span>
        <div class="text-sm font-semibold uppercase tracking-wider text-slate-500">{{ title }}</div>
      </div>
      <button @click="$emit('click')" class="text-xs font-semibold uppercase tracking-wider text-sky-300 hover:text-white transition">Manage →</button>
    </div>
    <div v-if="empty" class="mt-3 text-sm text-slate-400">No {{ title.toLowerCase() }} yet.</div>
    <div v-else class="mt-3 space-y-2">
      <div v-for="item in items" :key="item._id" class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition-all duration-200 hover:bg-white/10 hover:pl-4">
        <div class="font-semibold text-white text-sm">{{ item.title || item.name || item.degree || item.title }}</div>
        <div class="mt-1 text-xs text-slate-500">{{ formatDate(item.updatedAt || item.createdAt) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  items: Array,
  icon: String,
  color: String,
  empty: Boolean,
});

const colorClasses = {
  cyan: 'border-cyan-500/20 hover:border-cyan-500/30',
  violet: 'border-violet-500/20 hover:border-violet-500/30',
  sky: 'border-sky-500/20 hover:border-sky-500/30',
  emerald: 'border-emerald-500/20 hover:border-emerald-500/30',
  amber: 'border-amber-500/20 hover:border-amber-500/30',
};

const colorClass = computed(() => colorClasses[color] || '');

const formatDate = (val) => {
  if (!val) return 'Unknown';
  const d = new Date(val);
  return d.toLocaleDateString();
};
</script>