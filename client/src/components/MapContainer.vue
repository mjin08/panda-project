<template>
  <!--
    MapContainer.vue — Interactive World Map (Stub)
    Phase 3: Layout shell + Leaflet map mount point.
    Phase 4+: Country hotspots, color-coded markers, click handlers.
  -->
  <div class="bg-museum-parchment/80 border-b border-bamboo-300 relative" style="min-height: 480px;">
    <!-- Leaflet map will mount here -->
    <div id="panda-map" class="w-full h-full absolute inset-0" style="min-height: 480px; z-index: 1;">
    </div>

    <!-- Overlay: placeholder until Leaflet is wired up -->
    <div v-if="!mapReady" class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div class="text-center text-museum-label">
        <div class="text-5xl mb-4 opacity-30">🌏</div>
        <p class="font-placard italic text-base">Interactive World Map</p>
        <p class="font-placard text-xs opacity-50 mt-1">Leaflet map with clickable country hotspots — Phase 4</p>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * MapContainer.vue — Stub
 *
 * Provides the DOM mount point for Leaflet.
 * `mapReady` controls the placeholder overlay visibility.
 * Phase 4 will initialize Leaflet here, fetch country coordinates,
 * and render color-coded markers (Active=green, Returned=amber, Recalled=red).
 */
import { ref } from 'vue';

const mapReady = ref(false);
</script>