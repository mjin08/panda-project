<template>
  <!--
    SiteHeader.vue — Museum Entrance Marquee
    Dark bamboo-green gradient with gold-leaf title and subtitle.
    Decorative vertical lines evoke a museum wall texture.
  -->
  <header class="bg-gradient-to-b from-bamboo-800 to-bamboo-700 border-b-4 border-gold-leaf px-8 py-8 text-center relative overflow-hidden">
    <!-- Decorative vertical lines (museum wall texture) -->
    <div class="absolute inset-0 pointer-events-none"
         style="background: repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(201,168,76,0.06) 48px, rgba(201,168,76,0.06) 50px);">
    </div>

    <h1 class="font-heading font-black text-3xl md:text-4xl text-museum-parchment tracking-wide text-shadow-museum relative z-10">
      Panda Diplomacy Global Tracker
    </h1>
    <p class="font-placard font-light text-gold-leaf text-sm mt-2 tracking-[0.12em] uppercase relative z-10">
      An Interactive Exhibit of China's Giant Panda Loans &amp; Diplomatic Legacy
    </p>
  </header>
</template>