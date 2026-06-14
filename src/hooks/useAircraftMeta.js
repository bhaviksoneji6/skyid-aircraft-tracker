import { useQuery } from '@tanstack/react-query'
import { fetchAircraftMeta } from '../api/aircraftMeta'

export function useAircraftMeta(icao24) {
  return useQuery({
    queryKey: ['meta', icao24],
    queryFn: () => fetchAircraftMeta(icao24),
    enabled: !!icao24,
    staleTime: Infinity,
    retry: false,
  })
}
