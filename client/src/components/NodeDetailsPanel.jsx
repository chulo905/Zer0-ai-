import { useState, useEffect } from 'react'
import { useMapStore } from '../state/useMapStore'
import { aiExpandNode, aiSummarizeNode, aiSuggestRelated } from '../api/apiClient'

export default function NodeDetailsPanel() {
  const { selectedNodeId, nodes, updateNodeContent, removeNode, addNode, addLink } = useMapStore()
  const node = nodes.find(n => n.id === selectedNodeId)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (node) { setTitle(node.title); setContent(node.content || '') } else { setTitle(''); setContent('') }
  }, [selectedNodeId])

  if (!node) return <div className="p-4 text-sm text-gray-500">Select a node</div>

  const save = async () => {
    await updateNodeContent(node.id, { title, content })
  }

  const expandWithAI = async () => {
    setBusy(true)
    try {
      const ideas = await aiExpandNode({ title, content })
      for (const idea of ideas) {
        const created = await addNode(idea, '', { x: (node.x_position||0) + 120, y: (node.y_position||0) + Math.random()*120 })
        await addLink({ source_node_id: node.id, target_node_id: created.id, relationship_type: 'child' })
      }
    } finally {
      setBusy(false)
    }
  }

  const summarize = async () => {
    setBusy(true)
    try {
      const summary = await aiSummarizeNode({ title, content })
      setContent(summary)
      await updateNodeContent(node.id, { title, content: summary })
    } finally { setBusy(false) }
  }

  const suggestRelated = async () => {
    setBusy(true)
    try {
      const suggestions = await aiSuggestRelated({ title, content })
      for (const s of suggestions) {
        const created = await addNode(s, '', { x: (node.x_position||0) - 160, y: (node.y_position||0) + Math.random()*160 })
        await addLink({ source_node_id: created.id, target_node_id: node.id, relationship_type: 'related' })
      }
    } finally { setBusy(false) }
  }

  return (
    <div className="p-3 space-y-3">
      <div className="space-y-1">
        <label className="text-xs text-gray-500">Title</label>
        <input className="w-full border rounded px-2 py-1" value={title} onChange={e => setTitle(e.target.value)} onBlur={save} />
      </div>
      <div className="space-y-1">
        <label className="text-xs text-gray-500">Content</label>
        <textarea className="w-full h-40 border rounded px-2 py-1" value={content} onChange={e => setContent(e.target.value)} onBlur={save} />
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 rounded bg-emerald-600 text-white disabled:opacity-50" onClick={expandWithAI} disabled={busy}>Expand with AI</button>
        <button className="px-3 py-1 rounded bg-indigo-600 text-white disabled:opacity-50" onClick={summarize} disabled={busy}>Summarize</button>
        <button className="px-3 py-1 rounded bg-amber-600 text-white disabled:opacity-50" onClick={suggestRelated} disabled={busy}>Suggest</button>
        <button className="ml-auto px-3 py-1 rounded bg-red-600 text-white" onClick={() => removeNode(node.id)}>Delete</button>
      </div>
    </div>
  )
}
