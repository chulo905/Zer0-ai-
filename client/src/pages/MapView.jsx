import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useMapStore } from '../state/useMapStore'
import Toolbar from '../components/Toolbar'
import MindMapCanvas from '../components/MindMapCanvas'
import NodeDetailsPanel from '../components/NodeDetailsPanel'
import SidebarAI from '../components/SidebarAI'

export default function MapView() {
  const { id } = useParams()
  const selectMap = useMapStore(s => s.selectMap)

  useEffect(() => { if (id) selectMap(Number(id)) }, [id])

  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      <Toolbar />
      <div className="grid grid-cols-[1fr_320px] h-full min-h-0">
        <div className="min-h-0">
          <MindMapCanvas />
        </div>
        <div className="grid grid-rows-[1fr_auto] bg-white border-l min-h-0">
          <NodeDetailsPanel />
          <SidebarAI />
        </div>
      </div>
    </div>
  )
}
