export default async function handler(req, res) {
  const { lamin, lomin, lamax, lomax } = req.query

  if (!lamin || !lomin || !lamax || !lomax) {
    return res.status(400).json({ error: 'Missing bounding box params' })
  }

  try {
    const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`
    const response = await fetch(url, {
      headers: { 'User-Agent': 'SkyID/1.0' },
    })

    if (response.status === 429) {
      return res.status(429).json({ error: 'Rate limited' })
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: 'OpenSky error' })
    }

    const data = await response.json()

    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=5')
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: 'Proxy fetch failed' })
  }
}
