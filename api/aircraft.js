export default async function handler(req, res) {
  const { lat, lon } = req.query

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat/lon params' })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const url = `https://api.airplanes.live/v2/point/${lat}/${lon}/150`
    const response = await fetch(url, { signal: controller.signal })

    clearTimeout(timeout)

    if (!response.ok) {
      return res.status(response.status).json({ error: 'airplanes.live error' })
    }

    const data = await response.json()

    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=5')
    return res.status(200).json(data)
  } catch (err) {
    clearTimeout(timeout)
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Request timed out' })
    }
    return res.status(500).json({ error: 'Proxy fetch failed' })
  }
}
