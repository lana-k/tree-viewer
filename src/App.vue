<script setup>
import TreeViewer from './components/TreeViewer.vue'
import NodeCard from './components/NodeCard.vue'
import { reactive } from 'vue'
const selectedNodes = reactive([])
</script>

<template>
  <div id="app-containner">
    <aside>
      <node-card 
        v-for="node in selectedNodes" 
        :key="node.name"
        :node="node"
      />
    </aside>
    <div id="main-container">
      <header>  
      </header>
      
      <main>
        <tree-viewer />
      </main>
    </div>
  </div>
</template>

<style scoped>
#app-containner {
  display: flex;
}

#main-container {
  flex-grow: 1;
}
</style>
