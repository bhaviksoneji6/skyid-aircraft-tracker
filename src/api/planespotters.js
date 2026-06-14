export async function fetchAircraftPhoto(icao24) {
  const url = `https://api.planespotters.net/pub/photos/hex/${icao24}`
  const res = await fetch(url)
  if (!res.ok) return null

  const data = await res.json()
  if (!data.photos?.length) return null

  const photo = data.photos[0]
  return {
    thumbnail: photo.thumbnail_large?.src ?? photo.thumbnail?.src,
    link: photo.link,
    photographer: photo.photographer,
  }
}
