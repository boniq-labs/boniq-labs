<template>
  <div class="space-y-8 animate-fade-in">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <span class="badge badge-violet">Skill Manager</span>
        <h1 class="mt-2 text-3xl font-display font-extrabold text-white">{{ editingSkill ? 'Edit Skill' : 'Create Skill' }}</h1>
        <p class="mt-1 text-sm text-slate-400">Manage skill names, categories, levels, and icons. Changes sync with the public skills page instantly.</p>
      </div>
      <div class="card-sm text-right">
        <div class="text-xs uppercase tracking-wider text-slate-500">Tracked Skills</div>
        <div class="mt-1 text-3xl font-black text-white">{{ skills.length }}</div>
      </div>
    </div>

    <div class="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <div class="card">
        <form @submit.prevent="editingSkill ? updateSkill() : createSkill()" class="space-y-8">
          <div class="grid gap-6 sm:grid-cols-2">
            <FormField label="Skill Name" :required="true">
              <input v-model="form.name" type="text" class="input-field" placeholder="Vue.js" required />
            </FormField>
            <FormField label="Category" :required="true">
              <select v-model="form.category" class="input-field" required>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </FormField>
            <FormField label="Icon / Emoji" class="sm:col-span-2">
              <div class="flex gap-3">
                <input v-model="form.icon" type="text" class="input-field flex-1" placeholder="Icon URL or emoji (e.g., ⚡)" />
                <label class="btn-upload">
                  <input type="file" accept="image/*" class="absolute inset-0 cursor-pointer opacity-0" @change="handleIconUpload" />
                  <span v-if="uploading.icon" class="flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>Uploading...</span>
                  <span v-else>Upload</span>
                </label>
              </div>
            </FormField>
            <FormField label="Proficiency Level" class="sm:col-span-2">
              <div class="flex items-center gap-4">
                <input v-model.number="form.level" type="range" min="1" max="100" class="flex-1 accent-cyan-400" />
                <input v-model.number="form.level" type="number" min="1" max="100" class="w-20 input-field text-center" />
              </div>
            </FormField>
            <FormField label="Description" class="sm:col-span-2">
              <textarea v-model="form.description" rows="3" class="input-field textarea-field" placeholder="Brief description of this skill..."></textarea>
            </FormField>
          </div>

          <div class="grid gap-6 sm:grid-cols-3">
            <FormField label="Status">
              <select v-model="form.published" class="input-field">
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </FormField>
            <FormField label="Display Order">
              <input v-model.number="form.order" type="number" min="0" class="input-field" placeholder="0" />
            </FormField>
          </div>

          <!-- Preview -->
          <FormField label="Live Preview" class="sm:col-span-2">
            <div class="card-sm">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-2xl border border-white/10 bg-slate-900/50 flex items-center justify-center overflow-hidden">
                  <img v-if="isImage(form.icon)" :src="form.icon" class="w-10 h-10 object-contain" />
                  <span v-else class="text-3xl font-bold text-white">{{ form.icon || '⚡' }}</span>
                </div>
                <div>
                  <div class="text-lg font-bold text-white">{{ form.name || 'Skill Name' }}</div>
                  <div class="text-xs uppercase tracking-wider text-slate-500">{{ form.category }}</div>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-slate-400">Skill Level</span>
                  <span class="font-bold text-cyan-300">{{ form.level }}%</span>
                </div>
                <div class="h-3 overflow-hidden rounded-full bg-slate-800">
                  <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500" :style="{ width: `${form.level}%` }"></div>
                </div>
              </div>
            </div>
          </FormField>

          <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div class="text-sm text-slate-500">Categories and levels sync with the public skills grouping and progress bars.</div>
            <div class="flex flex-wrap gap-3">
              <button v-if="editingSkill" type="button" @click="resetForm" class="btn-secondary">Cancel Edit</button>
              <button type="submit" class="btn-primary" :disabled="uploading.icon">
                <span v-if="uploading.icon" class="flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>Saving...</span>
                <span v-else>{{ editingSkill ? 'Save Changes' : 'Create Skill' }}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="card">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <span class="badge badge-violet">Skill Library</span>
            <h3 class="mt-2 text-lg font-bold text-white">Filter & Manage Skills</h3>
          </div>
          <div class="grid gap-3 sm:grid-cols-2 w-full sm:max-w-md">
            <input v-model="search" placeholder="Search skills..." class="input-field" />
            <select v-model="categoryFilter" class="input-field">
              <option value="All">All Categories</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>

        <div v-if="filteredSkills.length === 0" class="card-sm text-center text-slate-400 py-8">
          <div class="text-4xl mb-2">⚡</div>
          <p>No skills match your filters.</p>
        </div>

        <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SkillCard 
            v-for="skill in filteredSkills" 
            :key="skill._id" 
            :skill="skill" 
            @edit="editSkill"
            @delete="deleteSkill"
          />
        </div>
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

const skills = ref([]);
const search = ref('');
const categoryFilter = ref('All');
const editingSkill = ref(null);
const uploading = ref({ icon: false });

const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'DevOps', 'Design', 'Other'];

const form = ref({
  name: '',
  icon: '⚡',
  category: 'Frontend',
  level: 80,
  description: '',
  published: true,
  order: 0,
});

const filteredSkills = computed(() => {
  let result = skills.value;
  if (categoryFilter.value !== 'All') result = result.filter(s => s.category === categoryFilter.value);
  if (search.value) {
    const q = search.value.toLowerCase();
    result = result.filter(s => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
  }
  return result;
});

const isImage = (val) => typeof val === 'string' && (val.startsWith('http') || val.startsWith('/'));

const loadSkills = async () => {
  try {
    const res = await axios.get('/api/skills');
    skills.value = res.data || [];
  } catch (e) { showToast('error', 'Failed to load skills'); }
};

const createSkill = async () => {
  try {
    const res = await axios.post('/api/skills', form.value, getAuthConfig());
    skills.value.unshift(res.data);
    resetForm();
    showToast('success', 'Skill created');
  } catch (e) { showToast('error', e.response?.data?.message || 'Creation failed'); }
};

const editSkill = (skill) => {
  editingSkill.value = skill;
  form.value = { ...skill };
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const updateSkill = async () => {
  try {
    const res = await axios.put(`/api/skills/${editingSkill.value._id}`, form.value, getAuthConfig());
    const idx = skills.value.findIndex(s => s._id === editingSkill.value._id);
    if (idx >= 0) skills.value[idx] = res.data;
    resetForm();
    showToast('success', 'Skill updated');
  } catch (e) { showToast('error', e.response?.data?.message || 'Update failed'); }
};

const deleteSkill = async (id) => {
  if (!confirm('Delete this skill?')) return;
  try {
    await axios.delete(`/api/skills/${id}`, getAuthConfig());
    skills.value = skills.value.filter(s => s._id !== id);
    showToast('success', 'Skill deleted');
  } catch (e) { showToast('error', e.response?.data?.message || 'Delete failed'); }
};

const handleIconUpload = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('image', file);
  uploading.value.icon = true;
  try {
    const res = await axios.post('/api/upload', formData, getAuthConfig());
    form.value.icon = typeof res.data === 'string' ? res.data : res.data?.url;
    showToast('success', 'Icon uploaded');
  } catch (e) { showToast('error', e.response?.data?.message || 'Upload failed'); }
  finally { uploading.value.icon = false; event.target.value = ''; }
};

const resetForm = () => {
  editingSkill.value = null;
  form.value = { name: '', icon: '⚡', category: 'Frontend', level: 80, description: '', published: true, order: 0 };
};

onMounted(() => loadSkills());
watch(() => props.refreshKey, loadSkills);
</script>

<style scoped>
.card { @apply rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl; }
.card-sm { @apply rounded-xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-sm; }
.badge { @apply inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider; }
.badge-violet { @apply border-violet-500/30 bg-violet-500/10 text-violet-300; }
.input-field { @apply w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary; }
.textarea-field { @apply resize-none min-h-[100px]; }
.btn-primary { @apply inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(34,211,238,0.2)] hover:-translate-y-0.5 transition-all disabled:opacity-50; }
.btn-secondary { @apply inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all; }
.btn-upload { @apply relative inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 cursor-pointer; }

FormField { @apply flex flex-col gap-2; }
FormField label { @apply text-sm font-semibold text-slate-300; }
FormField p { @apply mt-1 text-xs text-slate-500; }
</style>