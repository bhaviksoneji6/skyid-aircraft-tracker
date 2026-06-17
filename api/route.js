export default async function handler(req, res) {
  const { callsign } = req.query
  if (!callsign) return res.status(400).json({ error: 'Missing callsign' })

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 6000)

  try {
    const response = await fetch(
      `https://api.adsbdb.com/v0/callsign/${callsign}`,
      { signal: controller.signal }
    )
    clearTimeout(timeout)

    if (!response.ok) return res.status(response.status).json({ error: 'Route lookup failed' })

    const data = await response.json()
    const route = data?.response?.flightroute

    if (!route) return res.status(404).json({ error: 'No route found' })

    res.setHeader('Cache-Control', 's-maxage=3600')
    return res.status(200).json({
      origin: route.origin ?? null,
      destination: route.destination ?? null,
    })
  } catch (err) {
    clearTimeout(timeout)
    return res.status(500).json({ error: 'Route fetch failed' })
  }
}
