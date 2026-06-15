<template>
  <!--
    App.vue — Root Layout Shell
    Phase 1: Museum-styled skeleton with sidebar + main content grid.
    Future phases fill placeholder slots with live components.
  -->
  <div class="min-h-screen flex flex-col">

    <!-- ═══ Site Header: Museum Entrance ═══ -->
    <SiteHeader />

    <!-- ═══ Exhibit Subtitle Banner ═══ -->
    <ExhibitBanner />

    <!-- ═══ Main Grid: Sidebar + Content ═══ -->
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr]">

      <!-- Sidebar -->
      <Sidebar />

      <!-- Main Content Area -->
      <main class="flex flex-col">
        <!-- Map Placeholder -->
        <MapPlaceholder />

        <!-- Timeline Placeholder -->
        <TimelinePlaceholder />
      </main>

    </div>

    <!-- ═══ Fact Bubble ═══ -->
    <FactBubble />

    <!-- ═══ Footer ═══ -->
    <SiteFooter />

  </div>
</template>

<script setup>
/**
 * App.vue — Root component composition
 * Imports all top-level layout components.
 * Phase 1: placeholders only. Phase 2+: live data components.
 */
import SiteHeader        from './components/SiteHeader.vue';
import ExhibitBanner     from './components/ExhibitBanner.vue';
import Sidebar           from './components/Sidebar.vue';
import MapPlaceholder    from './components/MapPlaceholder.vue';
import TimelinePlaceholder from './components/TimelinePlaceholder.vue';
import FactBubble        from './components/FactBubble.vue';
import SiteFooter        from './components/SiteFooter.vue';
</script>