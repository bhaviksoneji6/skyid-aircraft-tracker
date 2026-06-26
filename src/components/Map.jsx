import { useRef, useState, useEffect, useCallback } from 'react'
import { Map as MapLibre, Marker, NavigationControl, AttributionControl } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useInterpolatedAircraft } from '../hooks/useInterpolatedAircraft'
import PlaneMarker from './PlaneMarker'
import InfoPanel from './InfoPanel'

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'

export default function Map({ location, onPlaneClick, selectedIcao, onPanelClose }) {
  const mapRef = useRef(null)
  const [queryLocation, setQueryLocation] = useState(location)
  const { data: aircraft = [], isFetching, error } = useInterpolatedAircraft(queryLocation)

  // Derive selected plane live from the current aircraft array
  const selectedPlane = aircraft.find((p) => p.icao24 === selectedIcao) ?? null

  // Close panel if the selected aircraft goes out of range
  useEffect(() => {
    if (selectedIcao && !selectedPlane) onPanelClose()
  }, [aircraft, selectedIcao, selectedPlane, onPanelClose])

  // Re-query when the map is panned — fires once per drag, not per pixel
  const handleMoveEnd = useCallback((e) => {
    const { lat, lng } = e.target.getCenter()
    setQueryLocation({ lat, lon: lng })
  }, [])

  const isRateLimited = error?.message === 'RATE_LIMITED'
  const hasError = !!error && !isRateLimited

  return (
    <div className="relative w-full h-full">
      <MapLibre
        ref={mapRef}
        initialViewState={{
          longitude: location.lon,
          latitude: location.lat,
          zoom: 10,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        attributionControl={false}
        onMoveEnd={handleMoveEnd}
      >
        <NavigationControl position="top-right" />
        <AttributionControl
          position="bottom-right"
          customAttribution="SkyID by Bhavik Soneji"
          compact={true}
        />

        <Marker longitude={location.lon} latitude={location.lat} anchor="center">
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg shadow-blue-500/50" />
        </Marker>

        {aircraft.map((plane) => (
          <Marker
            key={plane.icao24}
            longitude={plane.lon}
            latitude={plane.lat}
            anchor="center"
          >
            <PlaneMarker
              aircraft={plane}
              onClick={onPlaneClick}
              selected={plane.icao24 === selectedIcao}
            />
          </Marker>
        ))}
      </MapLibre>

      <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-700">
        <span className="text-white font-semibold text-sm tracking-wide">SkyID</span>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full border border-gray-700 whitespace-nowrap">
        {isRateLimited ? (
          <span className="text-yellow-400">Rate limited — retrying soon</span>
        ) : hasError ? (
          <span className="text-red-400">Could not load aircraft data</span>
        ) : isFetching ? (
          <span className="text-gray-400">Updating...</span>
        ) : (
          <span>{aircraft.length} aircraft nearby</span>
        )}
      </div>

      <div className="absolute bottom-14 left-4 bg-gray-900/70 backdrop-blur-sm rounded-lg border border-gray-700 px-2.5 py-2 w-52">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">Altitude (ft)</p>
        <div className="flex h-2.5 rounded overflow-hidden">
          <div className="w-5 flex-shrink-0" style={{ background: '#6b7280' }} />
          <div className="flex-1" style={{
            background: 'linear-gradient(to right, hsl(0,90%,55%), hsl(54,90%,55%), hsl(108,90%,55%), hsl(162,90%,55%), hsl(216,90%,55%), hsl(270,90%,55%))'
          }} />
        </div>
        <div className="flex justify-between text-[9px] text-gray-500 mt-1">
          <span>Gnd</span>
          <span>2K</span>
          <span>10K</span>
          <span>20K</span>
          <span>40K+</span>
        </div>
      </div>

      <InfoPanel plane={selectedPlane} onClose={onPanelClose} />
    </div>
  )
}
