<template>
  <!--
    App.vue — Root Layout Shell
    Phase 3: Museum layout with proper component architecture.
    Header → FilterBar → (TimelineSidebar | MapContainer) → CountryInfoModal → Footer
  -->
  <div class="min-h-screen flex flex-col">

    <!-- ═══ Site Header: Museum Entrance ═══ -->
    <SiteHeader />

    <!-- ═══ Exhibit Subtitle Banner ═══ -->
    <ExhibitBanner />

    <!-- ═══ Filter Bar ═══ -->
    <FilterBar />

    <!-- ═══ Main Grid: Sidebar + Map ═══ -->
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr]">

      <!-- Timeline Sidebar (replaces old generic Sidebar) -->
      <TimelineSidebar />

      <!-- Main Content: Map + Fact Bubble -->
      <main class="flex flex-col relative">
        <MapContainer />
      </main>

    </div>

    <!-- ═══ Country Info Modal (opens on map hotspot click) ═══ -->
    <CountryInfoModal
      :visible="showModal"
      :countryName="selectedCountry"
      @close="showModal = false"
    />

    <!-- ═══ Fact Bubble ═══ -->
    <FactBubble />

    <!-- ═══ Footer ═══ -->
    <SiteFooter />

  </div>
</template>

<script setup>
/**
 * App.vue — Root component composition
 * Phase 3: Proper component architecture with stubs for map, timeline, modal, filters.
 * State (showModal, selectedCountry) will be managed by a composable in Phase 4+.
 */
import { ref } from 'vue';

import SiteHeader        from './components/SiteHeader.vue';
import ExhibitBanner     from './components/ExhibitBanner.vue';
import FilterBar         from './components/FilterBar.vue';
import TimelineSidebar   from './components/TimelineSidebar.vue';
import MapContainer      from './components/MapContainer.vue';
import CountryInfoModal  from './components/CountryInfoModal.vue';
import FactBubble        from './components/FactBubble.vue';
import SiteFooter        from './components/SiteFooter.vue';

// Modal state — Phase 4 will move this to a composable/store
const showModal       = ref(false);
const selectedCountry = ref('');
</script>