<template>
  <div class="flex flex-col gap-2" :class="{ 'md:col-span-2': fullWidth }">
    <label v-if="label" class="text-sm font-semibold text-slate-300">{{ label }}</label>
    <slot />
    <p v-if="hint" class="mt-1 text-xs text-slate-500">{{ hint }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  hint: String,
  fullWidth: Boolean,
  required: Boolean,
});
</script>