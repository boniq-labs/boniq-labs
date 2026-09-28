<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-display font-extrabold text-white">Dashboard</h1>
        <p class="mt-1 text-sm text-slate-400">Manage your portfolio content, traffic, and inbox from one place.</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <button @click="$emit('refresh')" :disabled="loading" class="btn-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" :class="loading ? 'animate-spin' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h5M20 20v-5h-5M5.636 18.364A9 9 0 103.34 9.34M18.364 5.636A9 9 0 0120.66 14.66" /></svg>
          Refresh
        </button>
        <a href="/" target="_blank" rel="noopener noreferrer" class="btn-outline">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          Preview Site
        </a>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        v-for="stat in stats" 
        :key="stat.key" 
        :label="stat.label" 
        :value="stat.value" 
        :note="stat.note" 
        :icon="stat.icon" 
        :color="stat.color" 
      />
    </div>

    <!-- Quick Actions & Recent Content -->
    <div class="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
      <div class="card">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span class="badge badge-emerald">Workspace Status</span>
            <h2 class="mt-2 text-xl font-bold text-white">Operational Summary</h2>
            <p class="mt-1 text-sm text-slate-400">Profile completion, inbound communication, and content inventory at a glance.</p>
          </div>
          <div class="card-sm text-right">
            <div class="text-xs uppercase tracking-wider text-slate-500">Profile Completion</div>
            <div class="mt-1 text-3xl font-black text-white">{{ profileCompletion }}%</div>
          </div>
        </div>
        <div class="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
          <div class="h-full rounded-full bg-gradient-to-r from-primary via-blue-500 to-cyan-400 transition-all duration-700" :style="{ width: `${profileCompletion}%` }"></div>
        </div>
        <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActionCard 
            v-for="action in quickActions" 
            :key="action.tab" 
            :icon="action.icon" 
            :label="action.label" 
            :value="action.value" 
            :desc="action.desc" 
            :color="action.color" 
            @click="$emit('navigate', action.tab)"
          />
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <span class="badge badge-purple">Quick Actions</span>
            <h3 class="mt-2 text-lg font-bold text-white">Jump straight into work</h3>
          </div>
        </div>
        <div class="mt-4 space-y-3">
          <button @click="$emit('navigate', 'profile')" class="action-btn" :class="{ 'action-btn-primary': true }">
            <span class="transition-transform hover:translate-x-1">✏️</span> Edit portfolio profile
          </button>
          <button @click="$emit('navigate', 'projects')" class="action-btn" :class="{ 'action-btn-cyan': true }">
            <span class="transition-transform hover:translate-x-1">📦</span> Create or update projects
          </button>
          <button @click="$emit('navigate', 'skills')" class="action-btn" :class="{ 'action-btn-violet': true }">
            <span class="transition-transform hover:translate-x-1">⚡</span> Manage skill levels
          </button>
          <button @click="$emit('navigate', 'inbox')" class="action-btn" :class="{ 'action-btn-amber': true }">
            <span class="transition-transform hover:translate-x-1">💬</span> Review inbox
          </button>
          <button @click="$emit('navigate', 'settings')" class="action-btn" :class="{ 'action-btn-purple': true }">
            <span class="transition-transform hover:translate-x-1">⚙️</span> Open maintenance settings
          </button>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid gap-8 lg:grid-cols-2">
      <div class="card">
        <div class="flex items-center justify-between gap-4">
          <div>
            <span class="badge badge-amber">Recent Inbox</span>
            <h3 class="mt-2 text-lg font-bold text-white">Latest Messages</h3>
          </div>
          <button @click="$emit('navigate', 'inbox')" class="btn-link">Open inbox →</button>
        </div>
        <div v-if="recentMessages.length === 0" class="mt-4 card-sm text-center text-slate-400">
          No messages have been received yet.
        </div>
        <div v-else class="mt-4 space-y-3">
          <MessageRow v-for="msg in recentMessages" :key="msg._id" :message="msg" />
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between gap-4">
          <div>
            <span class="badge badge-cyan">Content Inventory</span>
            <h3 class="mt-2 text-lg font-bold text-white">Recently Updated</h3>
          </div>
          <div class="card-sm text-xs text-slate-400">{{ totalContent }} total</div>
        </div>
        <div class="mt-4 grid gap-4">
          <ContentSection 
            title="Projects" 
            :items="recentProjects" 
            icon="📦" 
            color="cyan" 
            :empty="projects.length === 0"
            @click="$emit('navigate', 'projects')" 
          />
          <ContentSection 
            title="Skills" 
            :items="recentSkills" 
            icon="⚡" 
            color="violet" 
            :empty="skills.length === 0"
            @click="$emit('navigate', 'skills')" 
          />
          <ContentSection 
            title="Experience" 
            :items="recentExperience" 
            icon="💼" 
            color="sky" 
            :empty="experience.length === 0"
            @click="$emit('navigate', 'experience')" 
          />
          <ContentSection 
            title="Education" 
            :items="recentEducation" 
            icon="🎓" 
            color="emerald" 
            :empty="education.length === 0"
            @click="$emit('navigate', 'education')" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(['refreshKey']);

const loading = ref(false);
const projects = ref([]);
const skills = ref([]);
const experience = ref([]);
const education = ref([]);
const messages = ref([]);
const viewsCount = ref(0);
const profileData = ref({});

const showToast = inject('toast')?.show || (() => {});
const getAuthConfig = inject('auth')?.getAuthConfig || (() => ({}));

const stats = computed(() => [
  { key: 'views', label: 'Public Views', value: viewsCount.value, note: 'Traffic counter', color: 'emerald', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>' },
  { key: 'projects', label: 'Projects', value: projects.value.length, note: publishedProjects.value + ' published', color: 'sky', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>' },
  { key: 'skills', label: 'Skills', value: skills.value.length, note: publishedSkills.value + ' published', color: 'cyan', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>' },
  { key: 'inbox', label: 'Unread Messages', value: unreadMessages.value.length, note: `${messages.value.length} total`, color: 'amber', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>' },
]);

const quickActions = [
  { tab: 'profile', icon: '✏️', label: 'Profile', value: profileCompletion + '%', desc: 'Bio, links, avatar, CV', color: 'sky' },
  { tab: 'projects', icon: '📦', label: 'Projects', value: projects.value.length, desc: 'Titles, links, images, tech', color: 'cyan' },
  { tab: 'skills', icon: '⚡', label: 'Skills', value: skills.value.length, desc: 'Categories, icons, levels', color: 'violet' },
  { tab: 'inbox', icon: '💬', label: 'Inbox', value: unreadMessages.value.length, desc: unreadMessages.value.length + ' unread', color: 'amber' },
];

const recentMessages = computed(() => 
  [...messages.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3)
);

const recentProjects = computed(() => 
  [...projects.value].sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)).slice(0, 3)
);

const recentSkills = computed(() => 
  [...skills.value].sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)).slice(0, 3)
);

const recentExperience = computed(() => 
  [...experience.value].sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)).slice(0, 3)
);

const recentEducation = computed(() => 
  [...education.value].sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)).slice(0, 3)
);

const publishedProjects = computed(() => projects.value.filter(p => p.published !== false).length);
const publishedSkills = computed(() => skills.value.filter(s => s.published !== false).length);
const unreadMessages = computed(() => messages.value.filter(m => !m.isRead).length);
const totalContent = computed(() => projects.value.length + skills.value.length + experience.value.length + education.value.length);

const profileCompletion = computed(() => {
  const fields = ['name', 'greeting', 'role', 'bio', 'avatarUrl', 'email', 'location', 'cvUrl', 'linkedin', 'github'];
  const filled = fields.filter(f => profileData.value[f]).length;
  return Math.round((filled / fields.length) * 100);
});

const fetchData = async () => {
  loading.value = true;
  try {
    const [projectsRes, skillsRes, expRes, eduRes, msgRes, profileRes, statsRes] = await Promise.all([
      axios.get('/api/projects').catch(() => ({ data: [] })),
      axios.get('/api/skills').catch(() => ({ data: [] })),
      axios.get('/api/experience').catch(() => ({ data: [] })),
      axios.get('/api/education').catch(() => ({ data: [] })),
      axios.get('/api/messages', getAuthConfig()).catch(() => ({ data: [] })),
      axios.get('/api/profile').catch(() => ({ data: {} })),
      axios.get('/api/stats').catch(() => ({ data: { views: 0 } }))
    ]);
    
    projects.value = projectsRes.data || [];
    skills.value = skillsRes.data || [];
    experience.value = expRes.data || [];
    education.value = eduRes.data || [];
    messages.value = msgRes.data || [];
    profileData.value = profileRes.data || {};
    viewsCount.value = statsRes.data?.views || 0;
  } catch (error) {
    console.error('Dashboard fetch failed:', error);
    showToast('error', 'Failed to load dashboard data');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

watch(() => props.refreshKey, fetchData);
</script>

<style scoped>
.card {
  @apply rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl;
}
.card-sm {
  @apply rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 backdrop-blur-sm;
}
.badge {
  @apply inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider;
}
.badge-emerald { @apply border-emerald-500/30 bg-emerald-500/10 text-emerald-300; }
.badge-purple { @apply border-purple-500/30 bg-purple-500/10 text-purple-300; }
.badge-amber { @apply border-amber-500/30 bg-amber-500/10 text-amber-300; }
.badge-cyan { @apply border-cyan-500/30 bg-cyan-500/10 text-cyan-300; }
.btn-secondary {
  @apply inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all;
}
.btn-outline {
  @apply inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all;
}
.btn-link {
  @apply text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors;
}
.action-btn {
  @apply w-full flex items-center justify-start gap-3 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-left text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all;
}
.action-btn-primary { @apply border-sky-500/30 hover:border-sky-500/50 hover:bg-sky-500/10; }
.action-btn-cyan { @apply border-cyan-500/30 hover:border-cyan-500/50 hover:bg-cyan-500/10; }
.action-btn-violet { @apply border-violet-500/30 hover:border-violet-500/50 hover:bg-violet-500/10; }
.action-btn-amber { @apply border-amber-500/30 hover:border-amber-500/50 hover:bg-amber-500/10; }
.action-btn-purple { @apply border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/10; }
</style>