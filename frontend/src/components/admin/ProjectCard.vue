<template>
  <div class="overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition-all hover:border-white/20 hover:bg-white/5">
    <div class="relative h-40 overflow-hidden bg-slate-800">
      <img v-if="project.imageUrl" :src="project.imageUrl" :alt="project.title" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-4xl font-bold text-white/40">
        📦
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div class="absolute bottom-3 left-3 right-3">
        <div class="text-lg font-bold text-white truncate">{{ project.title }}</div>
      </div>
      <div class="absolute top-3 right-3 flex gap-1">
        <span v-if="project.featured" class="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">★ Featured</span>
        <span v-if="project.published === false" class="px-2 py-0.5 text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">Draft</span>
      </div>
    </div>
    <div class="p-4">
      <p class="text-sm leading-6 text-slate-400 line-clamp-2">{{ project.description }}</p>
      <div class="mt-3 flex flex-wrap gap-1.5">
        <span v-for="tech in (project.technologies || []).slice(0, 4)" :key="tech" class="px-2 py-0.5 text-[10px] font-medium bg-primary/10 text-primary border border-primary/20 rounded-full">{{ tech }}</span>
        <span v-if="project.technologies?.length > 4" class="px-2 py-0.5 text-[10px] font-medium bg-white/10 text-white/50 border border-white/20 rounded-full">+{{ project.technologies.length - 4 }}</span>
      </div>
      <div class="mt-4 flex flex-wrap gap-2">
        <button @click="$emit('edit', project)" class="btn-sm btn-sm-secondary flex-1 sm:auto">Edit</button>
        <button @click="$emit('delete', project._id)" class="btn-sm btn-sm-red flex-1 sm:auto">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ project: Object });
defineEmits(['edit', 'delete']);
</script>

<style scoped>
.btn-sm { @apply px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors; }
.btn-sm-secondary { @apply border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white; }
.btn-sm-red { @apply border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white; }
</style>