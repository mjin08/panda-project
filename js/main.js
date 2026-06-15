/* ==========================================================
   PANDA DIPLOMACY GLOBAL TRACKER — Main Application Logic
   Phase 1: Structural Skeleton (Placeholder Init)
   ========================================================== */

const PandaTracker = {
  version: '0.1.0',
  phase: 1,

  /**
   * Application bootstrap — called on DOMContentLoaded.
   * Each phase will layer additional init calls here.
   */
  init() {
    console.log(`[PandaTracker v${this.version}] Phase ${this.phase} skeleton loaded.`);
    this._initFactBubble();
  },

  /**
   * Fact Bubble UI — vintage museum info popup.
   * Phase 1: Renders a static placeholder bubble to verify layout.
   * Future phases: dynamically populated from dataset.
   */
  _initFactBubble() {
    const bubble = document.getElementById('fact-bubble');
    if (!bubble) return;

    // Show the placeholder bubble after a brief delay (museum "unveil" effect)
    setTimeout(() => {
      bubble.classList.add('fact-bubble--visible');
    }, 800);

    // Close button
    const closeBtn = bubble.querySelector('.fact-bubble__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        bubble.classList.remove('fact-bubble--visible');
      });
    }
  }
};

/* --- Bootstrap on page load --- */
document.addEventListener('DOMContentLoaded', () => {
  PandaTracker.init();
});