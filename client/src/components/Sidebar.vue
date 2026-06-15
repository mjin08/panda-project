<template>
  <!--
    Sidebar.vue — Exhibit Navigation Panel
    Dark bamboo sidebar with gold-leaf section headers.
    Phase 1: placeholder slots for future filter/nav components.
  -->
  <aside class="bg-gradient-to-b from-bamboo-700 to-bamboo-800 text-museum-parchment p-6 border-r-2 border-gold-dim">
    <h3 class="sidebar-header">Exhibit Index</h3>
    <div class="placeholder-slot">Era Navigator — Phase 2</div>

    <h3 class="sidebar-header">Country Index</h3>
    <div class="placeholder-slot">Country List — Phase 3</div>

    <h3 class="sidebar-header">Recall Categories</h3>
    <div class="placeholder-slot">Filter Panel — Phase 4</div>

    <!-- API Connection Status — Phase 1 debug aid -->
    <div class="mt-8 pt-4 border-t border-gold-leaf/20">
      <h3 class="sidebar-header">API Status</h3>
      <div class="font-placard text-xs mt-2">
        <span v-if="apiStatus === 'loading'" class="text-gold-leaf animate-pulse">Connecting...</span>
        <span v-else-if="apiStatus === 'ok'" class="text-bamboo-400">✓ Backend connected</span>
        <span v-else class="text-museum-sienna">✗ Backend unreachable</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
/**
 * Sidebar.vue
 *
 * Phase 1: Shows placeholder sections + live API health check.
 * Future phases: replace placeholders with interactive filters
 * and country/era navigation lists.
 */
import { ref, onMounted } from 'vue';
import { fetchHealth } from '../services/api.js';

const apiStatus = ref('loading');

onMounted(async () => {
  try {
    const res = await fetchHealth();
    apiStatus.value = res.status === 'ok' ? 'ok' : 'error';
  } catch {
    apiStatus.value = 'error';
  }
});
</script>