import { useQuery } from '@tanstack/react-query'
import { fetchFlightRoute } from '../api/route'

export function useFlightRoute(callsign) {
  return useQuery({
    queryKey: ['route', callsign],
    queryFn: () => fetchFlightRoute(callsign),
    enabled: !!callsign && callsign !== 'N/A',
    staleTime: Infinity,
    retry: false,
  })
}
