<template>
  <!--
    TimelineSidebar.vue — Historical Era Timeline (Stub)
    Vertical timeline synced with the map.
    Phase 3: Layout shell with era labels + API health check.
    Phase 4+: Interactive era markers, scroll-sync, program entries.
  -->
  <aside class="bg-gradient-to-b from-bamboo-700 to-bamboo-800 text-museum-parchment p-6 border-r-2 border-gold-dim overflow-y-auto" style="min-height: 100%;">
    <h3 class="sidebar-header">Exhibit Index</h3>
    <div class="placeholder-slot">Era Navigator — Phase 4</div>

    <h3 class="sidebar-header">Country Index</h3>
    <div class="placeholder-slot">Country List — Phase 4</div>

    <h3 class="sidebar-header">Recall Categories</h3>
    <div class="placeholder-slot">Filter Panel — Phase 4</div>

    <!-- Timeline era markers -->
    <div class="mt-6 pt-4 border-t border-gold-leaf/20">
      <h3 class="sidebar-header">Diplomacy Eras</h3>
      <ul class="space-y-3 mt-2">
        <li class="flex items-start gap-3">
          <span class="inline-block w-3 h-3 rounded-full bg-museum-sienna mt-1 flex-shrink-0"></span>
          <div>
            <p class="font-heading text-sm text-museum-parchment">Gift Era</p>
            <p class="font-placard text-xs text-museum-parchment/50">1957 – 1982</p>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <span class="inline-block w-3 h-3 rounded-full bg-gold-leaf mt-1 flex-shrink-0"></span>
          <div>
            <p class="font-heading text-sm text-museum-parchment">Short Lease Era</p>
            <p class="font-placard text-xs text-museum-parchment/50">1982 – 1994</p>
          </div>
        </li>
        <li class="flex items-start gap-3">
          <span class="inline-block w-3 h-3 rounded-full bg-bamboo-400 mt-1 flex-shrink-0"></span>
          <div>
            <p class="font-heading text-sm text-museum-parchment">Modern Conservation</p>
            <p class="font-placard text-xs text-museum-parchment/50">1994 – Present</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- API Connection Status -->
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
 * TimelineSidebar.vue — Stub
 *
 * Replaces the old Sidebar.vue with a proper timeline-aware layout.
 * Era markers shown with color-coded dots.
 * Phase 4: Interactive — clicking an era filters the map + program list.
 */
import { ref, onMounted } from 'vue';
import { fetchHealth } from '../services/api.js';

const apiStatus = ref('loading');

onMounted(async () => {
  try {
    const res = await fetchHealth();
    // Axios interceptor returns response.data, so res = { status: 'ok', ... }
    apiStatus.value = res.status === 'ok' ? 'ok' : 'error';
  } catch {
    apiStatus.value = 'error';
  }
});
</script>