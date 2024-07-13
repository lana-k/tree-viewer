<script setup>
import TreeViewer from './components/TreeViewer.vue'
import NodeCard from './components/NodeCard.vue'
import { reactive, ref } from 'vue'
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
        <tree-viewer :hierarchy-data="hierarchyData"/>
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
