function altitudeColor(altitude) {
  if (altitude < 1000) return '#6b7280'
  if (altitude < 4000) return '#34d399'
  if (altitude < 9000) return '#fbbf24'
  return '#e2e8f0'
}

function PlaneSVG({ color }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.8))' }}
    >
      <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
    </svg>
  )
}

export default function PlaneMarker({ aircraft, onClick, selected }) {
  const color = altitudeColor(aircraft.altitude)

  return (
    <div
      onClick={() => onClick(aircraft)}
      title={aircraft.callsign}
      className="cursor-pointer transition-transform duration-150"
      style={{
        transform: `rotate(${aircraft.heading}deg) scale(${selected ? 1.5 : 1})`,
        filter: selected ? 'drop-shadow(0 0 6px white)' : undefined,
      }}
    >
      <PlaneSVG color={color} />
    </div>
  )
}
