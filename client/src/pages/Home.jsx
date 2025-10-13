import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMapStore } from '../state/useMapStore'

export default function Home() {
  const fetchMaps = useMapStore(s => s.fetchMaps)
  const maps = useMapStore(s => s.maps)
  const addMap = useMapStore(s => s.addMap)
  const [title, setTitle] = useState('New Map')
  const navigate = useNavigate()

  useEffect(() => { fetchMaps() }, [])

  const create = async () => {
    const map = await addMap(title || 'Untitled')
    navigate(`/maps/${map.id}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2">
        <input className="border rounded px-3 py-2 flex-1" value={title} onChange={e => setTitle(e.target.value)} />
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={create}>Create Map</button>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Your Maps</h2>
        <ul className="space-y-2">
          {maps.map(m => (
            <li key={m.id} className="border rounded p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{m.title}</div>
                <div className="text-xs text-gray-500">Updated {new Date(m.updated_at || m.created_at).toLocaleString()}</div>
              </div>
              <Link to={`/maps/${m.id}`} className="px-3 py-1 bg-gray-800 text-white rounded">Open</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
