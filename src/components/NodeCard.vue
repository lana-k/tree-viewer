<script setup>
defineProps({
  node: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="node-card">
    <h1 class="green">{{ node.name }}</h1>
    <p>{{ node.description }}</p>
  </div>
</template>

<style scoped>

</style>
