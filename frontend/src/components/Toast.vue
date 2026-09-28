<template>
  <div class="fixed bottom-6 right-6 z-[9999] flex animate-slide-in items-start gap-3 rounded-2xl border px-5 py-4 text-sm shadow-2xl backdrop-blur-2xl" :class="type === 'error' ? 'border-red-500/30 bg-red-500/20 text-red-200 shadow-red-500/20' : 'border-emerald-500/30 bg-emerald-500/20 text-emerald-200 shadow-emerald-500/20'">
    <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path v-if="type === 'error'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z" />
      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <div class="leading-6 font-semibold pr-4">{{ message }}</div>
    <button @click="$emit('close')" class="absolute right-3 top-3 text-white/40 hover:text-white transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'success' },
  message: String,
});
defineEmits(['close']);
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>