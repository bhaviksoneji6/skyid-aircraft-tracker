import { useState, useEffect } from 'react'

export function useLocation() {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        setLoading(false)
      },
      () => {
        setError('Unable to retrieve your location')
        setLoading(false)
      }
    )
  }, [])

  return { location, error, loading }
}
