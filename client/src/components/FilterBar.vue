<template>
  <!--
    FilterBar.vue — Exhibit Filter Controls (Stub)
    Horizontal bar below the exhibit banner for filtering by era, status, recall reason.
    Phase 3: Layout shell with filter category labels.
    Phase 4+: Dropdowns/selects wired to API query params.
  -->
  <div class="bg-museum-aged border-b border-bamboo-300 px-6 py-3 flex flex-wrap items-center gap-4">
    <!-- Era filter -->
    <div class="flex items-center gap-2">
      <label class="font-heading text-xs text-bamboo-700 uppercase tracking-wider">Era</label>
      <select disabled class="font-placard text-sm bg-museum-parchment border border-bamboo-300 rounded px-2 py-1 text-museum-label cursor-not-allowed">
        <option>All Eras</option>
      </select>
    </div>

    <!-- Status filter -->
    <div class="flex items-center gap-2">
      <label class="font-heading text-xs text-bamboo-700 uppercase tracking-wider">Status</label>
      <select disabled class="font-placard text-sm bg-museum-parchment border border-bamboo-300 rounded px-2 py-1 text-museum-label cursor-not-allowed">
        <option>All Statuses</option>
      </select>
    </div>

    <!-- Recall reason filter -->
    <div class="flex items-center gap-2">
      <label class="font-heading text-xs text-bamboo-700 uppercase tracking-wider">Recall Reason</label>
      <select disabled class="font-placard text-sm bg-museum-parchment border border-bamboo-300 rounded px-2 py-1 text-museum-label cursor-not-allowed">
        <option>All Reasons</option>
      </select>
    </div>

    <!-- Spacer -->
    <div class="flex-1"></div>

    <!-- Result count placeholder -->
    <span class="font-placard text-xs text-museum-label italic">
      Results: — programs
    </span>
  </div>
</template>

<script setup>
/**
 * FilterBar.vue — Stub
 *
 * Phase 3: Static disabled selects with category labels.
 * Phase 4: Enables selects, emits filter changes to parent,
 * parent calls API with query params, results update in real-time.
 *
 * Future props: modelValue bindings for each filter.
 * Future emits: 'filter-change' with { era, status, recallReason }.
 */
</script>