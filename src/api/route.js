export async function fetchFlightRoute(callsign) {
  if (!callsign || callsign === 'N/A') return null

  const res = await fetch(`/api/route?callsign=${callsign}`)
  if (!res.ok) return null

  const data = await res.json()
  if (!data.origin && !data.destination) return null

  return data
}
