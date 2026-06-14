const BBOX_DEGREES = 2.5

export async function fetchAircraft(lat, lon) {
  const lamin = lat - BBOX_DEGREES
  const lamax = lat + BBOX_DEGREES
  const lomin = lon - BBOX_DEGREES
  const lomax = lon + BBOX_DEGREES

  const url = `/api/aircraft?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`
  const res = await fetch(url)

  if (res.status === 429) throw new Error('RATE_LIMITED')
  if (!res.ok) throw new Error('OpenSky fetch failed')

  const data = await res.json()

  if (!data.states) return []

  return data.states
    .filter((s) => s[5] !== null && s[6] !== null && !s[8])
    .map((s) => ({
      icao24: s[0],
      callsign: s[1]?.trim() || 'N/A',
      country: s[2],
      lon: s[5],
      lat: s[6],
      altitude: s[7] ?? s[13] ?? 0,
      onGround: s[8],
      speed: s[9] ? Math.round(s[9] * 1.944) : 0,
      heading: s[10] ?? 0,
      verticalRate: s[11] ?? 0,
    }))
}

export async function fetchTrack(icao24) {
  const url = `https://opensky-network.org/api/tracks/all?icao24=${icao24}&time=0`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Track fetch failed')
  const data = await res.json()
  if (!data.path?.length) return []
  return data.path
    .filter((p) => p[1] !== null && p[2] !== null)
    .map((p) => [p[2], p[1]])
}
