import React, { useCallback, useMemo, useEffect } from 'react'
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge } from 'reactflow'
import 'reactflow/dist/style.css'
import { useMapStore } from '../state/useMapStore'

export default function MindMapCanvas() {
  const storeNodes = useMapStore(s => s.nodes)
  const storeLinks = useMapStore(s => s.links)
  const setSelectedNode = useMapStore(s => s.setSelectedNode)
  const updateNodePosition = useMapStore(s => s.updateNodePosition)
  const addLink = useMapStore(s => s.addLink)

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState([])
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState([])

  useEffect(() => {
    setRfNodes(storeNodes.map(n => ({
      id: String(n.id),
      position: { x: n.x_position || 0, y: n.y_position || 0 },
      data: { label: n.title },
      type: 'default'
    })))
  }, [storeNodes, setRfNodes])

  useEffect(() => {
    setRfEdges(storeLinks.map(l => ({
      id: String(l.id),
      source: String(l.source_node_id),
      target: String(l.target_node_id),
      label: l.relationship_type
    })))
  }, [storeLinks, setRfEdges])

  const onNodeDragStop = useCallback((_, node) => {
    const id = Number(node.id)
    const { x, y } = node.position
    updateNodePosition(id, { x, y })
  }, [updateNodePosition])

  const onConnect = useCallback(async (params) => {
    await addLink({ source_node_id: Number(params.source), target_node_id: Number(params.target), relationship_type: 'related' })
  }, [addLink])

  return (
    <ReactFlow
      nodes={rfNodes}
      edges={rfEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeDragStop={onNodeDragStop}
      onConnect={onConnect}
      fitView
      onNodeClick={(_, n) => setSelectedNode(Number(n.id))}
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  )
}
