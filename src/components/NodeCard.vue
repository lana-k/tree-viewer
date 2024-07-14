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
      title="Close"
      class="primary-btn close-btn"
      @click="$emit('close', node)"
    >
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </button>
    <h1>{{ node.data.name }}</h1>
    <p>{{ node.data.description }}</p>
  </div>
</template>

<style scoped>
.node-card {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  position: relative;
  padding: 24px 16px 16px;
}
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
