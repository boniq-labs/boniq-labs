<template>
  <div class="rounded-2xl border border-white/10 bg-black/20 p-5 transition-all hover:border-white/20 hover:bg-white/5">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <h4 class="text-lg font-bold text-white truncate">{{ exp.title }}</h4>
          <span v-if="exp.current" class="rounded-full border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">Current</span>
          <span v-else-if="exp.published" class="rounded-full border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">Published</span>
          <span v-else class="rounded-full border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">Draft</span>
        </div>
        <div class="mt-1 text-sm font-semibold text-cyan-300">{{ exp.company }}</div>
        <div v-if="exp.location" class="text-xs text-slate-500">{{ exp.location }}</div>
        <div class="mt-1 text-xs text-slate-500">
          {{ formatDate(exp.startDate) }} – {{ exp.current ? 'Present' : formatDate(exp.endDate) }}
        </div>
        <p v-if="exp.description" class="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">{{ exp.description }}</p>
        <div v-if="exp.technologies?.length" class="mt-3 flex flex-wrap gap-1.5">
          <span v-for="tech in exp.technologies" :key="tech" class="px-2 py-0.5 text-[10px] font-medium bg-primary/10 text-primary border border-primary/20 rounded-full">{{ tech }}</span>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 sm:ml-4">
        <button @click="$emit('edit', exp)" class="btn-sm btn-sm-secondary">Edit</button>
        <button @click="$emit('delete', exp._id)" class="btn-sm btn-sm-red">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ exp: Object });
defineEmits(['edit', 'delete']);

const formatDate = (val) => {
  if (!val) return '';
  const d = new Date(val);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};
</script>

<style scoped>
.btn-sm { @apply px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors; }
.btn-sm-secondary { @apply border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white; }
.btn-sm-red { @apply border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white; }
</style>