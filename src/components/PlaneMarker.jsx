import { getAircraftType } from '../api/aircraftTypes'

function altitudeColor(altitude) {
  if (!altitude || altitude <= 500) return '#6b7280'
  const t = Math.min((altitude - 500) / 39500, 1) // 500ft → 40,000ft
  const hue = Math.round(t * 270)                  // red (0°) → violet (270°)
  return `hsl(${hue}, 90%, 55%)`
}

// Swept wings — commercial and regional jets
function JetIcon({ color }) {
  return (
    <path
      fill={color}
      d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"
    />
  )
}

// Straight wings + twin engine pods — ATR, Q400, PC-12, Caravan
function TurbopropIcon({ color }) {
  return (
    <>
      <rect fill={color} x="10.5" y="2" width="3" height="20" rx="1.5" />
      <rect fill={color} x="1.5" y="9" width="21" height="3.5" rx="1" />
      <rect fill={color} x="3.5" y="8" width="4" height="5.5" rx="2" />
      <rect fill={color} x="16.5" y="8" width="4" height="5.5" rx="2" />
      <rect fill={color} x="7.5" y="18.5" width="9" height="2.5" rx="1" />
    </>
  )
}

// Straight wings + prop bar at nose — Cessna, Piper, general aviation
function LightIcon({ color }) {
  return (
    <>
      <rect fill={color} x="8" y="2" width="8" height="2" rx="1" />
      <rect fill={color} x="10.5" y="2" width="3" height="20" rx="1.5" />
      <rect fill={color} x="2.5" y="10.5" width="19" height="3" rx="1" />
      <rect fill={color} x="8" y="18.5" width="8" height="2.5" rx="1" />
    </>
  )
}

// Cross rotor — helicopters
function HelicopterIcon({ color }) {
  return (
    <>
      <rect fill={color} x="1" y="10.5" width="22" height="2.5" rx="1.2" />
      <rect fill={color} x="10.5" y="1" width="2.5" height="22" rx="1.2" />
      <circle fill={color} cx="12" cy="12" r="2.5" />
    </>
  )
}

// Delta / arrowhead — military jets
function MilitaryIcon({ color }) {
  return (
    <path
      fill={color}
      d="M12 2 L22 20 L18 17 L12 19.5 L6 17 L2 20 Z"
    />
  )
}

// Swept wings + aft engine pods — bizjets, private jets, charters (Gulfstream, Citation, Learjet)
function BizjetIcon({ color }) {
  return (
    <path
      fill={color}
      d="M12 2 L13 3 L13 8 L20 12 L20 13.5 L13 11 L13 15 L16 16 L16 19.5 L14 19 L13 20.5 L13 22 L11 22 L11 20.5 L10 19 L8 19.5 L8 16 L11 15 L11 11 L4 13.5 L4 12 L11 8 L11 3 Z"
    />
  )
}

// Diamond — unclassified / unknown aircraft type
function UnknownIcon({ color }) {
  return (
    <path
      fill={color}
      d="M12 2 L22 12 L12 22 L2 12 Z"
    />
  )
}

// Extreme wingspan, tiny fuselage — gliders
function GliderIcon({ color }) {
  return (
    <path
      fill={color}
      d="M12 3a1 1 0 0 0-1 1v7L1 12.5v1.5L11 13v5.5L9 20v1.5l3-.5 3 .5V20l-2-1.5V13L23 14v-1.5L13 11V4a1 1 0 0 0-1-1z"
    />
  )
}

const ICONS = {
  jet: JetIcon,
  bizjet: BizjetIcon,
  turboprop: TurbopropIcon,
  light: LightIcon,
  helicopter: HelicopterIcon,
  military: MilitaryIcon,
  glider: GliderIcon,
  unknown: UnknownIcon,
}

export default function PlaneMarker({ aircraft, onClick, selected }) {
  const color = altitudeColor(aircraft.altitude)
  const type = getAircraftType(aircraft.category, aircraft.typecode, aircraft.description)
  const Icon = ICONS[type]

  return (
    <div
      onClick={() => onClick(aircraft)}
      title={aircraft.callsign}
      className="cursor-pointer transition-transform duration-100"
      style={{
        transform: `rotate(${aircraft.heading}deg) scale(${selected ? 1.5 : 1})`,
        filter: selected
          ? 'drop-shadow(0 0 6px white)'
          : 'drop-shadow(0 0 2px rgba(0,0,0,0.7))',
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Icon color={color} />
      </svg>
    </div>
  )
}
