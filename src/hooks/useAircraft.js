import { useQuery } from '@tanstack/react-query'
import { fetchAircraft } from '../api/opensky'

export function useAircraft(location) {
  return useQuery({
    queryKey: ['aircraft', location?.lat, location?.lon],
    queryFn: () => fetchAircraft(location.lat, location.lon),
    enabled: !!location,
    refetchInterval: 15000,
    staleTime: 10000,
  })
}
