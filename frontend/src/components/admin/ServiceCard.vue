<template>
  <div class="rounded-2xl border border-white/10 bg-black/20 p-5 transition-all hover:border-white/20 hover:bg-white/5">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <h4 class="text-lg font-bold text-white truncate">{{ service.title }}</h4>
          <span v-if="service.published" class="rounded-full border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">Published</span>
          <span v-else class="rounded-full border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">Draft</span>
        </div>
        <div v-if="service.icon" class="mt-1 text-2xl">{{ service.icon }}</div>
        <p v-if="service.description" class="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{{ service.description }}</p>
        <div v-if="service.features?.length" class="mt-3 space-y-1">
          <span v-for="feat in service.features" :key="feat" class="block px-2 py-1 text-xs bg-purple-500/10 text-purple-300 rounded border border-purple-500/20">• {{ feat }}</span>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 sm:ml-4">
        <button @click="$emit('edit', service)" class="btn-sm btn-sm-secondary">Edit</button>
        <button @click="$emit('delete', service._id)" class="btn-sm btn-sm-red">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ service: Object });
defineEmits(['edit', 'delete']);
</script>

<style scoped>
.btn-sm { @apply px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors; }
.btn-sm-secondary { @apply border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white; }
.btn-sm-red { @apply border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white; }
</style>