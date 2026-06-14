import { useQuery } from '@tanstack/react-query'
import { fetchAircraftPhoto } from '../api/planespotters'

export function useAircraftPhoto(icao24) {
  return useQuery({
    queryKey: ['photo', icao24],
    queryFn: () => fetchAircraftPhoto(icao24),
    enabled: !!icao24,
    staleTime: Infinity,
    retry: false,
  })
}
