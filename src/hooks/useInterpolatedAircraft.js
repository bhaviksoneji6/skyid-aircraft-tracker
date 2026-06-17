import { useState, useEffect, useRef } from 'react'
import { useAircraft } from './useAircraft'

const TICK_MS = 100

function deadReckon(plane, now) {
  const elapsed = (now - plane._ts) / 1000
  if (elapsed <= 0 || !plane.speed || plane.onGround) return plane

  const speedMs = plane.speed * 0.514444
  const headingRad = (plane.heading * Math.PI) / 180
  const distanceM = speedMs * elapsed

  const deltaLat = (distanceM * Math.cos(headingRad)) / 111320
  const deltaLon =
    (distanceM * Math.sin(headingRad)) /
    (111320 * Math.cos((plane.lat * Math.PI) / 180))

  return { ...plane, lat: plane.lat + deltaLat, lon: plane.lon + deltaLon }
}

export function useInterpolatedAircraft(location) {
  const { data: raw = [], ...rest } = useAircraft(location)
  const baseRef = useRef([])
  const [displayed, setDisplayed] = useState([])

  useEffect(() => {
    if (!raw.length) return
    const now = Date.now()
    baseRef.current = raw.map((p) => ({ ...p, _ts: now }))
    setDisplayed(baseRef.current)
  }, [raw])

  useEffect(() => {
    const id = setInterval(() => {
      if (!baseRef.current.length) return
      const now = Date.now()
      setDisplayed(baseRef.current.map((p) => deadReckon(p, now)))
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  return { data: displayed, ...rest }
}
