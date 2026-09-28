<template>
  <div class="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3">
    <div class="text-sm font-semibold text-white">{{ label }}</div>
    <span class="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider" :class="complete ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'">
      {{ complete ? 'Complete' : 'Missing' }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  complete: Boolean,
});
</script>