import { useState } from 'react'
import { aiTextToMap } from '../api/apiClient'
import { useMapStore } from '../state/useMapStore'

export default function SidebarAI() {
  const [text, setText] = useState('')
  const addNode = useMapStore(s => s.addNode)
  const addLink = useMapStore(s => s.addLink)
  const nodes = useMapStore(s => s.nodes)
  const selectedNodeId = useMapStore(s => s.selectedNodeId)

  const convert = async () => {
    if (!text.trim()) return
    const res = await aiTextToMap({ text })
    const createdIds = []
    for (const n of (res.nodes||[])) {
      const node = await addNode(n.title || 'Idea', n.content || '', { x: Math.random()*600, y: Math.random()*400 })
      createdIds.push(node.id)
    }
    for (const l of (res.links||[])) {
      const s = createdIds[l.sourceIndex]
      const t = createdIds[l.targetIndex]
      if (s && t) await addLink({ source_node_id: s, target_node_id: t, relationship_type: l.relationship_type || 'related' })
    }
  }

  return (
    <div className="p-3 space-y-2 border-l bg-white">
      <div className="text-sm font-medium">AI Tools</div>
      <textarea className="w-full h-40 border rounded px-2 py-1" placeholder="Paste text to convert..." value={text} onChange={e => setText(e.target.value)} />
      <button className="w-full px-3 py-1 rounded bg-purple-600 text-white" onClick={convert}>Convert Text → Branch</button>
      <div className="text-xs text-gray-500">Nodes: {nodes.length} | Selected: {selectedNodeId ?? 'none'}</div>
    </div>
  )
}
