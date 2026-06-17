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

export async function fetchTrack(icao24) {
  const url = `https://opensky-network.org/api/tracks/all?icao24=${icao24}&time=0`
  const res = await fetch(url)
  if (!res.ok) return []
  const data = await res.json()
  if (!data.path?.length) return []
  return data.path
    .filter((p) => p[1] !== null && p[2] !== null)
    .map((p) => [p[2], p[1]])
}
