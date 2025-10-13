import { useMapStore } from '../state/useMapStore'

export default function Toolbar() {
  const addNode = useMapStore(s => s.addNode)
  const selectedNodeId = useMapStore(s => s.selectedNodeId)

  return (
    <div className="flex gap-2 p-2 bg-white border-b">
      <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => addNode('New Node', '')}>Add Node</button>
      <div className="ml-auto text-sm text-gray-600">Selected: {selectedNodeId ?? 'none'}</div>
    </div>
  )
}
