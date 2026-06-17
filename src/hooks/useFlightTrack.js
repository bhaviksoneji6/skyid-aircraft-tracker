import { useQuery } from '@tanstack/react-query'
import { fetchTrack } from '../api/aircraft'

export function useFlightTrack(icao24) {
  return useQuery({
    queryKey: ['track', icao24],
    queryFn: () => fetchTrack(icao24),
    enabled: !!icao24,
    staleTime: 30000,
    retry: false,
  })
}
