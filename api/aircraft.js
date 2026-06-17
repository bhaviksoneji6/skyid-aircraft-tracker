export default async function handler(req, res) {
  const { lamin, lomin, lamax, lomax } = req.query

  if (!lamin || !lomin || !lamax || !lomax) {
    return res.status(400).json({ error: 'Missing bounding box params' })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  const credentials = Buffer.from(
    `bhaviksoneji6:${process.env.OPENSKY_PASSWORD}`
  ).toString('base64')

  try {
    const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Authorization': `Basic ${credentials}`,
        'User-Agent': 'SkyID/1.0',
      },
    })

    clearTimeout(timeout)

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
    clearTimeout(timeout)
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'OpenSky request timed out' })
    }
    return res.status(500).json({ error: 'Proxy fetch failed' })
  }
}
