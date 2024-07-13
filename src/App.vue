<script setup>
import TreeViewer from './components/TreeViewer.vue'
import NodeCard from './components/NodeCard.vue'
import { ref } from 'vue'
import api from '@/api/hierarchyApi';

const hierarchyData = ref([])
async function getHierarchy () {
  try {
    const res = await api.getHierarchy()
    hierarchyData.value = res.data
  } catch (err) {
    console.error(err)
  }
} 
getHierarchy()

const selectedNodes = ref([])
const treeViewerRef = ref(null)

function addSelectedNode(node) {
  selectedNodes.value.push(node)
}

function removeSelectedNode(nodeToRemove) {
  selectedNodes.value = selectedNodes.value
    .filter(node => node.data.name !== nodeToRemove.data.name)
}

function onDetailClose (node) {
  removeSelectedNode(node)
  treeViewerRef.value.toggleNodeSelection(node)
}
</script>

<template>
  <div id="app-containner">
    <aside id="node-details">
      <node-card 
        v-for="node in selectedNodes" 
        :key="node.data.name"
        :node="node"
        @close="onDetailClose"
      />
    </aside>
    <div id="main-container">
      <header>  
      </header>
      
      <main>
        <tree-viewer
          ref="treeViewerRef"
          :hierarchy-data="hierarchyData"
          @node-selected="addSelectedNode($event)"
          @node-deselected="removeSelectedNode($event)"
        />
      </main>
    </div>
  </div>
</template>

<style scoped>
#app-containner {
  display: flex;
  height: 100vh;
}

#main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
#main-container main {
  flex-grow: 1;
  padding: 32px;
}
#node-details {
  min-width: 200px;
  max-width: 400px;
  width: 25vw;
  padding: 16px;
}
</style>
