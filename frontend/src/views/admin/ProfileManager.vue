<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <span class="badge badge-sky">Profile Editor</span>
        <h1 class="mt-2 text-3xl font-display font-extrabold text-white">Public Identity & Contact Details</h1>
        <p class="mt-1 text-sm text-slate-400">Controls the hero copy, biography, social links, CV, avatar, and SEO shown across the site.</p>
      </div>
      <div class="card-sm text-right">
        <div class="text-xs uppercase tracking-wider text-slate-500">Completion</div>
        <div class="mt-1 text-3xl font-black text-white">{{ profileCompletion }}%</div>
      </div>
    </div>

    <div class="grid gap-8 lg:grid-cols-[1.35fr_0.75fr]">
      <!-- Main Form -->
      <div class="card">
        <form @submit.prevent="saveProfile" class="space-y-8">
          <!-- Basic Info -->
          <fieldset>
            <legend class="text-lg font-semibold text-white mb-6">Basic Information</legend>
            <div class="grid gap-6 sm:grid-cols-2">
              <FormField label="Display Name" :required="true">
                <input v-model="form.name" type="text" class="input-field" placeholder="Your name" required />
              </FormField>
              <FormField label="Professional Title" :required="true">
                <input v-model="form.role" type="text" class="input-field" placeholder="Full-Stack Software Engineer" required />
              </FormField>
              <FormField label="Greeting">
                <input v-model="form.greeting" type="text" class="input-field" placeholder="Hi, I'm" />
              </FormField>
              <FormField label="Email">
                <input v-model="form.email" type="email" class="input-field" placeholder="you@example.com" />
              </FormField>
              <FormField label="Phone">
                <input v-model="form.phone" type="tel" class="input-field" placeholder="+1 (555) 000-0000" />
              </FormField>
              <FormField label="Location">
                <input v-model="form.location" type="text" class="input-field" placeholder="City, Country" />
              </FormField>
              <FormField label="CV / Resume URL" class="sm:col-span-2">
                <div class="flex gap-3">
                  <input v-model="form.cvUrl" type="url" class="input-field flex-1" placeholder="https://example.com/resume.pdf" />
                  <label class="btn-upload">
                    <input type="file" accept=".pdf,.doc,.docx" class="absolute inset-0 cursor-pointer opacity-0" @change="handleFileUpload($event, 'cv')" />
                    <span v-if="uploading.cv" class="flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>Uploading...</span>
                    <span v-else>Upload CV</span>
                  </label>
                </div>
                <p v-if="form.cvUrl" class="mt-2 text-xs text-slate-400">Current: <a :href="form.cvUrl" target="_blank" class="text-cyan-300 hover:underline">{{ form.cvUrl }}</a></p>
              </FormField>
            </div>
          </fieldset>

          <!-- Biography -->
          <fieldset>
            <legend class="text-lg font-semibold text-white mb-6">Biography</legend>
            <FormField label="About You" class="sm:col-span-2">
              <textarea v-model="form.bio" rows="6" class="input-field textarea-field" placeholder="Tell your story..."></textarea>
            </FormField>
          </fieldset>

          <!-- Avatar -->
          <fieldset>
            <legend class="text-lg font-semibold text-white mb-6">Avatar & Branding</legend>
            <div class="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
              <div class="card-sm">
                <div class="text-sm font-semibold text-white mb-4">Avatar Preview</div>
                <div class="flex flex-col items-center gap-4">
                  <div class="relative">
                    <div v-if="form.avatarUrl" class="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/50">
                      <img :src="form.avatarUrl" alt="Avatar" class="w-full h-full object-cover" />
                    </div>
                    <div v-else class="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-black text-white">
                      {{ profileInitials }}
                    </div>
                    <button type="button" @click="removeAvatar" v-if="form.avatarUrl" class="absolute -bottom-2 -right-2 p-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors" aria-label="Remove avatar">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <label class="btn-upload w-full">
                    <input type="file" accept="image/*" class="absolute inset-0 cursor-pointer opacity-0" @change="handleFileUpload($event, 'avatar')" />
                    <span v-if="uploading.avatar" class="flex items-center justify-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>Uploading...</span>
                    <span v-else>Select Avatar Image</span>
                  </label>
                </div>
              </div>

              <div class="card-sm">
                <div class="text-sm font-semibold text-white mb-4">Social Links</div>
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <SocialInput v-model="form.linkedin" label="LinkedIn" placeholder="https://linkedin.com/in/..." icon="💼" />
                  <SocialInput v-model="form.github" label="GitHub" placeholder="https://github.com/..." icon="🐙" />
                  <SocialInput v-model="form.twitter" label="Twitter / X" placeholder="https://x.com/..." icon="🐦" />
                  <SocialInput v-model="form.instagram" label="Instagram" placeholder="https://instagram.com/..." icon="📷" />
                  <SocialInput v-model="form.dribbble" label="Dribbble" placeholder="https://dribbble.com/..." icon="🏀" />
                  <SocialInput v-model="form.whatsapp" label="WhatsApp" placeholder="https://wa.me/..." icon="💬" />
                </div>
              </div>
            </div>
          </fieldset>

          <!-- SEO -->
          <fieldset>
            <legend class="text-lg font-semibold text-white mb-6">SEO Settings</legend>
            <div class="grid gap-6">
              <FormField label="SEO Title">
                <input v-model="form.seoTitle" type="text" class="input-field" placeholder="boniq - Full Stack Developer Portfolio" />
              </FormField>
              <FormField label="SEO Description">
                <textarea v-model="form.seoDescription" rows="3" class="input-field textarea-field" placeholder="Full Stack Developer portfolio showcasing projects, skills, and experience."></textarea>
              </FormField>
              <FormField label="SEO Keywords (comma separated)">
                <input v-model="form.seoKeywords" type="text" class="input-field" placeholder="developer, portfolio, full stack, web development" />
              </FormField>
            </div>
          </fieldset>

          <!-- Logo & Favicon -->
          <fieldset>
            <legend class="text-lg font-semibold text-white mb-6">Brand Assets</legend>
            <div class="grid gap-6 lg:grid-cols-2">
              <AssetUpload 
                label="Site Logo" 
                :url="form.logoUrl" 
                @upload="(e) => handleFileUpload(e, 'logo')" 
                @remove="removeLogo"
                :uploading="uploading.logo"
                help="Displayed in navbar and footer. Recommended: 200x60px, PNG/SVG with transparency."
              />
              <AssetUpload 
                label="Favicon" 
                :url="form.faviconUrl" 
                @upload="(e) => handleFileUpload(e, 'favicon')" 
                @remove="removeFavicon"
                :uploading="uploading.favicon"
                help="Browser tab icon. Recommended: 32x32px or 16x16px, ICO/PNG format."
              />
            </div>
          </fieldset>

          <!-- Site URL -->
          <fieldset>
            <legend class="text-lg font-semibold text-white mb-6">Site URL</legend>
            <FormField label="Canonical Site URL">
              <input v-model="form.siteUrl" type="url" class="input-field" placeholder="https://boniq.dev" />
              <p class="mt-1 text-xs text-slate-500">Used for SEO canonical URLs and social sharing.</p>
            </FormField>
          </fieldset>

          <!-- Actions -->
          <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <p class="text-sm text-slate-500">Changes save directly to the live profile data used by the homepage, about page, and contact links.</p>
            <button type="submit" class="btn-primary" :disabled="saving">
              <span v-if="saving" class="flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>Saving...</span>
              <span v-else>Save Profile</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Sidebar -->
      <div class="space-y-8">
        <!-- Completion Checklist -->
        <div class="card">
          <div class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Completion Checklist</div>
          <div class="space-y-3">
            <ChecklistItem v-for="item in profileChecklist" :key="item.label" :label="item.label" :complete="item.complete" />
          </div>
        </div>

        <!-- Public Preview Impact -->
        <div class="card">
          <div class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">Public Preview Impact</div>
          <div class="space-y-3 text-sm text-slate-400">
            <p>The homepage hero uses your greeting, name, role, bio, avatar, and social links.</p>
            <p>The About page displays your full biography, avatar, and contact details.</p>
            <p>The Contact page shows your email, location, and social links.</p>
            <p>SEO title, description, and keywords affect search engine rankings.</p>
            <p>Logo appears in navbar and footer. Favicon shows in browser tabs.</p>
            <p>The CV URL provides a downloadable resume for visitors.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps(['refreshKey']);
const showToast = inject('toast')?.show || (() => {});
const getAuthConfig = inject('auth')?.getAuthConfig || (() => ({}));

const form = ref({
  name: '',
  greeting: '',
  role: '',
  bio: '',
  avatarUrl: '',
  cvUrl: '',
  email: '',
  phone: '',
  location: '',
  whatsapp: '',
  linkedin: '',
  github: '',
  twitter: '',
  instagram: '',
  dribbble: '',
  logoUrl: '',
  faviconUrl: '',
  siteUrl: '',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
});

const saving = ref(false);
const uploading = ref({ avatar: false, cv: false, logo: false, favicon: false });
const profileInitials = computed(() => {
  const name = form.value.name || 'boniq';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
});

const profileChecklist = computed(() => {
  const data = form.value;
  return [
    { label: 'Display name', complete: !!data.name },
    { label: 'Greeting', complete: !!data.greeting },
    { label: 'Professional title', complete: !!data.role },
    { label: 'Biography', complete: !!data.bio },
    { label: 'Avatar', complete: !!data.avatarUrl },
    { label: 'Email', complete: !!data.email },
    { label: 'Location', complete: !!data.location },
    { label: 'CV link', complete: !!data.cvUrl },
    { label: 'LinkedIn', complete: !!data.linkedin },
    { label: 'GitHub', complete: !!data.github },
    { label: 'Logo', complete: !!data.logoUrl },
    { label: 'Favicon', complete: !!data.faviconUrl },
    { label: 'SEO Title', complete: !!data.seoTitle },
    { label: 'SEO Description', complete: !!data.seoDescription },
  ];
});

const profileCompletion = computed(() => {
  if (profileChecklist.value.length === 0) return 0;
  const complete = profileChecklist.value.filter(i => i.complete).length;
  return Math.round((complete / profileChecklist.value.length) * 100);
});

const loadProfile = async () => {
  try {
    const res = await axios.get('/api/profile');
    if (res.data) {
      Object.keys(form.value).forEach(key => {
        if (res.data[key] !== undefined) form.value[key] = res.data[key];
      });
    }
  } catch (e) {
    console.error('Failed to load profile:', e);
  }
};

const handleFileUpload = async (event, type) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);
  uploading.value[type] = true;

  try {
    const res = await axios.post('/api/upload', formData, getAuthConfig());
    const url = typeof res.data === 'string' ? res.data : res.data?.url;
    if (type === 'avatar') form.value.avatarUrl = url;
    else if (type === 'cv') form.value.cvUrl = url;
    else if (type === 'logo') form.value.logoUrl = url;
    else if (type === 'favicon') form.value.faviconUrl = url;
    showToast('success', `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`);
  } catch (error) {
    showToast('error', error.response?.data?.message || 'Upload failed');
  } finally {
    uploading.value[type] = false;
    event.target.value = '';
  }
};

const removeAvatar = () => { form.value.avatarUrl = ''; };
const removeLogo = () => { form.value.logoUrl = ''; };
const removeFavicon = () => { form.value.faviconUrl = ''; };

const saveProfile = async () => {
  saving.value = true;
  try {
    const res = await axios.put('/api/profile', form.value, getAuthConfig());
    Object.keys(form.value).forEach(key => {
      if (res.data[key] !== undefined) form.value[key] = res.data[key];
    });
    showToast('success', 'Profile saved successfully');
  } catch (error) {
    showToast('error', error.response?.data?.message || 'Failed to save profile');
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  loadProfile();
});
</script>

<style scoped>
.card {
  @apply rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl;
}
.card-sm {
  @apply rounded-xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-sm;
}
.badge {
  @apply inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider;
}
.badge-sky { @apply border-sky-500/30 bg-sky-500/10 text-sky-300; }
.input-field {
  @apply w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary;
}
.textarea-field {
  @apply resize-none min-h-[120px];
}
.btn-primary {
  @apply inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(59,130,246,0.25)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(59,130,246,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed;
}
.btn-upload {
  @apply relative inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 cursor-pointer;
}
.btn-upload input:disabled + span {
  @apply opacity-50 cursor-not-allowed;
}

FormField {
  @apply flex flex-col gap-2;
}
FormField label {
  @apply text-sm font-semibold text-slate-300;
}
FormField p {
  @apply mt-1 text-xs text-slate-500;
}

SocialInput {
  @apply flex flex-col gap-2;
}
SocialInput label {
  @apply flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500;
}
SocialInput input {
  @apply w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary;
}

AssetUpload {
  @apply flex flex-col gap-2;
}
AssetUpload label {
  @apply text-sm font-semibold text-slate-300;
}
AssetUpload .preview {
  @apply flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-900/50;
}
AssetUpload img { @apply h-full w-full object-contain; }
AssetUpload .placeholder { @apply text-3xl font-bold text-white/40; }
AssetUpload .help { @apply text-xs text-slate-500; }

ChecklistItem {
  @apply flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3;
}
ChecklistItem .label { @apply text-sm font-semibold text-white; }
ChecklistItem .status { @apply rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider; }
ChecklistItem .complete { @apply bg-emerald-500/15 text-emerald-300; }
ChecklistItem .incomplete { @apply bg-amber-500/15 text-amber-300; }

.animate-fade-in {
  animation: fadeIn 0.35s ease forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>