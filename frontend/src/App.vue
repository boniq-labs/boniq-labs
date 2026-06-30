<template>
  <div class="glow-bg">
    <div class="glow-blob glow-1"></div>
    <div class="glow-blob glow-2"></div>
    <div class="glow-blob glow-3"></div>
  </div>
  
  <div class="app-container relative z-10 flex flex-col min-h-screen">
    <Navbar />
    <main class="main-content flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import api from '@/api/api';
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

onMounted(async () => {
  try {
    const res = await api.get('/api/profile');
    if (res.data) {
      const siteName = res.data.name || 'boniq';
      document.title = `${siteName} - Developer Portfolio`;
      const siteUrl = res.data.siteUrl;
      if (siteUrl) {
        const link = document.querySelector('link[rel="canonical"]') || document.createElement('link');
        link.rel = 'canonical';
        link.href = siteUrl;
        document.head.appendChild(link);
      }
    }
  } catch (e) {}
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
