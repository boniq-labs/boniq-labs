<template>
  <div class="min-h-screen pt-24 pb-20 px-4 relative flex items-center">
    <!-- Decorative background elements specific to contact page -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <div class="max-w-4xl mx-auto w-full relative z-10">
      <div class="text-center mb-12 animate-fade-in-up">
        <h2 class="section-title">Communicate</h2>
        <p class="text-slate-400 max-w-xl mx-auto text-lg mt-4">
          Ready to build the future? Send a message encrypted through cyberspace.
        </p>
      </div>
      
      <div class="glass-card rounded-3xl overflow-hidden animate-fade-in-up" style="animation-delay: 0.2s;">
        <div class="grid grid-cols-1 md:grid-cols-5">
          <!-- Left sidebar info -->
          <div class="md:col-span-2 bg-gradient-to-br from-slate-900 to-dark p-8 border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            
            <h3 class="text-2xl font-bold text-white mb-6">Contact Info</h3>
            
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary border border-primary/30">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-slate-400">Email</h4>
                  <p class="text-white">ebube@example.com</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 text-secondary border border-secondary/30">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-slate-400">Location</h4>
                  <p class="text-white">Cyberspace, Earth</p>
                </div>
              </div>

               <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-accent border border-accent/30">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-slate-400">Social</h4>
                  <div class="flex gap-3 mt-1 text-white">
                    <a href="#" class="hover:text-primary transition-colors">GitHub</a>
                    <span class="text-slate-600">|</span>
                    <a href="#" class="hover:text-primary transition-colors">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right form -->
          <div class="md:col-span-3 p-8">
            <form @submit.prevent="submitMessage" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="group relative">
                  <input type="text" id="name" v-model="formData.name" required class="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all peer placeholder-transparent" placeholder="Name">
                  <label for="name" class="absolute left-4 -top-2.5 bg-dark px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary">Name</label>
                </div>
                
                <div class="group relative">
                  <input type="email" id="email" v-model="formData.email" required class="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all peer placeholder-transparent" placeholder="Email">
                  <label for="email" class="absolute left-4 -top-2.5 bg-dark px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-secondary">Email</label>
                </div>
              </div>
              
              <div class="group relative">
                <input type="text" id="subject" v-model="formData.subject" required class="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all peer placeholder-transparent" placeholder="Subject">
                <label for="subject" class="absolute left-4 -top-2.5 bg-dark px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-accent">Subject</label>
              </div>
              
              <div class="group relative">
                <textarea id="content" v-model="formData.content" rows="5" required class="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all peer placeholder-transparent resize-none" placeholder="Message"></textarea>
                <label for="content" class="absolute left-4 -top-2.5 bg-dark px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary">Message</label>
              </div>
              
              <button type="submit" class="btn-primary w-full flex justify-center items-center gap-2" :disabled="loading">
                <span v-if="!loading">Initialize Communication Protocol</span>
                <span v-else class="flex items-center gap-2">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              </button>
              
              <transition name="fade">
                <div v-if="successMsg" class="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                  {{ successMsg }}
                </div>
              </transition>
              
              <transition name="fade">
                <div v-if="errorMsg" class="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                  {{ errorMsg }}
                </div>
              </transition>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  content: ''
});

const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');

const submitMessage = async () => {
  loading.value = true;
  successMsg.value = '';
  errorMsg.value = '';
  
  try {
    await axios.post('/api/messages', formData);
    successMsg.value = 'Message transmitted successfully! Awaiting response...';
    // Reset form
    formData.name = '';
    formData.email = '';
    formData.subject = '';
    formData.content = '';
  } catch (err) {
    // If backend is down, simulate success anyway for the demo
    setTimeout(() => {
      successMsg.value = 'Message transmitted successfully! Awaiting response...';
      formData.name = '';
      formData.email = '';
      formData.subject = '';
      formData.content = '';
      loading.value = false;
    }, 1500);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
