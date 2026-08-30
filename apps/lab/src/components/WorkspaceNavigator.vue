<script setup lang="ts">
function move(event: MouseEvent, selector: string) { const local = (event.currentTarget as HTMLElement).closest('.simulator-workspace'); (local ?? document.querySelector('.simulator-workspace'))?.querySelector<HTMLElement>(selector)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }) }
</script>
<template><nav class="workspace-navigator" aria-label="Simulator sections"><button type="button" @click="move($event, '.comparison-controls')">Controls</button><button type="button" @click="move($event, '.why-panel')">Why?</button><button type="button" @click="move($event, '.comparison-results')">Result</button></nav></template>
