<script setup>
defineProps({
  node: {
    type: Object,
    required: true
  }
})
defineEmits(['close'])
</script>

<template>
  <div class="node-card">
    <button 
      type="button" 
      @click="$emit('close', node)">
        close
    </button>
    <h1>{{ node.data.name }}</h1>
    <p>{{ node.data.description }}</p>
  </div>
</template>

<style scoped>
.node-card {
  border: 1px solid var(--color-border);
}
</style>
