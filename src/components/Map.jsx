import { useRef } from 'react'
import { Map as MapLibre, Marker, NavigationControl } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'

export default function Map({ location }) {
  const mapRef = useRef(null)

  return (
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

      <Marker longitude={location.lon} latitude={location.lat} anchor="center">
        <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg shadow-blue-500/50" />
      </Marker>
    </MapLibre>
  )
}
