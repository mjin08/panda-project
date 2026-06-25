<template>
  <!--
    CountryInfoModal.vue — Vintage Museum Info Bubble (Stub)
    Opens when a country hotspot is clicked on the map.
    Phase 3: Layout shell with museum placard styling.
    Phase 4+: Populated dynamically with country + panda program data.
  -->
  <Transition name="modal">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-bamboo-900/60 backdrop-blur-sm" @click="$emit('close')"></div>

      <!-- Modal card — museum placard style -->
      <div class="relative bg-museum-aged border-2 border-gold-leaf rounded-lg shadow-exhibit max-w-lg w-full p-6 z-10">
        <!-- Close button -->
        <button @click="$emit('close')"
                class="absolute top-3 right-4 text-museum-label hover:text-bamboo-900 text-xl leading-none"
                aria-label="Close modal">
          &times;
        </button>

        <!-- Country name (placard heading) -->
        <p class="font-heading text-xs font-bold text-museum-sienna uppercase tracking-[0.15em] mb-1">
          Exhibit Entry
        </p>
        <h2 class="font-heading text-2xl font-bold text-bamboo-700 mb-3">
          {{ countryName || 'Country Name' }}
        </h2>

        <div class="gold-divider"></div>

        <!-- Placeholder content -->
        <div class="mt-4 space-y-3">
          <p class="placard-text italic text-museum-label">
            Panda program details will appear here — Phase 4
          </p>
          <div class="placeholder-slot">Panda pair info — Phase 4</div>
          <div class="placeholder-slot">Cub records — Phase 4</div>
          <div class="placeholder-slot">Diplomatic context — Phase 4</div>
        </div>

        <!-- Status badge -->
        <div class="mt-4 flex gap-2">
          <span class="inline-block text-xs font-placard px-2 py-1 rounded bg-bamboo-400/20 text-bamboo-600">
            Status: —
          </span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
/**
 * CountryInfoModal.vue — Stub
 *
 * Vintage museum info bubble that opens on country hotspot click.
 * Phase 4: Accept `countryId` prop, fetch data from API,
 * render panda pair names, cubs, dates, diplomatic context.
 *
 * Props:
 *   visible     — Boolean, controls modal visibility
 *   countryName — String, displayed in the heading
 *
 * Emits:
 *   close       — Fired when backdrop or × button is clicked
 */
defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  countryName: {
    type: String,
    default: ''
  }
});

defineEmits(['close']);
</script>

<style scoped>
/* Modal transition — fade + scale */
.modal-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.modal-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.modal-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>