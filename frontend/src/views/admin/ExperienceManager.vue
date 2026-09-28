<template>
  <div class="space-y-8 animate-fade-in">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <span class="badge badge-sky">Experience Manager</span>
        <h1 class="mt-2 text-3xl font-display font-extrabold text-white">{{ editingItem ? 'Edit Experience' : 'Add Experience' }}</h1>
        <p class="mt-1 text-sm text-slate-400">Manage your work history. Displayed on the About page in chronological order.</p>
      </div>
      <div class="card-sm text-right">
        <div class="text-xs uppercase tracking-wider text-slate-500">Total Entries</div>
        <div class="mt-1 text-3xl font-black text-white">{{ experience.length }}</div>
      </div>
    </div>

    <div class="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <div class="card">
        <form @submit.prevent="editingItem ? updateItem() : createItem()" class="space-y-8">
          <div class="grid gap-6 sm:grid-cols-2">
            <FormField label="Job Title" :required="true">
              <input v-model="form.title" type="text" class="input-field" placeholder="Senior Frontend Engineer" required />
            </FormField>
            <FormField label="Company" :required="true">
              <input v-model="form.company" type="text" class="input-field" placeholder="TechCorp Systems" required />
            </FormField>
            <FormField label="Location">
              <input v-model="form.location" type="text" class="input-field" placeholder="San Francisco, CA / Remote" />
            </FormField>
            <FormField label="Start Date" :required="true">
              <input v-model="form.startDate" type="month" class="input-field" required />
            </FormField>
            <FormField label="End Date">
              <input v-model="form.endDate" type="month" class="input-field" :disabled="form.current" />
            </FormField>
            <FormField label="Current Position" class="sm:col-span-2">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="form.current" class="w-5 h-5 rounded border-white/20 bg-slate-800 text-primary focus:ring-primary" />
                <span class="text-slate-300">I currently work here</span>
              </label>
            </FormField>
          </div>

          <FormField label="Description" class="sm:col-span-2">
            <textarea v-model="form.description" rows="4" class="input-field textarea-field" placeholder="Key achievements, responsibilities, technologies used..."></textarea>
          </FormField>

          <FormField label="Technologies (comma separated)" class="sm:col-span-2">
            <input v-model="techInput" type="text" class="input-field" placeholder="React, TypeScript, GraphQL, AWS" />
          </FormField>

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

          <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div class="text-sm text-slate-500">
              <template v-if="editingItem">Editing: <strong>{{ editingItem.title }}</strong></template>
              <template v-else>Adding new experience</template>
            </div>
            <div class="flex flex-wrap gap-3">
              <button v-if="editingItem" type="button" @click="resetForm" class="btn-secondary">Cancel</button>
              <button type="submit" class="btn-primary">{{ editingItem ? 'Save Changes' : 'Add Experience' }}</button>
            </div>
          </div>
        </form>
      </div>

      <div class="card">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <span class="badge badge-sky">Experience Records</span>
            <h3 class="mt-2 text-lg font-bold text-white">Manage Work History</h3>
          </div>
          <input v-model="search" placeholder="Search experience..." class="input-field w-full sm:max-w-xs" />
        </div>

        <div v-if="filteredExperience.length === 0" class="card-sm text-center text-slate-400 py-8">
          <div class="text-4xl mb-2">💼</div>
          <p>No experience entries yet.</p>
        </div>

        <div v-else class="space-y-4">
          <ExperienceCard 
            v-for="exp in filteredExperience" 
            :key="exp._id" 
            :exp="exp" 
            @edit="editItem"
            @delete="deleteItem"
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

const experience = ref([]);
const search = ref('');
const editingItem = ref(null);

const form = ref({
  title: '', company: '', location: '', startDate: '', endDate: '', current: false,
  description: '', technologies: [], published: true, order: 0,
});
const techInput = ref('');

const filteredExperience = computed(() => {
  if (!search.value) return experience.value;
  const q = search.value.toLowerCase();
  return experience.value.filter(e => 
    e.title.toLowerCase().includes(q) ||
    e.company.toLowerCase().includes(q) ||
    e.location?.toLowerCase().includes(q) ||
    (e.technologies || []).some(t => t.toLowerCase().includes(q))
  );
});

const loadExperience = async () => {
  try {
    const res = await axios.get('/api/experience');
    experience.value = res.data || [];
  } catch (e) { showToast('error', 'Failed to load experience'); }
};

const parseTech = () => techInput.value.split(',').map(t => t.trim()).filter(Boolean);

const createItem = async () => {
  try {
    const payload = { ...form.value, technologies: parseTech() };
    const res = await axios.post('/api/experience', payload, getAuthConfig());
    experience.value.unshift(res.data);
    resetForm();
    showToast('success', 'Experience added');
  } catch (e) { showToast('error', e.response?.data?.message || 'Failed'); }
};

const editItem = (exp) => {
  editingItem.value = exp;
  form.value = { ...exp };
  techInput.value = (exp.technologies || []).join(', ');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const updateItem = async () => {
  try {
    const payload = { ...form.value, technologies: parseTech() };
    const res = await axios.put(`/api/experience/${editingItem.value._id}`, payload, getAuthConfig());
    const idx = experience.value.findIndex(e => e._id === editingItem.value._id);
    if (idx >= 0) experience.value[idx] = res.data;
    resetForm();
    showToast('success', 'Experience updated');
  } catch (e) { showToast('error', e.response?.data?.message || 'Failed'); }
};

const deleteItem = async (id) => {
  if (!confirm('Delete this experience?')) return;
  try {
    await axios.delete(`/api/experience/${id}`, getAuthConfig());
    experience.value = experience.value.filter(e => e._id !== id);
    showToast('success', 'Deleted');
  } catch (e) { showToast('error', e.response?.data?.message || 'Failed'); }
};

const resetForm = () => {
  editingItem.value = null;
  form.value = { title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '', technologies: [], published: true, order: 0 };
  techInput.value = '';
};

onMounted(() => loadExperience());
watch(() => props.refreshKey, loadExperience);
</script>

<style scoped>
.card { @apply rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl; }
.card-sm { @apply rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm; }
.badge { @apply inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider; }
.badge-sky { @apply border-sky-500/30 bg-sky-500/10 text-sky-300; }
.input-field { @apply w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary; }
.textarea-field { @apply resize-none min-h-[100px]; }
.btn-primary { @apply inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(14,165,233,0.25)] hover:-translate-y-0.5 transition-all; }
.btn-secondary { @apply inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all; }

FormField { @apply flex flex-col gap-2; }
FormField label { @apply text-sm font-semibold text-slate-300; }
FormField p { @apply mt-1 text-xs text-slate-500; }

ExperienceCard { @apply relative; }
</style>