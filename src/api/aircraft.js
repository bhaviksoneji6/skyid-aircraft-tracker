export async function fetchAircraft(lat, lon) {
  const res = await fetch(`/api/aircraft?lat=${lat}&lon=${lon}`)

  if (res.status === 429) throw new Error('RATE_LIMITED')
  if (!res.ok) throw new Error('Fetch failed')

  const data = await res.json()
  if (!data.ac?.length) return []

  return data.ac
    .filter((a) => a.lat != null && a.lon != null)
    .map((a) => ({
      icao24: a.hex,
      callsign: a.flight?.trim() || 'N/A',
      lon: a.lon,
      lat: a.lat,
      altitude: a.alt_baro === 'ground' ? 0 : (a.alt_baro ?? 0),
      onGround: a.alt_baro === 'ground',
      speed: Math.round(a.gs ?? 0),
      heading: a.track ?? 0,
      verticalRate: a.baro_rate ?? 0,
      registration: a.r ?? null,
      typecode: a.t ?? null,
    }))
}
