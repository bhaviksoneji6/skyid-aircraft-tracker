import { useRef } from 'react'
import { Map as MapLibre, Marker, NavigationControl, AttributionControl } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useInterpolatedAircraft } from '../hooks/useInterpolatedAircraft'
import PlaneMarker from './PlaneMarker'
import InfoPanel from './InfoPanel'

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'

export default function Map({ location, onPlaneClick, selectedPlane, onPanelClose }) {
  const mapRef = useRef(null)
  const { data: aircraft = [], isFetching, error } = useInterpolatedAircraft(location)

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
              selected={selectedPlane?.icao24 === plane.icao24}
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

      <div className="absolute bottom-14 left-4 bg-gray-900/70 backdrop-blur-sm rounded-lg border border-gray-700 px-3 py-2 flex flex-col gap-1.5 text-xs">
        {[['#e2e8f0', '30,000ft+'], ['#fbbf24', '13,000–30,000ft'], ['#34d399', '3,000–13,000ft'], ['#6b7280', 'Low / Ground']].map(([color, label]) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-gray-300">{label}</span>
          </div>
        ))}
      </div>

      <InfoPanel plane={selectedPlane} onClose={onPanelClose} />
    </div>
  )
}
