import { useRef } from 'react'
import { Map as MapLibre, Marker, NavigationControl, Source, Layer } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useAircraft } from '../hooks/useAircraft'
import { useFlightTrack } from '../hooks/useFlightTrack'
import PlaneMarker from './PlaneMarker'
import InfoPanel from './InfoPanel'

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'

const trackLayerStyle = {
  id: 'flight-track',
  type: 'line',
  paint: {
    'line-color': '#60a5fa',
    'line-width': 2,
    'line-opacity': 0.7,
    'line-dasharray': [4, 2],
  },
}

export default function Map({ location, onPlaneClick, selectedPlane, onPanelClose }) {
  const mapRef = useRef(null)
  const { data: aircraft = [], isFetching } = useAircraft(location)
  const { data: track = [] } = useFlightTrack(selectedPlane?.icao24)

  const trackGeoJSON = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: track,
    },
  }

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
      >
        <NavigationControl position="top-right" />

        {track.length > 1 && (
          <Source id="flight-track" type="geojson" data={trackGeoJSON}>
            <Layer {...trackLayerStyle} />
          </Source>
        )}

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

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full border border-gray-700">
        {isFetching ? (
          <span className="text-gray-400">Updating...</span>
        ) : (
          <span>{aircraft.length} aircraft nearby</span>
        )}
      </div>

      <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-700">
        <span className="text-white font-semibold text-sm tracking-wide">SkyID</span>
      </div>

      <div className="absolute bottom-14 left-4 bg-gray-900/70 backdrop-blur-sm rounded-lg border border-gray-700 px-3 py-2 flex flex-col gap-1.5 text-xs">
        {[['#e2e8f0', '9000m+'], ['#fbbf24', '4000–9000m'], ['#34d399', '1000–4000m'], ['#6b7280', 'Low / Ground']].map(([color, label]) => (
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
