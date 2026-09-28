<template>
  <div class="rounded-2xl border border-white/10 bg-black/20 p-5 transition-all hover:border-white/20 hover:bg-white/5">
    <div class="flex items-start justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
          <img v-if="isImage(skill.icon)" :src="skill.icon" class="w-9 h-9 object-contain" />
          <span v-else class="text-2xl font-bold text-white">{{ skill.icon || '⚡' }}</span>
        </div>
        <div>
          <div class="font-bold text-white">{{ skill.name }}</div>
          <div class="text-xs uppercase tracking-wider text-slate-500">{{ skill.category }}</div>
        </div>
      </div>
      <div class="text-right">
        <div class="text-lg font-black text-cyan-300">{{ skill.level }}%</div>
      </div>
    </div>
    <div class="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
      <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500" :style="{ width: `${skill.level || 0}%` }"></div>
    </div>
    <div class="mt-4 flex flex-wrap gap-2">
      <button @click="$emit('edit', skill)" class="btn-sm btn-sm-secondary">Edit</button>
      <button @click="$emit('delete', skill._id)" class="btn-sm btn-sm-red">Delete</button>
    </div>
  </div>
</template>

<script setup>
defineProps({ skill: Object });
defineEmits(['edit', 'delete']);

const isImage = (val) => typeof val === 'string' && (val.startsWith('http') || val.startsWith('/'));
</script>

<style scoped>
.btn-sm { @apply px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors; }
.btn-sm-secondary { @apply border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white; }
.btn-sm-red { @apply border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white; }
</style>