import { Outlet, Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="h-full flex flex-col">
      <header className="px-4 py-2 border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">AI Mind Map</Link>
          <nav className="flex items-center gap-3 text-sm">
            <a href="https://reactflow.dev" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900">React Flow</a>
          </nav>
        </div>
      </header>
      <main className="flex-1 min-h-0">
        <Outlet />
      </main>
    </div>
  )
}
