export async function fetchAircraftMeta(icao24) {
  const url = `https://opensky-network.org/api/metadata/aircraft/icao/${icao24}`
  const res = await fetch(url)
  if (!res.ok) return null

  const data = await res.json()
  if (!data || !data.icao24) return null

  return {
    registration: data.registration ?? null,
    manufacturer: data.manufacturername ?? null,
    model: data.model ?? null,
    typecode: data.typecode ?? null,
    owner: data.owner ?? data.operator ?? null,
    yearBuilt: data.built ?? null,
    engines: data.engines ?? null,
    icaoType: data.icaoaircrafttype ?? null,
  }
}
