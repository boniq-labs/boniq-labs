<template>
  <div class="min-h-screen pt-24 pb-20 px-4 relative overflow-hidden">
    <div class="max-w-6xl mx-auto relative z-10">
      <h2 class="section-title animate-fade-in-up">About The Architect</h2>
      
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-4 border-slate-700"></div>
          <div class="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-12 mt-12">
        <div class="lg:w-1/3 animate-fade-in-up" style="animation-delay: 0.1s;">
          <div class="glass-card p-1 rounded-3xl sticky top-28">
            <div class="bg-dark rounded-[22px] overflow-hidden relative group">
              <div class="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <img v-if="profile.avatarUrl" :src="profile.avatarUrl" alt="Developer" class="w-full h-auto object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div v-else class="w-full aspect-[4/5] flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                <span class="text-8xl opacity-50 select-none">👨‍💻</span>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-dark to-transparent z-20">
                <h3 class="text-2xl font-bold text-white mb-1">{{ profile.name || 'boniq' }}</h3>
                <p class="text-primary font-medium">{{ profile.role || 'Lead Software Engineer' }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="lg:w-2/3 flex flex-col gap-8">
          <div class="glass-card p-8 rounded-2xl animate-fade-in-up" style="animation-delay: 0.2s;">
            <div class="flex items-center gap-3 mb-6">
              <span class="text-3xl">📖</span>
              <h3 class="text-3xl font-display font-bold text-white">The Genesis</h3>
            </div>
            <div class="space-y-4 text-slate-300 leading-relaxed text-lg">
              <p v-html="formatBio(profile.bio)"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/api';

const loading = ref(true);
const profile = ref({});

const formatBio = (bio) => {
  if (!bio) return '';
  return bio
    .split('\n\n')
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('');
};

onMounted(async () => {
  try {
    const { data } = await api.get('/api/profile');
    if (data) {
      profile.value = data;
    }
  } catch (err) {
    console.error('Error fetching profile', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
</style>
