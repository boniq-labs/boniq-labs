<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <span class="badge badge-cyan">Project Manager</span>
        <h1 class="mt-2 text-3xl font-display font-extrabold text-white">{{ editingProject ? 'Edit Project' : 'Create Project' }}</h1>
        <p class="mt-1 text-sm text-slate-400">Manage project details, images, links, and technologies. Changes appear immediately on the public portfolio.</p>
      </div>
      <div class="card-sm text-right">
        <div class="text-xs uppercase tracking-wider text-slate-500">Total Projects</div>
        <div class="mt-1 text-3xl font-black text-white">{{ projects.length }}</div>
      </div>
    </div>

    <div class="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <!-- Form -->
      <div class="card">
        <form @submit.prevent="editingProject ? updateProject() : createProject()" class="space-y-8">
          <div class="grid gap-6 sm:grid-cols-2">
            <FormField label="Project Title" :required="true">
              <input v-model="form.title" type="text" class="input-field" placeholder="Project title" required />
            </FormField>
            <FormField label="Category">
              <input v-model="form.category" type="text" class="input-field" placeholder="Web App, Mobile, API, etc." />
            </FormField>
            <FormField label="GitHub / Source URL">
              <input v-model="form.githubLink" type="url" class="input-field" placeholder="https://github.com/..." />
            </FormField>
            <FormField label="Live Demo URL">
              <input v-model="form.liveDemo" type="url" class="input-field" placeholder="https://project-demo.com" />
            </FormField>
            <FormField label="Technologies (comma separated)" class="sm:col-span-2">
              <input v-model="technologiesInput" type="text" class="input-field" placeholder="Vue.js, Node.js, MySQL, Tailwind" />
              <p class="text-xs text-slate-500">Press Enter after each technology or separate with commas.</p>
            </FormField>
            <FormField label="Short Description" class="sm:col-span-2">
              <input v-model="form.shortDescription" type="text" class="input-field" placeholder="Brief summary for project cards" />
            </FormField>
          </div>

          <FormField label="Full Description" class="sm:col-span-2">
            <textarea v-model="form.description" rows="5" class="input-field textarea-field" placeholder="Detailed project description..." required></textarea>
          </FormField>

          <!-- Thumbnail Image -->
          <FormField label="Thumbnail Image" class="sm:col-span-2">
            <div class="relative">
              <div class="relative aspect-video overflow-hidden rounded-2xl border border-dashed border-white/20 bg-slate-900/50">
                <img v-if="form.imageUrl" :src="form.imageUrl" alt="Preview" class="absolute inset-0 w-full h-full object-cover opacity-70" />
                <div v-else class="flex h-full items-center justify-center text-4xl font-bold text-white/40">📦</div>
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <p class="text-sm font-semibold text-white">{{ form.imageUrl ? 'Replace thumbnail' : 'Upload thumbnail image' }}</p>
                  <p class="text-xs text-slate-400">Recommended: 16:9 aspect ratio, max 5MB</p>
                  <label class="btn-upload">
                    <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" class="absolute inset-0 cursor-pointer opacity-0" @change="handleImageUpload($event, 'thumbnail')" />
                    <span v-if="uploading.thumbnail" class="flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>Uploading...</span>
                    <span v-else>{{ form.imageUrl ? 'Change Image' : 'Select Image' }}</span>
                  </label>
                </div>
              </div>
              <p v-if="form.imageUrl" class="mt-2 text-xs text-slate-400">Current: <a :href="form.imageUrl" target="_blank" class="text-cyan-300 hover:underline">{{ form.imageUrl }}</a></p>
            </div>
          </FormField>

          <!-- Additional Images -->
          <FormField label="Additional Images" class="sm:col-span-2">
            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="(img, idx) in form.images" :key="idx" class="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
                <img :src="img" alt="Additional" class="w-full h-full object-cover" />
                <button type="button" @click="removeImage(idx)" class="absolute top-2 right-2 p-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors" aria-label="Remove image">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <label v-if="form.images.length < 5" class="btn-upload aspect-square flex items-center justify-center">
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" class="absolute inset-0 cursor-pointer opacity-0" @change="handleImageUpload($event, 'additional')" />
                <span class="text-center">+ Add Image</span>
              </label>
            </div>
            <p class="mt-2 text-xs text-slate-500">Maximum 5 additional images. Drag to reorder (coming soon).</p>
          </FormField>

          <!-- Status & Featured -->
          <div class="grid gap-6 sm:grid-cols-3">
            <FormField label="Status">
              <select v-model="form.published" class="input-field">
                <option value="true">Published</option>
                <option value="false">Draft / Unpublished</option>
              </select>
            </FormField>
            <FormField label="Featured">
              <select v-model="form.featured" class="input-field">
                <option value="true">Yes - Show in featured section</option>
                <option value="false">No</option>
              </select>
            </FormField>
            <FormField label="Display Order">
              <input v-model.number="form.order" type="number" min="0" class="input-field" placeholder="0" />
            </FormField>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div class="text-sm text-slate-500">
              <template v-if="editingProject">Editing: <strong>{{ editingProject.title }}</strong></template>
              <template v-else>Creating new project</template>
            </div>
            <div class="flex flex-wrap gap-3">
              <button v-if="editingProject" type="button" @click="resetForm" class="btn-secondary">Cancel Edit</button>
              <button type="submit" class="btn-primary" :disabled="uploading.thumbnail || uploading.additional">
                <span v-if="uploading.thumbnail || uploading.additional" class="flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>Saving...</span>
                <span v-else>{{ editingProject ? 'Save Changes' : 'Create Project' }}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Projects List -->
      <div class="card">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <span class="badge badge-cyan">Project Library</span>
            <h3 class="mt-2 text-lg font-bold text-white">Manage Existing Projects</h3>
          </div>
          <div class="w-full sm:max-w-xs">
            <input v-model="search" placeholder="Search projects..." class="input-field" />
          </div>
        </div>

        <div v-if="filteredProjects.length === 0" class="card-sm text-center text-slate-400 py-8">
          <div class="text-4xl mb-2">📦</div>
          <p>No projects found. {{ search ? 'Try a different search.' : 'Create your first project!' }}</p>
        </div>

        <div v-else class="grid gap-4 sm:grid-cols-2">
          <ProjectCard 
            v-for="project in filteredProjects" 
            :key="project._id" 
            :project="project" 
            @edit="editProject"
            @delete="deleteProject"
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

const projects = ref([]);
const search = ref('');
const editingProject = ref(null);
const uploading = ref({ thumbnail: false, additional: false });

const form = ref({
  title: '',
  description: '',
  shortDescription: '',
  imageUrl: '',
  images: [],
  githubLink: '',
  liveDemo: '',
  category: '',
  technologies: [],
  featured: false,
  published: true,
  order: 0,
});

const technologiesInput = ref('');

const filteredProjects = computed(() => {
  if (!search.value) return projects.value;
  const q = search.value.toLowerCase();
  return projects.value.filter(p => 
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.category?.toLowerCase().includes(q) ||
    (p.technologies || []).some(t => t.toLowerCase().includes(q))
  );
});

const loadProjects = async () => {
  try {
    const res = await axios.get('/api/projects');
    projects.value = res.data || [];
  } catch (e) {
    showToast('error', 'Failed to load projects');
  }
};

const parseTechnologies = (input) => 
  input.split(',').map(t => t.trim()).filter(Boolean);

const buildPayload = () => ({
  title: form.value.title,
  description: form.value.description,
  shortDescription: form.value.shortDescription,
  imageUrl: form.value.imageUrl,
  images: form.value.images,
  githubLink: form.value.githubLink,
  liveDemo: form.value.liveDemo,
  category: form.value.category,
  technologies: parseTechnologies(technologiesInput.value),
  featured: form.value.featured,
  published: form.value.published,
  order: form.value.order || 0,
});

const createProject = async () => {
  try {
    const res = await axios.post('/api/projects', buildPayload(), getAuthConfig());
    projects.value.unshift(res.data);
    resetForm();
    showToast('success', 'Project created successfully');
  } catch (e) {
    showToast('error', e.response?.data?.message || 'Creation failed');
  }
};

const editProject = (project) => {
  editingProject.value = project;
  form.value = {
    title: project.title || '',
    description: project.description || '',
    shortDescription: project.shortDescription || '',
    imageUrl: project.imageUrl || '',
    images: project.images || [],
    githubLink: project.githubLink || '',
    liveDemo: project.liveDemo || '',
    category: project.category || '',
    technologies: project.technologies || [],
    featured: project.featured || false,
    published: project.published !== false,
    order: project.order || 0,
  };
  technologiesInput.value = (project.technologies || []).join(', ');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const updateProject = async () => {
  try {
    const res = await axios.put(`/api/projects/${editingProject.value._id}`, buildPayload(), getAuthConfig());
    const idx = projects.value.findIndex(p => p._id === editingProject.value._id);
    if (idx >= 0) projects.value[idx] = res.data;
    resetForm();
    showToast('success', 'Project updated successfully');
  } catch (e) {
    showToast('error', e.response?.data?.message || 'Update failed');
  }
};

const deleteProject = async (id) => {
  if (!confirm('Delete this project? This cannot be undone.')) return;
  try {
    await axios.delete(`/api/projects/${id}`, getAuthConfig());
    projects.value = projects.value.filter(p => p._id !== id);
    showToast('success', 'Project deleted');
  } catch (e) {
    showToast('error', e.response?.data?.message || 'Delete failed');
  }
};

const handleImageUpload = async (event, type) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('image', file);
  uploading.value[type] = true;
  try {
    const res = await axios.post('/api/upload', formData, getAuthConfig());
    const url = typeof res.data === 'string' ? res.data : res.data?.url;
    if (type === 'thumbnail') form.value.imageUrl = url;
    else if (type === 'additional') form.value.images = [...form.value.images, url];
    showToast('success', 'Image uploaded');
  } catch (e) {
    showToast('error', e.response?.data?.message || 'Upload failed');
  } finally {
    uploading.value[type] = false;
    event.target.value = '';
  }
};

const removeImage = (idx) => {
  form.value.images.splice(idx, 1);
};

const resetForm = () => {
  editingProject.value = null;
  form.value = {
    title: '', description: '', shortDescription: '', imageUrl: '', images: [],
    githubLink: '', liveDemo: '', category: '', technologies: [],
    featured: false, published: true, order: 0,
  };
  technologiesInput.value = '';
};

onMounted(() => loadProjects());
watch(() => props.refreshKey, loadProjects);
</script>

<style scoped>
.card { @apply rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl; }
.card-sm { @apply rounded-xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-sm; }
.badge { @apply inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider; }
.badge-cyan { @apply border-cyan-500/30 bg-cyan-500/10 text-cyan-300; }
.input-field { @apply w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary; }
.textarea-field { @apply resize-none min-h-[120px]; }
.btn-primary { @apply inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(14,165,233,0.25)] hover:-translate-y-0.5 transition-all disabled:opacity-50; }
.btn-secondary { @apply inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition-all; }
.btn-upload { @apply relative inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 cursor-pointer; }

FormField { @apply flex flex-col gap-2; }
FormField label { @apply text-sm font-semibold text-slate-300; }
FormField p { @apply mt-1 text-xs text-slate-500; }

ProjectCard { @apply relative; }
</style>