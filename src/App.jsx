import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Map from './components/Map'
import { useLocation } from './hooks/useLocation'

const queryClient = new QueryClient()

function AppContent() {
  const { location, error, loading } = useLocation()
  const [selectedPlane, setSelectedPlane] = useState(null)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-950 text-white">
        <p className="text-gray-400">Locating you...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-950 text-white">
        <div className="text-center">
          <p className="text-red-400 mb-2">Location access denied</p>
          <p className="text-gray-500 text-sm">Enable location to see aircraft overhead</p>
        </div>
      </div>
    )
  }

  return (
    <Map
      location={location}
      onPlaneClick={setSelectedPlane}
      selectedPlane={selectedPlane}
      onPanelClose={() => setSelectedPlane(null)}
    />
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full w-full">
        <AppContent />
      </div>
    </QueryClientProvider>
  )
}
