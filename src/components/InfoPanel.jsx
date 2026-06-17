import { getAirlineName } from '../api/airlines'
import { useAircraftMeta } from '../hooks/useAircraftMeta'
import { useAircraftPhoto } from '../hooks/useAircraftPhoto'
import { useFlightRoute } from '../hooks/useFlightRoute'

function headingLabel(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}

function verticalLabel(rate) {
  if (rate > 100) return { text: `+${Math.round(rate)} ft/min`, color: 'text-green-400' }
  if (rate < -100) return { text: `${Math.round(rate)} ft/min`, color: 'text-red-400' }
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
  const altFt = plane.altitude ? `${Math.round(plane.altitude).toLocaleString()} ft` : 'N/A'
  const vertical = verticalLabel(plane.verticalRate)

  const { data: meta, isLoading: metaLoading } = useAircraftMeta(plane.icao24)
  const { data: photo } = useAircraftPhoto(plane.icao24)
  const { data: route } = useFlightRoute(plane.callsign)

  const registration = plane.registration ?? meta?.registration ?? null
  const typecode = plane.typecode ?? meta?.typecode ?? null

  return (
    <>
      <div
        className="absolute inset-0 bg-black/40 z-10 sm:hidden"
        onClick={onClose}
      />

      <div
        key={plane.icao24}
        className="
          absolute z-20 bg-gray-950/95 backdrop-blur-md border-gray-800 shadow-2xl flex flex-col
          bottom-0 left-0 right-0 h-[65%] rounded-t-2xl border-t animate-slide-in-up
          sm:top-0 sm:right-0 sm:bottom-auto sm:left-auto sm:h-full sm:w-80 sm:rounded-none sm:border-t-0 sm:border-l sm:animate-slide-in-right
        "
      >
        {photo ? (
          <div className="relative w-full h-40 flex-shrink-0 overflow-hidden sm:h-44 rounded-t-2xl sm:rounded-none">
            <img src={photo.thumbnail} alt={plane.callsign} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 transition-colors w-7 h-7 flex items-center justify-center rounded-full text-sm"
            >
              ✕
            </button>
            {photo.photographer && (
              <a
                href={photo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-3 text-xs text-white/50 hover:text-white/80 transition-colors"
              >
                © {photo.photographer}
              </a>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500 text-lg">✈</div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800"
            >
              ✕
            </button>
          </div>
        )}

        <div className="px-5 pt-3 pb-2 border-b border-gray-800 flex-shrink-0">
          <h2 className="text-xl font-bold text-white tracking-wide">{plane.callsign}</h2>
          {airline && <p className="text-sm text-blue-400 mt-0.5">{airline}</p>}
          {route && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-mono bg-gray-800 text-gray-200 px-2 py-0.5 rounded">
                {route.origin?.iata_code ?? '???'}
              </span>
              <span className="text-gray-600 text-xs">→</span>
              <span className="text-xs font-mono bg-gray-800 text-gray-200 px-2 py-0.5 rounded">
                {route.destination?.iata_code ?? '???'}
              </span>
              <span className="text-xs text-gray-500 truncate">
                {route.origin?.municipality} → {route.destination?.municipality}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-1">
          <Section title="Flight">
            <Row label="Altitude" value={altFt} />
            <Row label="Speed" value={`${plane.speed} kts`} />
            <Row label="Heading" value={`${Math.round(plane.heading)}° ${headingLabel(plane.heading)}`} />
            <Row label="Vertical" value={vertical.text} valueClass={vertical.color} />
          </Section>

          <Section title="Aircraft">
            {registration && <Row label="Registration" value={registration} valueClass="text-yellow-300 font-mono" />}
            {typecode && <Row label="Type" value={typecode} valueClass="text-gray-300 font-mono" />}
            {metaLoading ? (
              <div className="space-y-2 py-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-4 bg-gray-800 rounded animate-pulse" />
                ))}
              </div>
            ) : meta ? (
              <>
                {meta.manufacturer && <Row label="Manufacturer" value={meta.manufacturer} />}
                {meta.model && <Row label="Model" value={meta.model} />}
                {meta.yearBuilt && <Row label="Year Built" value={meta.yearBuilt} />}
                {meta.engines && <Row label="Engines" value={meta.engines} />}
                {meta.owner && <Row label="Owner" value={meta.owner} />}
              </>
            ) : null}
          </Section>

          <Section title="Identifiers">
            <Row label="ICAO Hex" value={plane.icao24.toUpperCase()} valueClass="text-gray-300 font-mono" />
          </Section>
        </div>

        <div className="px-5 py-3 border-t border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-6 border-t-2 border-blue-400 border-dashed" />
            <span>Dashed line shows flight path</span>
          </div>
        </div>
      </div>
    </>
  )
}
