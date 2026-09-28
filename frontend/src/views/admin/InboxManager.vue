<template>
  <div class="space-y-8 animate-fade-in">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <span class="badge badge-amber">Inbox Manager</span>
        <h1 class="mt-2 text-3xl font-display font-extrabold text-white">Message Control</h1>
        <p class="mt-1 text-sm text-slate-400">Review, organize, and manage incoming messages from the contact form.</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <div class="card-sm">
          <div class="text-xs uppercase tracking-wider text-slate-500">Unread</div>
          <div class="mt-1 text-2xl font-black text-white">{{ unreadCount }}</div>
        </div>
        <div class="card-sm">
          <div class="text-xs uppercase tracking-wider text-slate-500">Total</div>
          <div class="mt-1 text-2xl font-black text-white">{{ messages.length }}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <span class="badge badge-amber">Inbox Queue</span>
          <h3 class="mt-2 text-lg font-bold text-white">All Messages</h3>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row w-full sm:max-w-2xl">
          <input v-model="search" placeholder="Search by name, email, subject..." class="input-field flex-1" />
          <div class="flex rounded-xl border border-white/10 bg-slate-900/50 p-1">
            <button v-for="filter in filters" :key="filter" type="button" @click="activeFilter = filter" class="px-4 py-2 text-sm font-semibold rounded-lg transition" :class="activeFilter === filter ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'">{{ filter }}</button>
          </div>
        </div>
      </div>

      <div v-if="filteredMessages.length === 0" class="card-sm text-center text-slate-400 py-8">
        <div class="text-4xl mb-2">📬</div>
        <p>{{ search || activeFilter !== 'All' ? 'No messages match your filters.' : 'No messages received yet.' }}</p>
      </div>

      <div v-else class="space-y-4">
        <MessageRow 
          v-for="msg in filteredMessages" 
          :key="msg._id" 
          :message="msg" 
          @update="loadMessages"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted, watch } from 'vue';
import axios from 'axios';

const props = defineProps(['refreshKey']);
const showToast = inject('toast')?.show || (() => {});
const getAuthConfig = inject('auth')?.getAuthConfig || (() => ({}));

const messages = ref([]);
const search = ref('');
const activeFilter = ref('All');
const filters = ['All', 'Unread', 'Read'];

const filteredMessages = computed(() => {
  let result = messages.value;
  if (activeFilter.value === 'Unread') result = result.filter(m => !m.isRead);
  else if (activeFilter.value === 'Read') result = result.filter(m => m.isRead);
  if (search.value) {
    const q = search.value.toLowerCase();
    result = result.filter(m => 
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.content.toLowerCase().includes(q)
    );
  }
  return result;
});

const unreadCount = computed(() => messages.value.filter(m => !m.isRead).length);

const loadMessages = async () => {
  try {
    const res = await axios.get('/api/messages', getAuthConfig());
    messages.value = res.data || [];
  } catch (e) { showToast('error', 'Failed to load messages'); }
};

onMounted(() => loadMessages());
watch(() => props.refreshKey, loadMessages);
</script>

<style scoped>
.card { @apply rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl; }
.card-sm { @apply rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm; }
.badge { @apply inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider; }
.badge-amber { @apply border-amber-500/30 bg-amber-500/10 text-amber-300; }
.input-field { @apply w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary; }
MessageRow { @apply relative; }
</style>