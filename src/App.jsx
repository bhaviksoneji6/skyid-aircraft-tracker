import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center h-full bg-gray-950 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">SkyID</h1>
          <p className="text-gray-400">Aircraft tracker — coming soon</p>
        </div>
      </div>
    </QueryClientProvider>
  )
}
