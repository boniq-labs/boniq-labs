<template>
  <div class="min-h-screen pt-24 pb-20 px-4 relative flex items-center">
    <!-- Decorative background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <div class="max-w-5xl mx-auto w-full relative z-10">
      <header class="text-center mb-12 animate-fade-in-up">
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold uppercase tracking-wider mb-6">Get In Touch</span>
        <h2 class="section-title">Let's Build Something</h2>
        <p class="mt-4 max-w-2xl mx-auto text-slate-400 text-lg">Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.</p>
      </header>

      <div class="glass-card rounded-3xl overflow-hidden animate-fade-in-up" style="animation-delay: 0.2s;">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <!-- Left sidebar info -->
          <div class="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-950 p-8 lg:p-12 border-r border-white/10 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
            
            <h3 class="text-2xl font-bold text-white mb-8">Let's Connect</h3>
            
            <div class="space-y-6">
              <ContactInfoItem 
                v-for="item in contactItems" 
                :key="item.label"
                :icon="item.icon"
                :label="item.label"
                :value="item.value"
                :href="item.href"
              />
            </div>

            <div class="mt-10 pt-8 border-t border-white/10">
              <h4 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Follow Me</h4>
              <div class="flex gap-3">
                <SocialLink v-for="social in socialLinks" :key="social.name" :social="social" />
              </div>
            </div>
          </div>
          
          <!-- Right form -->
          <div class="lg:col-span-1 p-8 lg:p-12">
            <h3 class="text-2xl font-bold text-white mb-8">Send a Message</h3>
            
            <form @submit.prevent="submitMessage" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Name" :required="true">
                  <input 
                    type="text" 
                    id="name" 
                    v-model="formData.name" 
                    required 
                    class="input-field"
                    placeholder="Your name"
                  />
                </FormField>
                
                <FormField label="Email" :required="true">
                  <input 
                    type="email" 
                    id="email" 
                    v-model="formData.email" 
                    required 
                    class="input-field"
                    placeholder="your@email.com"
                  />
                </FormField>
              </div>
              
              <FormField label="Subject" :required="true">
                <input 
                  type="text" 
                  id="subject" 
                  v-model="formData.subject" 
                  required 
                  class="input-field"
                  placeholder="What's this about?"
                />
              </FormField>
              
              <FormField label="Message" :required="true">
                <textarea 
                  id="content" 
                  v-model="formData.content" 
                  rows="5" 
                  required 
                  class="input-field textarea-field"
                  placeholder="Tell me about your project..."
                ></textarea>
              </FormField>
              
              <button type="submit" class="btn-primary w-full py-4" :disabled="loading">
                <span v-if="!loading" class="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  Send Message
                </span>
                <span v-else class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Sending...
                </span>
              </button>
              
              <Toast v-if="successMsg" type="success" :message="successMsg" @close="successMsg = ''" />
              <Toast v-if="errorMsg" type="error" :message="errorMsg" @close="errorMsg = ''" />
            </form>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
        <InfoCard 
          icon="⚡" 
          title="Fast Response" 
          description="I typically respond within 24 hours during business days." 
        />
        <InfoCard 
          icon="🌍" 
          title="Remote Friendly" 
          description="Available for remote work and collaboration across time zones." 
        />
        <InfoCard 
          icon="🤝" 
          title="Open to Ideas" 
          description="Whether it's a small fix or a large project, let's discuss." 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import api from '@/api/api';
import { useAuthStore } from '../stores/auth';

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  content: ''
});

const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');
const profile = ref({});

const contactItems = computed(() => [
  { 
    label: 'Email', 
    value: profile.value.email || 'hello@boniq.dev', 
    icon: '📧', 
    href: `mailto:${profile.value.email || 'hello@boniq.dev'}` 
  },
  { 
    label: 'Location', 
    value: profile.value.location || 'Remote / Worldwide', 
    icon: '📍', 
    href: null 
  },
  { 
    label: 'Availability', 
    value: 'Open for freelance & full-time', 
    icon: '⏰', 
    href: null 
  },
]);

const socialLinks = computed(() => [
  { name: 'GitHub', icon: '🐙', url: profile.value.github || '#' },
  { name: 'LinkedIn', icon: '💼', url: profile.value.linkedin || '#' },
  { name: 'Twitter', icon: '🐦', url: profile.value.twitter || '#' },
  { name: 'Dribbble', icon: '🏀', url: profile.value.dribbble || '#' },
]);

const submitMessage = async () => {
  loading.value = true;
  successMsg.value = '';
  errorMsg.value = '';
  
  try {
    await api.post('/api/messages', formData);
    successMsg.value = 'Message sent successfully! I\'ll get back to you soon.';
    formData.name = '';
    formData.email = '';
    formData.subject = '';
    formData.content = '';
    loading.value = false;
  } catch (err) {
    errorMsg.value = err.response?.data?.message || 'Failed to send message. Please try again.';
    loading.value = false;
  }
};

onMounted(async () => {
  try {
    const { data } = await api.get('/api/profile');
    if (data) profile.value = data;
  } catch (e) {
    console.error('Failed to load profile', e);
  }
});
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.glass-card {
  @apply rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl;
}

.input-field {
  @apply w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary;
}

.textarea-field {
  @apply resize-none min-h-[120px];
}

.btn-primary {
  @apply inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(59,130,246,0.25)] hover:-translate-y-0.5 transition-all disabled:opacity-50;
}

.ContactInfoItem, .SocialLink, .FormField, .Toast, .InfoCard {
  @apply relative;
}

.glass-card {
  @apply rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl;
}
</style>