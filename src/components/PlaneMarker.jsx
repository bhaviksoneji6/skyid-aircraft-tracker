function altitudeColor(altitude) {
  if (altitude < 3000) return '#6b7280'
  if (altitude < 13000) return '#34d399'
  if (altitude < 30000) return '#fbbf24'
  return '#e2e8f0'
}

function getAircraftType(category) {
  if (!category) return 'jet'
  if (category === 'A7') return 'helicopter'
  if (category === 'B1') return 'glider'
  if (category === 'A6') return 'military'
  if (category === 'A1' || category === 'A2') return 'prop'
  return 'jet'
}

function JetIcon({ color }) {
  return (
    <path
      fill={color}
      d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"
    />
  )
}

function PropIcon({ color }) {
  return (
    <path
      fill={color}
      d="M12 2.5a1.5 1.5 0 0 0-1.5 1.5V8L2 11.5v2L10.5 12v5.5L8 19v2l4-1 4 1v-2l-2.5-1.5V12L22 13.5v-2L13.5 8V4A1.5 1.5 0 0 0 12 2.5z"
    />
  )
}

function HelicopterIcon({ color }) {
  return (
    <>
      <rect fill={color} x="1" y="10.5" width="22" height="2.5" rx="1.2" />
      <rect fill={color} x="10.5" y="1" width="2.5" height="22" rx="1.2" />
      <circle fill={color} cx="12" cy="12" r="2.5" />
    </>
  )
}

function MilitaryIcon({ color }) {
  return (
    <path
      fill={color}
      d="M12 2 L22 20 L18 17 L12 19.5 L6 17 L2 20 Z"
    />
  )
}

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
  prop: PropIcon,
  helicopter: HelicopterIcon,
  military: MilitaryIcon,
  glider: GliderIcon,
}

export default function PlaneMarker({ aircraft, onClick, selected }) {
  const color = altitudeColor(aircraft.altitude)
  const type = getAircraftType(aircraft.category)
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
