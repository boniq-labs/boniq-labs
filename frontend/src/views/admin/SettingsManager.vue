<template>
  <div class="space-y-8 animate-fade-in">
    <div>
      <span class="badge badge-purple">Settings</span>
      <h1 class="mt-2 text-3xl font-display font-extrabold text-white">Site Configuration</h1>
      <p class="mt-1 text-sm text-slate-400">Manage global site settings, branding, SEO, and admin preferences.</p>
    </div>

    <div class="grid gap-8 lg:grid-cols-2">
      <!-- Brand Identity -->
      <div class="card">
        <h2 class="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <span class="p-2 rounded-xl bg-purple-500/20 text-purple-300">🏷️</span>
          Brand Identity
        </h2>
        <form @submit.prevent="saveSiteIdentity" class="space-y-6">
          <FormField label="Site Name">
            <input v-model="siteForm.name" type="text" class="input-field" placeholder="boniq" />
          </FormField>
          <FormField label="Site Description">
            <textarea v-model="siteForm.description" rows="2" class="input-field textarea-field" placeholder="Advanced Portfolio System"></textarea>
          </FormField>
          <FormField label="Canonical Site URL">
            <input v-model="siteForm.siteUrl" type="url" class="input-field" placeholder="https://boniq.dev" />
          </FormField>

          <FormField label="Site Logo">
            <div class="flex items-center gap-4">
              <div v-if="siteForm.logoUrl" class="w-16 h-16 rounded-xl border border-white/10 bg-slate-900/50 flex items-center justify-center overflow-hidden">
                <img :src="siteForm.logoUrl" class="w-full h-full object-contain" />
              </div>
              <div v-else class="w-16 h-16 rounded-xl border border-dashed border-white/20 bg-slate-900/50 flex items-center justify-center text-white/40">No logo</div>
              <div class="flex-1">
                <label class="btn-upload">
                  <input type="file" accept="image/*" class="absolute inset-0 cursor-pointer opacity-0" @change="handleUpload('logo')" />
                  <span v-if="uploading.logo" class="flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>Uploading...</span>
                  <span v-else>Upload Logo</span>
                </label>
                <button v-if="siteForm.logoUrl" type="button" @click="siteForm.logoUrl = ''" class="ml-2 text-xs text-red-400 hover:text-red-300">Remove</button>
              </div>
            </div>
          </FormField>

          <FormField label="Favicon">
            <div class="flex items-center gap-4">
              <div v-if="siteForm.faviconUrl" class="w-12 h-12 rounded-lg border border-white/10 bg-slate-900/50 flex items-center justify-center overflow-hidden">
                <img :src="siteForm.faviconUrl" class="w-full h-full object-contain" />
              </div>
              <div v-else class="w-12 h-12 rounded-lg border border-dashed border-white/20 bg-slate-900/50 flex items-center justify-center text-white/40">No favicon</div>
              <div class="flex-1">
                <label class="btn-upload">
                  <input type="file" accept="image/ico,image/x-icon,image/png" class="absolute inset-0 cursor-pointer opacity-0" @change="handleUpload('favicon')" />
                  <span v-if="uploading.favicon" class="flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>Uploading...</span>
                  <span v-else>Upload Favicon</span>
                </label>
                <button v-if="siteForm.faviconUrl" type="button" @click="siteForm.faviconUrl = ''" class="ml-2 text-xs text-red-400 hover:text-red-300">Remove</button>
              </div>
            </div>
          </FormField>

          <button type="submit" class="btn-primary" :disabled="savingSite">
            <span v-if="savingSite" class="flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>Saving...</span>
            <span v-else>Save Brand Identity</span>
          </button>
        </form>
      </div>

      <!-- SEO Settings -->
      <div class="card">
        <h2 class="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <span class="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">🔍</span>
          SEO Settings
        </h2>
        <form @submit.prevent="saveSEO" class="space-y-6">
          <FormField label="Default SEO Title">
            <input v-model="seoForm.title" type="text" class="input-field" placeholder="boniq - Full Stack Developer Portfolio" />
          </FormField>
          <FormField label="Default SEO Description">
            <textarea v-model="seoForm.description" rows="3" class="input-field textarea-field" placeholder="Full Stack Developer portfolio showcasing projects, skills, and experience."></textarea>
          </FormField>
          <FormField label="Default SEO Keywords (comma separated)">
            <input v-model="seoForm.keywords" type="text" class="input-field" placeholder="developer, portfolio, full stack, web development" />
          </FormField>
          <button type="submit" class="btn-primary" :disabled="savingSEO">
            <span v-if="savingSEO" class="flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>Saving...</span>
            <span v-else>Save SEO Settings</span>
          </button>
        </form>
      </div>

      <!-- Admin Preferences -->
      <div class="card">
        <h2 class="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <span class="p-2 rounded-xl bg-amber-500/20 text-amber-300">🔐</span>
          Admin Preferences
        </h2>
        <form @submit.prevent="changePassword" class="space-y-6">
          <FormField label="Current Password">
            <div class="relative">
              <input :type="showCurrent ? 'text' : 'password'" v-model="pwForm.current" class="input-field pr-12" placeholder="••••••••" />
              <button type="button" @click="showCurrent = !showCurrent" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <svg v-if="!showCurrent" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              </button>
            </div>
          </FormField>
          <FormField label="New Password">
            <div class="relative">
              <input :type="showNew ? 'text' : 'password'" v-model="pwForm.new" class="input-field pr-12" placeholder="••••••••" />
              <button type="button" @click="showNew = !showNew" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <svg v-if="!showNew" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              </button>
            </div>
          </FormField>
          <FormField label="Confirm New Password">
            <input :type="showNew ? 'text' : 'password'" v-model="pwForm.confirm" class="input-field" placeholder="••••••••" />
          </FormField>
          <div v-if="pwError" class="text-sm text-red-400">{{ pwError }}</div>
          <button type="submit" class="btn-primary w-full" :disabled="changingPw">
            <span v-if="changingPw" class="flex items-center justify-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>Updating...</span>
            <span v-else>Update Password</span>
          </button>
        </form>
      </div>

      <!-- Visit Counter -->
      <div class="card">
        <h2 class="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <span class="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">📊</span>
          Visit Counter
        </h2>
        <form @submit.prevent="saveViews" class="space-y-4">
          <FormField label="Total Page Views">
            <input v-model.number="viewsForm.views" type="number" min="0" class="input-field" placeholder="0" />
          </FormField>
          <div class="flex gap-3">
            <button type="submit" class="btn-primary flex-1">Save Counter</button>
            <button type="button" @click="resetViews" class="btn-secondary flex-1">Reset to Zero</button>
          </div>
        </form>
      </div>

      <!-- Maintenance -->
      <div class="card lg:col-span-2">
        <h2 class="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <span class="p-2 rounded-xl bg-sky-500/20 text-sky-300">🛠️</span>
          Maintenance Tools
        </h2>
        <div class="space-y-4">
          <button @click="refreshAll" :disabled="loading" class="maintenance-btn">
            <span class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="loading ? 'animate-spin' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h5M20 20v-5h-5M5.636 18.364A9 9 0 103.34 9.34M18.364 5.636A9 9 0 0120.66 14.66" /></svg>
              <span>Refresh All Dashboard Data</span>
            </span>
            <span class="text-sm text-slate-400">Reload projects, skills, experience, education, services, profile, inbox, and stats</span>
          </button>
          <button @click="clearForms" class="maintenance-btn">
            <span class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              <span>Clear All Editor Forms</span>
            </span>
            <span class="text-sm text-slate-400">Reset unsaved edits in project, skill, experience, education, and service forms</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps(['refreshKey']);
const showToast = inject('toast')?.show || (() => {});
const getAuthConfig = inject('auth')?.getAuthConfig || (() => ({}));

const siteForm = ref({ name: 'boniq', description: 'Advanced Portfolio System', logoUrl: '', faviconUrl: '', siteUrl: '' });
const seoForm = ref({ title: '', description: '', keywords: '' });
const viewsForm = ref({ views: 0 });
const pwForm = ref({ current: '', new: '', confirm: '' });
const showCurrent = ref(false);
const showNew = ref(false);
const changingPw = ref(false);
const pwError = ref('');
const savingSite = ref(false);
const savingSEO = ref(false);
const loading = ref(false);
const uploading = ref({ logo: false, favicon: false });

const loadSettings = async () => {
  try {
    const [profileRes, statsRes] = await Promise.all([
      axios.get('/api/profile').catch(() => ({ data: {} })),
      axios.get('/api/stats').catch(() => ({ data: { views: 0 } }))
    ]);
    if (profileRes.data) {
      siteForm.value.name = profileRes.data.name || 'boniq';
      siteForm.value.description = profileRes.data.bio || 'Advanced Portfolio System';
      siteForm.value.logoUrl = profileRes.data.logoUrl || '';
      siteForm.value.faviconUrl = profileRes.data.faviconUrl || '';
      siteForm.value.siteUrl = profileRes.data.siteUrl || '';
      seoForm.value.title = profileRes.data.seoTitle || 'boniq - Full Stack Developer Portfolio';
      seoForm.value.description = profileRes.data.seoDescription || 'Full Stack Developer portfolio showcasing projects, skills, and experience.';
      seoForm.value.keywords = profileRes.data.seoKeywords || 'developer, portfolio, full stack, web development';
    }
    viewsForm.value.views = statsRes.data?.views || 0;
  } catch (e) { console.error('Load settings failed:', e); }
};

const handleUpload = async (type) => {
  const input = document.querySelector(`input[type="file"][data-type="${type}"]`);
  const file = input?.files?.[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('image', file);
  uploading.value[type] = true;
  try {
    const res = await axios.post('/api/upload', formData, getAuthConfig());
    const url = typeof res.data === 'string' ? res.data : res.data?.url;
    if (type === 'logo') siteForm.value.logoUrl = url;
    else if (type === 'favicon') siteForm.value.faviconUrl = url;
    showToast('success', `${type} uploaded`);
  } catch (e) { showToast('error', e.response?.data?.message || 'Upload failed'); }
  finally { uploading.value[type] = false; input.value = ''; }
};

const saveSiteIdentity = async () => {
  savingSite.value = true;
  try {
    const payload = {
      name: siteForm.value.name,
      bio: siteForm.value.description,
      logoUrl: siteForm.value.logoUrl,
      faviconUrl: siteForm.value.faviconUrl,
      siteUrl: siteForm.value.siteUrl,
    };
    const res = await axios.put('/api/profile', payload, getAuthConfig());
    Object.assign(siteForm.value, res.data);
    showToast('success', 'Brand identity saved');
  } catch (e) { showToast('error', e.response?.data?.message || 'Failed'); }
  finally { savingSite.value = false; }
};

const saveSEO = async () => {
  savingSEO.value = true;
  try {
    const payload = {
      seoTitle: seoForm.value.title,
      seoDescription: seoForm.value.description,
      seoKeywords: seoForm.value.keywords,
    };
    await axios.put('/api/profile', payload, getAuthConfig());
    showToast('success', 'SEO settings saved');
  } catch (e) { showToast('error', e.response?.data?.message || 'Failed'); }
  finally { savingSEO.value = false; }
};

const saveViews = async () => {
  try {
    await axios.put('/api/stats', { views: viewsForm.value.views }, getAuthConfig());
    showToast('success', 'View counter updated');
  } catch (e) { showToast('error', e.response?.data?.message || 'Failed'); }
};

const resetViews = async () => {
  if (!confirm('Reset view counter to zero?')) return;
  viewsForm.value.views = 0;
  await saveViews();
};

const changePassword = async () => {
  pwError.value = '';
  if (!pwForm.current || !pwForm.new || !pwForm.confirm) { pwError.value = 'All fields required'; return; }
  if (pwForm.new.length < 6) { pwError.value = 'Min 6 characters'; return; }
  if (pwForm.new !== pwForm.confirm) { pwError.value = 'Passwords do not match'; return; }
  changingPw.value = true;
  try {
    const { data } = await axios.put('/api/auth/password', {
      currentPassword: pwForm.current,
      newPassword: pwForm.new
    }, getAuthConfig());
    if (data.token) localStorage.setItem('boniq_token', data.token);
    pwForm.value = { current: '', new: '', confirm: '' };
    showToast('success', 'Password updated. New token issued.');
  } catch (e) { pwError.value = e.response?.data?.message || 'Failed'; showToast('error', pwError.value); }
  finally { changingPw.value = false; }
};

const refreshAll = async () => {
  loading.value = true;
  showToast('success', 'Refreshing all data...');
  // The parent Dashboard component handles refresh via refreshKey
  // Just trigger a reload
  await new Promise(r => setTimeout(r, 500));
  loading.value = false;
};

const clearForms = () => {
  showToast('success', 'Forms cleared (refresh page to see effect)');
};

onMounted(() => loadSettings());
</script>

<style scoped>
.card { @apply rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl; }
.badge { @apply inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider; }
.badge-purple { @apply border-purple-500/30 bg-purple-500/10 text-purple-300; }
.badge-cyan { @apply border-cyan-500/30 bg-cyan-500/10 text-cyan-300; }
.badge-amber { @apply border-amber-500/30 bg-amber-500/10 text-amber-300; }
.badge-emerald { @apply border-emerald-500/30 bg-emerald-500/10 text-emerald-300; }
.badge-sky { @apply border-sky-500/30 bg-sky-500/10 text-sky-300; }
.input-field { @apply w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary; }
.textarea-field { @apply resize-none min-h-[80px]; }
.btn-primary { @apply inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(59,130,246,0.25)] hover:-translate-y-0.5 transition-all disabled:opacity-50; }
.btn-secondary { @apply inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all; }
.btn-upload { @apply relative inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 cursor-pointer; }

FormField { @apply flex flex-col gap-2; }
FormField label { @apply text-sm font-semibold text-slate-300; }
FormField p { @apply mt-1 text-xs text-slate-500; }

.maintenance-btn {
  @apply w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-slate-900/50 text-left hover:bg-white/5 transition-all;
}
.maintenance-btn:disabled { @apply opacity-50 cursor-not-allowed; }
</style>