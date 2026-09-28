<template>
  <div class="flex flex-col gap-2">
    <label class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
      <span class="text-lg">{{ icon }}</span>
      {{ label }}
    </label>
    <input v-model="modelValue" type="url" class="input-field" :placeholder="placeholder" />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  icon: String,
});
defineEmits(['update:modelValue']);

const inputField = computed({
  get: () => modelValue,
  set: (val) => $emit('update:modelValue', val),
});
</script>

<style scoped>
.input-field {
  @apply w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary;
}
</style>