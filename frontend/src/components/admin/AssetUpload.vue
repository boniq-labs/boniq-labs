<template>
  <div class="flex flex-col gap-2">
    <label class="text-sm font-semibold text-slate-300">{{ label }}</label>
    <div class="flex items-center gap-4">
      <div v-if="url" class="preview">
        <img :src="url" alt="Preview" />
      </div>
      <div v-else class="preview placeholder">?</div>
      <div class="flex-1">
        <label class="btn-upload" :data-type="type">
          <input type="file" :accept="accept" class="absolute inset-0 cursor-pointer opacity-0" @change="$emit('upload', $event)" />
          <span v-if="uploading" class="flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>Uploading...</span>
          <span v-else>Upload {{ label }}</span>
        </label>
        <button v-if="url" type="button" @click="$emit('remove')" class="ml-2 text-xs text-red-400 hover:text-red-300">Remove</button>
      </div>
    </div>
    <p class="text-xs text-slate-500">{{ help }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  url: String,
  uploading: Boolean,
  accept: { type: String, default: 'image/*' },
  help: String,
  type: String,
});
defineEmits(['upload', 'remove']);
</script>

<style scoped>
.preview {
  @apply flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 flex-shrink-0;
}
.preview img { @apply h-full w-full object-contain; }
.placeholder { @apply text-3xl font-bold text-white/40; }
.btn-upload {
  @apply relative inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 cursor-pointer;
}
.btn-upload input:disabled + span { @apply opacity-50 cursor-not-allowed; }
</style>