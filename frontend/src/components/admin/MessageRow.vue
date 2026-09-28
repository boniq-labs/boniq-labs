<template>
  <div class="rounded-2xl border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:shadow-lg hover:shadow-black/30">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <h4 class="text-lg font-bold text-white truncate">{{ message.subject }}</h4>
          <span class="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider" :class="message.isRead ? 'border-white/10 bg-white/5 text-slate-400' : 'border-amber-500/30 bg-amber-500/10 text-amber-300'">
            {{ message.isRead ? 'Read' : 'Unread' }}
          </span>
        </div>
        <div class="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-300">
          <span>{{ message.name }}</span>
          <span class="text-slate-600">·</span>
          <a :href="`mailto:${message.email}`" class="text-cyan-300 hover:underline truncate">{{ message.email }}</span>
          <span v-if="message.createdAt" class="text-slate-500">{{ formatDate(message.createdAt) }}</span>
        </div>
        <p class="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-400">{{ message.content }}</p>
      </div>
      <div class="flex flex-wrap gap-2 sm:ml-4">
        <button @click="toggleRead" class="btn-action" :class="message.isRead ? 'btn-action-secondary' : 'btn-action-amber'">
          {{ message.isRead ? 'Mark Unread' : 'Mark Read' }}
        </button>
        <button @click="deleteMsg" class="btn-action btn-action-red">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: Object,
});
defineEmits(['update']);

const showToast = inject('toast')?.show || (() => {});
const getAuthConfig = inject('auth')?.getAuthConfig || (() => ({}));

const formatDate = (val) => {
  if (!val) return 'Unknown';
  return new Date(val).toLocaleString();
};

const toggleRead = async () => {
  try {
    await axios.put(`/api/messages/${message._id}`, { isRead: !message.isRead }, getAuthConfig());
    $emit('update');
    showToast('success', `Message marked as ${!message.isRead ? 'read' : 'unread'}`);
  } catch (e) { showToast('error', 'Failed to update'); }
};

const deleteMsg = async () => {
  if (!confirm('Delete this message?')) return;
  try {
    await axios.delete(`/api/messages/${message._id}`, getAuthConfig());
    $emit('update');
    showToast('success', 'Message deleted');
  } catch (e) { showToast('error', 'Failed to delete'); }
};
</script>

<style scoped>
.btn-action {
  @apply px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors;
}
.btn-action-amber { @apply border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500 hover:text-white; }
.btn-action-secondary { @apply border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white; }
.btn-action-red { @apply border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white; }
</style>