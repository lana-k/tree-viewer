<script setup>
import * as d3 from "d3"
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  hierarchyData: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['node-selected', 'node-deselected'])

const nodes = ref([])
const links = ref([])

const boxWidth = 150
const boxHeight = 40
const nodeGap = 50
const minScale = 0.1
const maxScale = 1.5

function elbow(d) {
  return (
    'M' + d.source.y + ',' + d.source.x +
    'H' + (d.source.y + (d.target.y - d.source.y) / 2) +
    'V' + d.target.x +
    'H' + d.target.y
  )
}

const zoom = d3.zoom()
  .scaleExtent([minScale, maxScale])
  .on('zoom', e => {
    d3.select('svg g').attr('transform', e.transform)
  })
  
function buildTree () {
    d3.select('svg').call(zoom)

    const root = d3.stratify()
      .id(d => d.name)
      .parentId(d => d.parent)(props.hierarchyData)

    const tree = d3.tree().nodeSize([boxHeight + nodeGap, boxWidth + nodeGap])
    tree(root)
    
    links.value = root.links()
    nodes.value = root.descendants()
}

function zoomToFit () {
    const box = d3.select('svg g').node().getBBox()
    const svgBox = d3.select('svg').node().getBoundingClientRect()

    const scale = Math.min(svgBox.width / box.width, svgBox.height / box.height)
    
    
    const transform = d3.zoomIdentity
      .translate(svgBox.width / 2, svgBox.height / 2)
      .scale(Math.min(Math.max(scale, minScale), 1))
      .translate(-box.x - box.width / 2, -box.y - box.height / 2)
      
    d3.select('svg')
    .call(zoom.transform, transform)
	
}

watch(() => props.hierarchyData, async () => {
  buildTree()
  await nextTick()
  zoomToFit()
})


function toggleNodeSelection(node) {
  const nodeElement = node.el
  if (nodeElement.dataset.selected === "true") {
    nodeElement.dataset.selected = "false"
    emit('node-deselected', node)
  } else {
    nodeElement.dataset.selected = "true"
    emit('node-selected', node)
  }
}
defineExpose({
  toggleNodeSelection
})

</script>

<template>
  <div class="svg-container">
    <svg width="100%" height="100%">
      <g>
        <path  
          v-for="(link, index) in links"
          :key="index"
          class="link"
          :d="elbow(link)"
        />
        <g
          v-for="node in nodes"
          :key="node.name"
          class="node"
          :transform="`translate(${node.y},${node.x})`"
          @click="toggleNodeSelection({ 
            data: node.data, el: $event.target.closest('g')
          })"
        >
          <rect 
            :x="-(boxWidth / 2)" 
            :y="-(boxHeight / 2)" 
            :width="boxWidth" 
            :height="boxHeight"
          />
          <text dx="-65" dy="0" text-anchor="start" class="name">
            {{ node.data.name }}
          </text>
        </g>
        
      </g>
    </svg>
  </div>
</template>



<style scoped>
svg {
  display: block;
}
.svg-container {
  height: 100%;
  border: 1px solid var(--color-border);
}

.node rect {
  fill: var(--color-background);
  stroke: var(--color-border);
  stroke-width: 1px;
}

.node[data-selected="true"] rect {
  fill: var(--vt-c-indigo);
}
.node[data-selected="true"] text {
  fill: var(--vt-c-text-dark-1);
}

.node {
  font-size: 14px;
}

:deep(.link) {
  fill: none;
  stroke: var(--color-border);
  stroke-width: 1.5px;
}
</style>
