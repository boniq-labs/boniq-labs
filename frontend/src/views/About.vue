<template>
  <div class="min-h-screen pt-24 pb-20 px-4 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <header class="text-center mb-16 animate-fade-in-up">
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold uppercase tracking-wider mb-6">About Me</span>
        <h2 class="section-title">About The Architect</h2>
        <p class="mt-4 max-w-2xl mx-auto text-slate-400 text-lg">Get to know the person behind the code</p>
      </header>
      
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-4 border-slate-700"></div>
          <div class="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>

      <div v-else class="space-y-12">
        <!-- Profile Card & Bio -->
        <div class="flex flex-col lg:flex-row gap-12">
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
                  <p class="text-primary font-medium">{{ profile.role || 'Full-Stack Software Engineer' }}</p>
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
            
            <!-- Quick Facts -->
            <div class="glass-card p-8 rounded-2xl animate-fade-in-up" style="animation-delay: 0.3s;">
              <div class="flex items-center gap-3 mb-6">
                <span class="text-3xl">⚡</span>
                <h3 class="text-3xl font-display font-bold text-white">Quick Facts</h3>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <QuickFact v-for="fact in quickFacts" :key="fact.label" :label="fact.label" :value="fact.value" :icon="fact.icon" />
              </div>
            </div>
          </div>
        </div>

        <!-- Experience Timeline -->
        <section v-if="experience.length > 0" class="animate-fade-in-up" style="animation-delay: 0.4s;">
          <div class="flex items-center gap-3 mb-8">
            <span class="text-3xl">💼</span>
            <h3 class="text-3xl font-display font-bold text-white">Professional Journey</h3>
          </div>
          <div class="glass-card p-6 rounded-2xl">
            <div class="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300/20 before:to-transparent">
              <div v-for="(exp, index) in experience" :key="exp._id" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-dark group-hover:border-primary group-hover:scale-110 transition-all duration-300 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span class="text-lg">{{ getExperienceIcon(index) }}</span>
                </div>
                <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-white/10 transition-all duration-300">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-bold text-lg text-white">{{ exp.title }}</h4>
                    <span class="text-xs font-medium text-primary px-2 py-1 rounded bg-primary/10">{{ formatDateRange(exp.startDate, exp.endDate, exp.current) }}</span>
                  </div>
                  <div class="text-sm font-medium text-slate-400 mb-3 hover:text-white transition-colors">{{ exp.company }}{{ exp.location ? ` · ${exp.location}` : '' }}</div>
                  <p class="text-sm text-slate-400 leading-relaxed">{{ exp.description }}</p>
                  <div v-if="exp.technologies && exp.technologies.length" class="mt-3 flex flex-wrap gap-2">
                    <span v-for="tech in exp.technologies" :key="tech" class="px-2 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full">{{ tech }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Education -->
        <section v-if="education.length > 0" class="animate-fade-in-up" style="animation-delay: 0.5s;">
          <div class="flex items-center gap-3 mb-8">
            <span class="text-3xl">🎓</span>
            <h3 class="text-3xl font-display font-bold text-white">Education</h3>
          </div>
          <div class="glass-card p-6 rounded-2xl">
            <div class="space-y-6">
              <div v-for="edu in education" :key="edu._id" class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-2xl">🎓</div>
                  <div>
                    <h4 class="font-bold text-white">{{ edu.degree }}</h4>
                    <p class="text-slate-400">{{ edu.institution }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-4 text-sm text-slate-400">
                  <span>{{ formatDateRange(edu.startDate, edu.endDate, edu.current) }}</span>
                  <span v-if="edu.grade" class="px-2 py-1 text-xs bg-emerald-500/10 text-emerald-400 rounded-full">{{ edu.grade }}</span>
                  <span v-if="edu.location" class="text-slate-500">{{ edu.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Services/Offerings -->
        <section v-if="services.length > 0" class="animate-fade-in-up" style="animation-delay: 0.6s;">
          <div class="flex items-center gap-3 mb-8">
            <span class="text-3xl">🛠️</span>
            <h3 class="text-3xl font-display font-bold text-white">What I Offer</h3>
          </div>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard v-for="service in services" :key="service._id" :service="service" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/api';

const loading = ref(true);
const profile = ref({});
const experience = ref([]);
const education = ref([]);
const services = ref([]);

const formatBio = (bio) => {
  if (!bio) return '';
  return bio
    .split('\n\n')
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('');
};

const formatDateRange = (start, end, current) => {
  const startDate = start ? new Date(start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
  const endDate = current ? 'Present' : (end ? new Date(end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
  return `${startDate} – ${endDate}`;
};

const getExperienceIcon = (index) => {
  const icons = ['🚀', '💡', '⚙️', '🎯', '🔧'];
  return icons[index % icons.length];
};

const quickFacts = computed(() => [
  { label: 'Years Experience', value: '5+', icon: '📅' },
  { label: 'Projects Completed', value: '50+', icon: '📦' },
  { label: 'Technologies', value: '20+', icon: '⚙️' },
  { label: 'Clients Satisfied', value: '30+', icon: '🤝' },
]);

onMounted(async () => {
  try {
    const [profileRes, expRes, eduRes, svcRes] = await Promise.all([
      api.get('/api/profile').catch(() => ({ data: {} })),
      api.get('/api/experience').catch(() => ({ data: [] })),
      api.get('/api/education').catch(() => ({ data: [] })),
      api.get('/api/services').catch(() => ({ data: [] }))
    ]);
    profile.value = profileRes.data || {};
    experience.value = expRes.data || [];
    education.value = eduRes.data || [];
    services.value = svcRes.data || [];
  } catch (err) {
    console.error('Error fetching about data', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.glass-card {
  @apply rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl;
}
</style>