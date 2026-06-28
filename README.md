# SkyID — Aircraft Tracker

> "What plane is above me?" — answered in real time.

Open the app, allow location access, and see every aircraft currently nearby on a live map. Pan to explore any area. Tap any plane to see its aircraft type, registration, altitude, speed, heading, and a real photo.

**Live at:** [skyid-aircraft-tracker.vercel.app](https://skyid-aircraft-tracker.vercel.app)

---

## Features

- **Live aircraft map** — queries airplanes.live every 3 seconds within 150 nm of the map center
- **Pan to explore** — data follows the map center, not just your GPS location
- **Dead reckoning** — aircraft positions interpolate smoothly between API updates (100 ms ticks)
- **8 aircraft symbol types** — jet, bizjet, turboprop, light GA, helicopter, military, glider, unknown
- **Altitude color gradient** — red (low) → violet (high), 500 ft to 40,000 ft
- **Live info panel** — tap any aircraft; altitude, speed, and heading update in real time
- **Aircraft photo** — loaded from Planespotters.net when available
- **FlightAware link** — one-tap to track the flight in detail

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Map | MapLibre GL JS (CARTO Voyager) via react-map-gl |
| Data fetching | React Query (3 s polling, 10 s stale time) |
| Proxy | Vercel serverless function (`/api/aircraft`) |
| Hosting | Vercel |

## Data Sources

| Data | Source | API Key |
|---|---|---|
| Live aircraft positions | [airplanes.live](https://airplanes.live) | None |
| Aircraft photos | [Planespotters.net](https://www.planespotters.net) | None |

## Local Development

```bash
git clone https://github.com/bhaviksoneji6/skyid-aircraft-tracker.git
cd skyid-aircraft-tracker
npm install
npm run dev
```

The Vercel proxy runs automatically in dev via `vite.config.js`. No API keys required.

## Project Structure

```
skyid-aircraft-tracker/
├── api/
│   └── aircraft.js              # Vercel serverless proxy → airplanes.live
├── src/
│   ├── components/
│   │   ├── Map.jsx              # MapLibre GL, markers, altitude legend
│   │   ├── PlaneMarker.jsx      # 8 SVG aircraft symbols + altitude color
│   │   └── InfoPanel.jsx        # Slide-in detail panel with photo + stats
│   ├── hooks/
│   │   ├── useLocation.js       # Browser GPS
│   │   ├── useAircraft.js       # React Query polling
│   │   ├── useInterpolatedAircraft.js  # Dead-reckoning position smoothing
│   │   └── useAircraftPhoto.js  # Planespotters photo query
│   ├── api/
│   │   ├── aircraft.js          # airplanes.live fetch + field mapping
│   │   ├── aircraftTypes.js     # Symbol classification (8 types)
│   │   ├── airlines.js          # Callsign → airline name lookup table
│   │   └── planespotters.js     # Photo fetch
│   └── App.jsx
└── README.md
```

## Aircraft Classification

Symbols are determined by combining the ADS-B `category` field, ICAO type code, and aircraft description — in that priority order. Category alone is not trusted (airplanes.live occasionally sends bad category data for law enforcement helicopters, military transports, etc.).

| Symbol | Type | Detection method |
|---|---|---|
| Swept wings | Jet | Category A3–A5 |
| Swept + aft pods | Bizjet | Type code (Gulfstream, Citation, Learjet…) |
| Straight wings + pods | Turboprop | Type code (ATR, Q400, Caravan…) |
| Straight wings + prop bar | Light GA | Category A1–A2 or type code (C172, PA28…) |
| Rotor cross | Helicopter | Category A7, type code, or description keyword |
| Delta | Military | Category A6 or type code (F-35, C-130, P-8…) |
| Long thin wings | Glider | Type code only (ASW, LS, DG series…) |
| Diamond | Unknown | No match |

---

Built by [Bhavik Soneji](https://github.com/bhaviksoneji6)
