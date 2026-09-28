<template>
  <div class="space-y-8 animate-fade-in">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <span class="badge badge-purple">Service Manager</span>
        <h1 class="mt-2 text-3xl font-display font-extrabold text-white">{{ editingItem ? 'Edit Service' : 'Add Service' }}</h1>
        <p class="mt-1 text-sm text-slate-400">Manage services you offer. Displayed on the About/Services page.</p>
      </div>
      <div class="card-sm text-right">
        <div class="text-xs uppercase tracking-wider text-slate-500">Services Offered</div>
        <div class="mt-1 text-3xl font-black text-white">{{ services.length }}</div>
      </div>
    </div>

    <div class="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <div class="card">
        <form @submit.prevent="editingItem ? updateItem() : createItem()" class="space-y-8">
          <div class="grid gap-6 sm:grid-cols-2">
            <FormField label="Service Title" :required="true">
              <input v-model="form.title" type="text" class="input-field" placeholder="Full-Stack Web Development" required />
            </FormField>
            <FormField label="Icon / Emoji">
              <input v-model="form.icon" type="text" class="input-field" placeholder="💻 or icon URL" />
            </FormField>
          </div>

          <FormField label="Description" class="sm:col-span-2">
            <textarea v-model="form.description" rows="4" class="input-field textarea-field" placeholder="What this service includes, technologies used, deliverables..."></textarea>
          </FormField>

          <FormField label="Key Features (one per line)" class="sm:col-span-2">
            <textarea v-model="featuresInput" rows="5" class="input-field textarea-field" placeholder="Custom web application development&#10;API design & implementation&#10;Database architecture&#10;DevOps & CI/CD setup&#10;Code review & mentoring"></textarea>
            <p class="text-xs text-slate-500">Each line becomes a feature bullet point.</p>
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
              <template v-else>Adding new service</template>
            </div>
            <div class="flex flex-wrap gap-3">
              <button v-if="editingItem" type="button" @click="resetForm" class="btn-secondary">Cancel</button>
              <button type="submit" class="btn-primary">{{ editingItem ? 'Save Changes' : 'Add Service' }}</button>
            </div>
          </div>
        </form>
      </div>

      <div class="card">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <span class="badge badge-purple">Service Offerings</span>
            <h3 class="mt-2 text-lg font-bold text-white">Manage Services</h3>
          </div>
          <input v-model="search" placeholder="Search services..." class="input-field w-full sm:max-w-xs" />
        </div>

        <div v-if="filteredServices.length === 0" class="card-sm text-center text-slate-400 py-8">
          <div class="text-4xl mb-2">⚙️</div>
          <p>No services defined yet.</p>
        </div>

        <div v-else class="space-y-4">
          <ServiceCard 
            v-for="svc in filteredServices" 
            :key="svc._id" 
            :service="svc" 
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

const services = ref([]);
const search = ref('');
const editingItem = ref(null);

const form = ref({ title: '', description: '', icon: '', features: [], published: true, order: 0 });
const featuresInput = ref('');

const filteredServices = computed(() => {
  if (!search.value) return services.value;
  const q = search.value.toLowerCase();
  return services.value.filter(s => 
    s.title.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q)
  );
});

const loadServices = async () => {
  try {
    const res = await axios.get('/api/services');
    services.value = res.data || [];
  } catch (e) { showToast('error', 'Failed to load services'); }
};

const parseFeatures = () => featuresInput.value.split('\n').map(f => f.trim()).filter(Boolean);

const createItem = async () => {
  try {
    const payload = { ...form.value, features: parseFeatures() };
    const res = await axios.post('/api/services', payload, getAuthConfig());
    services.value.unshift(res.data);
    resetForm();
    showToast('success', 'Service added');
  } catch (e) { showToast('error', e.response?.data?.message || 'Failed'); }
};

const editItem = (svc) => {
  editingItem.value = svc;
  form.value = { ...svc };
  featuresInput.value = (svc.features || []).join('\n');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const updateItem = async () => {
  try {
    const payload = { ...form.value, features: parseFeatures() };
    const res = await axios.put(`/api/services/${editingItem.value._id}`, payload, getAuthConfig());
    const idx = services.value.findIndex(s => s._id === editingItem.value._id);
    if (idx >= 0) services.value[idx] = res.data;
    resetForm();
    showToast('success', 'Service updated');
  } catch (e) { showToast('error', e.response?.data?.message || 'Failed'); }
};

const deleteItem = async (id) => {
  if (!confirm('Delete this service?')) return;
  try {
    await axios.delete(`/api/services/${id}`, getAuthConfig());
    services.value = services.value.filter(s => s._id !== id);
    showToast('success', 'Deleted');
  } catch (e) { showToast('error', e.response?.data?.message || 'Failed'); }
};

const resetForm = () => {
  editingItem.value = null;
  form.value = { title: '', description: '', icon: '', features: [], published: true, order: 0 };
  featuresInput.value = '';
};

onMounted(() => loadServices());
watch(() => props.refreshKey, loadServices);
</script>

<style scoped>
.card { @apply rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl; }
.card-sm { @apply rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm; }
.badge { @apply inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider; }
.badge-purple { @apply border-purple-500/30 bg-purple-500/10 text-purple-300; }
.input-field { @apply w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary; }
.textarea-field { @apply resize-none min-h-[100px]; }
.btn-primary { @apply inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(139,92,246,0.25)] hover:-translate-y-0.5 transition-all; }
.btn-secondary { @apply inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all; }
FormField { @apply flex flex-col gap-2; }
FormField label { @apply text-sm font-semibold text-slate-300; }
FormField p { @apply mt-1 text-xs text-slate-500; }
ServiceCard { @apply relative; }
</style>