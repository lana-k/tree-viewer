<script setup>
import TreeViewer from './components/TreeViewer.vue'
import NodeCard from './components/NodeCard.vue'
import { ref } from 'vue'
import api from '@/api/hierarchyApi';

const hierarchyData = ref([])

async function loadHierarchy () {
  try {
    const res = await api.getHierarchy()
    hierarchyData.value = res.data
  } catch (err) {
    console.error(err)
  }
} 
loadHierarchy()

const selectedNodes = ref([])
const treeViewerRef = ref(null)

function addSelectedNode (node) {
  selectedNodes.value.push(node)
}

function removeSelectedNode (nodeToRemove) {
  selectedNodes.value = selectedNodes.value
    .filter(node => node.data.name !== nodeToRemove.data.name)
}

function onDetailClose (node) {
  treeViewerRef.value.toggleNodeSelection(node)
}

const treeDirection = ref('left-right')
function toggleTreeDirection () {
  treeDirection.value = treeDirection.value === 'left-right'
    ? 'top-bottom' : 'left-right'
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
        <button 
          class="primary-btn"
          @click="toggleTreeDirection">
          Toggle tree direction
        </button>  
      </header>
      
      <main>
        <tree-viewer
          ref="treeViewerRef"
          :direction="treeDirection"
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

header {
  padding: 12px 32px;
}

#main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
#main-container main {
  flex-grow: 1;
  padding: 0 32px 32px;
}
#node-details {
  min-width: 200px;
  max-width: 400px;
  max-height: 100%;
  overflow: auto;
  width: 25vw;
  padding: 16px;
}
#node-details > * + * {
	margin-top: 16px;
}
</style>
