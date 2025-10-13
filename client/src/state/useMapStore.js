import { create } from 'zustand'
import { getMaps, createMap, getFullMap, createNode, updateNode, deleteNode, createLink, deleteLink } from '../api/apiClient'

export const useMapStore = create((set, get) => ({
  currentMapId: null,
  maps: [],
  nodes: [],
  links: [],
  selectedNodeId: null,
  loading: false,

  selectMap: async (mapId) => {
    set({ loading: true, currentMapId: mapId })
    try {
      const { nodes, links } = await getFullMap(mapId)
      set({ nodes, links })
    } finally {
      set({ loading: false })
    }
  },

  fetchMaps: async () => {
    set({ loading: true })
    try {
      const maps = await getMaps()
      set({ maps })
    } finally {
      set({ loading: false })
    }
  },

  addMap: async (title) => {
    const map = await createMap(title)
    set({ maps: [map, ...get().maps] })
    return map
  },

  addNode: async (title, content = '', position = { x: 0, y: 0 }) => {
    const mapId = get().currentMapId
    if (!mapId) return
    const node = await createNode(mapId, { title, content, x_position: position.x, y_position: position.y })
    set({ nodes: [...get().nodes, node] })
    return node
  },

  updateNodePosition: async (id, position) => {
    const node = await updateNode(id, { x_position: position.x, y_position: position.y })
    set({ nodes: get().nodes.map(n => n.id === id ? node : n) })
  },

  updateNodeContent: async (id, data) => {
    const node = await updateNode(id, data)
    set({ nodes: get().nodes.map(n => n.id === id ? node : n) })
  },

  removeNode: async (id) => {
    await deleteNode(id)
    set({ nodes: get().nodes.filter(n => n.id !== id) })
  },

  addLink: async ({ source_node_id, target_node_id, relationship_type = 'related' }) => {
    const mapId = get().currentMapId
    const link = await createLink(mapId, { source_node_id, target_node_id, relationship_type })
    set({ links: [...get().links, link] })
    return link
  },

  removeLink: async (id) => {
    await deleteLink(id)
    set({ links: get().links.filter(l => l.id !== id) })
  },

  setSelectedNode(id) {
    set({ selectedNodeId: id })
  }
}))
