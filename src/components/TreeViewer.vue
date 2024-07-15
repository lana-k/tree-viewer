<script setup>
import * as d3 from 'd3'
import { ref, watch, nextTick, computed, onMounted } from 'vue'
import { truncateString } from '@/lib/utils.js'

const props = defineProps({
  hierarchyData: {
    type: Object,
    required: true
  },
  direction: {
    type: String,
    required: false,
    default: 'left-right'
  }
})
const emit = defineEmits(['node-selected', 'node-deselected'])

const tree = ref(null)
const root = ref(null)
const nodes = ref([])
const links = ref([])
const svgRef = ref([])

const boxWidth = 150
const boxHeight = 40
const maxNameLength = 12
const nodeGap = 50
const minScale = 0.1
const maxScale = 1.5

function elbow (link) {
  if (props.direction === 'left-right') {
    return (
      'M' + link.source.y + ',' + link.source.x +
      'H' + (link.source.y + (link.target.y - link.source.y) / 2) +
      'V' + link.target.x +
      'H' + link.target.y
    )
  } else {
    return (
      'M' + link.source.x + ',' + link.source.y +
      'V' + (link.source.y + (link.target.y - link.source.y) / 2) +
      'H' + link.target.x +
      'V' + link.target.y
    )
  }
}

function getNodeTranslate (node) {
  if (props.direction === 'left-right') {
    return `translate(${node.y},${node.x})`
  } else {
    return `translate(${node.x},${node.y})`
  }
}

const treeLayoutNodeSize = computed(() => props.direction === 'left-right'
    ? [boxHeight + nodeGap, boxWidth + nodeGap]
    : [boxWidth + nodeGap, boxHeight + nodeGap]
)
const isEmptyHierarchy = computed(
  () => !props.hierarchyData || props.hierarchyData.length === 0
)

const zoom = d3.zoom()
  .scaleExtent([minScale, maxScale])
  .on('zoom', e => {
    d3.select(svgRef.value).select('g').attr('transform', e.transform)
  })

function buildTree () {
    if (isEmptyHierarchy.value) {
      links.value = []
      nodes.value = []
      return
    }

    root.value = d3.stratify()
      .id(d => d.name)
      .parentId(d => d.parent)(props.hierarchyData)

    tree.value = d3.tree().nodeSize(treeLayoutNodeSize.value)
    tree.value(root.value)
    
    links.value = root.value.links()
    nodes.value = root.value.descendants()
}

function zoomToFit () {
    const d3Svg = d3.select(svgRef.value)
    const box = d3Svg.select('g').node().getBBox()
    const svgBox = svgRef.value.getBoundingClientRect()

    const scale = Math.min(svgBox.width / box.width, svgBox.height / box.height)
    
    
    const transform = d3.zoomIdentity
      .translate(svgBox.width / 2, svgBox.height / 2)
      .scale(Math.min(Math.max(scale, minScale), 1))
      .translate(-box.x - box.width / 2, -box.y - box.height / 2)

    d3Svg.call(zoom.transform, transform)	
}

onMounted(async () => {
  if (!isEmptyHierarchy.value) {
    buildTree()
    await nextTick()
    zoomToFit()
  }
  d3.select(svgRef.value).call(zoom)
})

watch(() => props.hierarchyData, async () => {
  buildTree()
  await nextTick()
  zoomToFit()
})

watch(() => props.direction, async () => {
  if (isEmptyHierarchy.value) {
    return
  }
  tree.value.nodeSize(treeLayoutNodeSize.value)
  tree.value(root.value)
  
  await nextTick()
  zoomToFit()
})

function toggleNodeSelection (node) {
  const nodeElement = node.el
  if (nodeElement.dataset.selected === 'true') {
    nodeElement.dataset.selected = 'false'
    emit('node-deselected', node)
  } else {
    nodeElement.dataset.selected = 'true'
    emit('node-selected', node)
  }
}
defineExpose({
  toggleNodeSelection
})

</script>

<template>
  <div class="svg-container">
    <svg ref="svgRef" width="100%" height="100%">
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
          :transform="getNodeTranslate(node)"
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
            {{ truncateString(node.data.name, maxNameLength) }}
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
  background-color: var(--color-background);
}

.node rect {
  fill: var(--color-background);
  stroke: var(--color-border);
  stroke-width: 1px;
  cursor: pointer;
}

.node rect:hover {
  stroke: var(--color-border-hover);
}

.node[data-selected="true"] rect {
  fill: var(--color-primary);
}
.node[data-selected="true"] text {
  fill: var(--color-text-dark);
}

.node {
  font-size: 14px;
}

:deep(.link) {
  fill: none;
  stroke: var(--color-border);
  stroke-width: 1.5px;
}
.name {
  pointer-events: none;
}
</style>
