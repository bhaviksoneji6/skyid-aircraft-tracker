import { getAirlineName } from '../api/airlines'
import { useAircraftMeta } from '../hooks/useAircraftMeta'

function headingLabel(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}

function verticalLabel(rate) {
  if (rate > 1) return { text: `+${Math.round(rate)} m/s`, color: 'text-green-400' }
  if (rate < -1) return { text: `${Math.round(rate)} m/s`, color: 'text-red-400' }
  return { text: 'Level', color: 'text-gray-400' }
}

function Row({ label, value, valueClass = 'text-white' }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-800 last:border-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`text-sm font-medium text-right max-w-44 ${valueClass}`}>{value}</span>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="mb-1">
      <p className="text-xs text-gray-600 uppercase tracking-widest pt-3 pb-1">{title}</p>
      {children}
    </div>
  )
}

export default function InfoPanel({ plane, onClose }) {
  if (!plane) return null

  const airline = getAirlineName(plane.callsign)
  const altFt = plane.altitude ? `${Math.round(plane.altitude * 3.281).toLocaleString()} ft` : 'N/A'
  const vertical = verticalLabel(plane.verticalRate)

  const { data: meta, isLoading: metaLoading } = useAircraftMeta(plane.icao24)

  return (
    <div className="absolute top-0 right-0 h-full w-80 bg-gray-950/95 backdrop-blur-md border-l border-gray-800 z-10 flex flex-col shadow-2xl">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Callsign</p>
          <h2 className="text-2xl font-bold text-white tracking-wide">{plane.callsign}</h2>
          {airline && <p className="text-sm text-blue-400 mt-0.5">{airline}</p>}
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-1">
        <Section title="Flight">
          <Row label="Altitude" value={altFt} />
          <Row label="Speed" value={`${plane.speed} kts`} />
          <Row label="Heading" value={`${Math.round(plane.heading)}° ${headingLabel(plane.heading)}`} />
          <Row label="Vertical" value={vertical.text} valueClass={vertical.color} />
        </Section>

        <Section title="Aircraft">
          {metaLoading ? (
            <p className="text-gray-600 text-sm py-2">Loading registration data...</p>
          ) : meta ? (
            <>
              {meta.registration && <Row label="Registration" value={meta.registration} valueClass="text-yellow-300 font-mono" />}
              {meta.manufacturer && <Row label="Manufacturer" value={meta.manufacturer} />}
              {meta.model && <Row label="Model" value={meta.model} />}
              {meta.typecode && <Row label="Type" value={meta.typecode} valueClass="text-gray-300 font-mono" />}
              {meta.yearBuilt && <Row label="Year Built" value={meta.yearBuilt} />}
              {meta.engines && <Row label="Engines" value={meta.engines} />}
              {meta.owner && <Row label="Owner" value={meta.owner} />}
            </>
          ) : (
            <p className="text-gray-600 text-sm py-2">No registration data available</p>
          )}
        </Section>

        <Section title="Identifiers">
          <Row label="ICAO Hex" value={plane.icao24.toUpperCase()} valueClass="text-gray-300 font-mono" />
          <Row label="Country" value={plane.country} />
        </Section>
      </div>

      <div className="px-5 py-3 border-t border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-6 border-t-2 border-blue-400 border-dashed" />
          <span>Dashed line shows flight path</span>
        </div>
      </div>
    </div>
  )
}
