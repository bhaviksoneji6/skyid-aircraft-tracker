import { getAirlineName } from '../api/airlines'
import { useAircraftPhoto } from '../hooks/useAircraftPhoto'

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
  const { data: photo } = useAircraftPhoto(plane.icao24)

  return (
    <>
      <div className="absolute inset-0 bg-black/40 z-10 sm:hidden" onClick={onClose} />

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
              <a href={photo.link} target="_blank" rel="noopener noreferrer"
                className="absolute bottom-2 right-3 text-xs text-white/50 hover:text-white/80 transition-colors">
                © {photo.photographer}
              </a>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500 text-lg">✈</div>
            <button onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800">
              ✕
            </button>
          </div>
        )}

        <div className="px-5 pt-3 pb-2 border-b border-gray-800 flex-shrink-0">
          <h2 className="text-xl font-bold text-white tracking-wide">{plane.callsign}</h2>
          {(plane.operator || airline) && (
            <p className="text-sm text-blue-400 mt-0.5">{plane.operator ?? airline}</p>
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
            {plane.description && <Row label="Aircraft" value={plane.description} />}
            {plane.registration && <Row label="Registration" value={plane.registration} valueClass="text-yellow-300 font-mono" />}
            {plane.typecode && <Row label="Type Code" value={plane.typecode} valueClass="text-gray-300 font-mono" />}
            {plane.year && <Row label="Year Built" value={plane.year} />}
          </Section>

          <Section title="Identifiers">
            <Row label="ICAO Hex" value={plane.icao24.toUpperCase()} valueClass="text-gray-300 font-mono" />
          </Section>

          {plane.callsign && plane.callsign !== 'N/A' && (
            <a
              href={`https://www.flightaware.com/live/flight/${encodeURIComponent(plane.callsign.trim())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 mb-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/35 border border-blue-600/40 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              Track on FlightAware
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </>
  )
}
