<template>
  <div class="space-y-8 animate-fade-in">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <span class="badge badge-emerald">Education Manager</span>
        <h1 class="mt-2 text-3xl font-display font-extrabold text-white">{{ editingItem ? 'Edit Education' : 'Add Education' }}</h1>
        <p class="mt-1 text-sm text-slate-400">Manage your academic background. Displayed on the About page.</p>
      </div>
      <div class="card-sm text-right">
        <div class="text-xs uppercase tracking-wider text-slate-500">Total Entries</div>
        <div class="mt-1 text-3xl font-black text-white">{{ education.length }}</div>
      </div>
    </div>

    <div class="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <div class="card">
        <form @submit.prevent="editingItem ? updateItem() : createItem()" class="space-y-8">
          <div class="grid gap-6 sm:grid-cols-2">
            <FormField label="Degree" :required="true">
              <input v-model="form.degree" type="text" class="input-field" placeholder="Bachelor of Science in Computer Science" required />
            </FormField>
            <FormField label="Institution" :required="true">
              <input v-model="form.institution" type="text" class="input-field" placeholder="University Name" required />
            </FormField>
            <FormField label="Location">
              <input v-model="form.location" type="text" class="input-field" placeholder="City, Country" />
            </FormField>
            <FormField label="Start Date" :required="true">
              <input v-model="form.startDate" type="month" class="input-field" required />
            </FormField>
            <FormField label="End Date">
              <input v-model="form.endDate" type="month" class="input-field" :disabled="form.current" />
            </FormField>
            <FormField label="Currently Studying" class="sm:col-span-2">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" v-model="form.current" class="w-5 h-5 rounded border-white/20 bg-slate-800 text-primary focus:ring-primary" />
                <span class="text-slate-300">I'm currently studying here</span>
              </label>
            </FormField>
          </div>

          <FormField label="Description" class="sm:col-span-2">
            <textarea v-model="form.description" rows="3" class="input-field textarea-field" placeholder="Relevant coursework, honors, thesis, activities..."></textarea>
          </FormField>

          <FormField label="Grade / GPA" class="sm:col-span-2">
            <input v-model="form.grade" type="text" class="input-field" placeholder="3.8/4.0 or First Class Honours" />
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
              <template v-if="editingItem">Editing: <strong>{{ editingItem.degree }}</strong></template>
              <template v-else>Adding new education</template>
            </div>
            <div class="flex flex-wrap gap-3">
              <button v-if="editingItem" type="button" @click="resetForm" class="btn-secondary">Cancel</button>
              <button type="submit" class="btn-primary">{{ editingItem ? 'Save Changes' : 'Add Education' }}</button>
            </div>
          </div>
        </form>
      </div>

      <div class="card">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <span class="badge badge-emerald">Education Records</span>
            <h3 class="mt-2 text-lg font-bold text-white">Manage Academic Background</h3>
          </div>
          <input v-model="search" placeholder="Search education..." class="input-field w-full sm:max-w-xs" />
        </div>

        <div v-if="filteredEducation.length === 0" class="card-sm text-center text-slate-400 py-8">
          <div class="text-4xl mb-2">🎓</div>
          <p>No education entries yet.</p>
        </div>

        <div v-else class="space-y-4">
          <EducationCard 
            v-for="edu in filteredEducation" 
            :key="edu._id" 
            :edu="edu" 
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

const education = ref([]);
const search = ref('');
const editingItem = ref(null);

const form = ref({
  degree: '', institution: '', location: '', startDate: '', endDate: '', current: false,
  description: '', grade: '', published: true, order: 0,
});

const filteredEducation = computed(() => {
  if (!search.value) return education.value;
  const q = search.value.toLowerCase();
  return education.value.filter(e => 
    e.degree.toLowerCase().includes(q) ||
    e.institution.toLowerCase().includes(q) ||
    e.location?.toLowerCase().includes(q)
  );
});

const loadEducation = async () => {
  try {
    const res = await axios.get('/api/education');
    education.value = res.data || [];
  } catch (e) { showToast('error', 'Failed to load education'); }
};

const createItem = async () => {
  try {
    const res = await axios.post('/api/education', form.value, getAuthConfig());
    education.value.unshift(res.data);
    resetForm();
    showToast('success', 'Education added');
  } catch (e) { showToast('error', e.response?.data?.message || 'Failed'); }
};

const editItem = (edu) => {
  editingItem.value = edu;
  form.value = { ...edu };
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const updateItem = async () => {
  try {
    const res = await axios.put(`/api/education/${editingItem.value._id}`, form.value, getAuthConfig());
    const idx = education.value.findIndex(e => e._id === editingItem.value._id);
    if (idx >= 0) education.value[idx] = res.data;
    resetForm();
    showToast('success', 'Education updated');
  } catch (e) { showToast('error', e.response?.data?.message || 'Failed'); }
};

const deleteItem = async (id) => {
  if (!confirm('Delete this education entry?')) return;
  try {
    await axios.delete(`/api/education/${id}`, getAuthConfig());
    education.value = education.value.filter(e => e._id !== id);
    showToast('success', 'Deleted');
  } catch (e) { showToast('error', e.response?.data?.message || 'Failed'); }
};

const resetForm = () => {
  editingItem.value = null;
  form.value = { degree: '', institution: '', location: '', startDate: '', endDate: '', current: false, description: '', grade: '', published: true, order: 0 };
};

onMounted(() => loadEducation());
watch(() => props.refreshKey, loadEducation);
</script>

<style scoped>
.card { @apply rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl; }
.card-sm { @apply rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm; }
.badge { @apply inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider; }
.badge-emerald { @apply border-emerald-500/30 bg-emerald-500/10 text-emerald-300; }
.input-field { @apply w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary; }
.textarea-field { @apply resize-none min-h-[100px]; }
.btn-primary { @apply inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 transition-all; }
.btn-secondary { @apply inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all; }

FormField { @apply flex flex-col gap-2; }
FormField label { @apply text-sm font-semibold text-slate-300; }
FormField p { @apply mt-1 text-xs text-slate-500; }
EducationCard { @apply relative; }
</style>