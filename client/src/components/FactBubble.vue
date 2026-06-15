<template>
  <!--
    FactBubble.vue — Vintage Museum Info Popup
    Fixed-position bubble that fades in from bottom-right.
    Phase 1: static placeholder fact. Phase 4: dynamic facts from dataset.
  -->
  <Transition name="bubble">
    <div v-if="visible"
         class="fixed bottom-6 right-6 w-64 bg-museum-aged border-2 border-gold-dim rounded-lg p-5 shadow-placard z-50">

      <button @click="visible = false"
              class="absolute top-1 right-2 text-museum-label hover:text-bamboo-900 text-lg leading-none"
              aria-label="Close fact bubble">
        &times;
      </button>

      <p class="font-heading text-[0.65rem] font-bold text-museum-sienna uppercase tracking-[0.15em] mb-2">
        Did You Know?
      </p>
      <p class="font-placard text-sm text-museum-placard leading-relaxed">
        Between 1957 and 1982, China gifted 24 giant pandas to 9 countries as symbols of diplomatic friendship — a practice that ended when China shifted to conservation-based loans.
      </p>
    </div>
  </Transition>
</template>

<script setup>
/**
 * FactBubble.vue
 *
 * Phase 1: Auto-reveals after 800ms with a static fact.
 * Phase 4: Accepts dynamic fact content via props.
 */
import { ref, onMounted } from 'vue';

const visible = ref(false);

onMounted(() => {
  // Museum "unveil" delay
  setTimeout(() => { visible.value = true; }, 800);
});
</script>

<style scoped>
/* Bubble transition — fade + slide up */
.bubble-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.bubble-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.bubble-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.bubble-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>