<template>
  <div class="rounded-2xl border border-white/10 bg-black/20 p-5 transition-all hover:border-white/20 hover:bg-white/5">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <h4 class="text-lg font-bold text-white truncate">{{ edu.degree }}</h4>
          <span v-if="edu.current" class="rounded-full border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">Current</span>
          <span v-else-if="edu.published" class="rounded-full border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">Published</span>
          <span v-else class="rounded-full border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">Draft</span>
        </div>
        <div class="mt-1 text-sm font-semibold text-emerald-300">{{ edu.institution }}</div>
        <div v-if="edu.location" class="text-xs text-slate-500">{{ edu.location }}</div>
        <div class="mt-1 text-xs text-slate-500">
          {{ formatDate(edu.startDate) }} – {{ edu.current ? 'Present' : formatDate(edu.endDate) }}
        </div>
        <div v-if="edu.grade" class="mt-2 text-sm text-slate-400">{{ edu.grade }}</div>
        <p v-if="edu.description" class="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">{{ edu.description }}</p>
      </div>
      <div class="flex flex-wrap gap-2 sm:ml-4">
        <button @click="$emit('edit', edu)" class="btn-sm btn-sm-secondary">Edit</button>
        <button @click="$emit('delete', edu._id)" class="btn-sm btn-sm-red">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ edu: Object });
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