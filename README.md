# SkyID — Aircraft Tracker

> "What plane is above me?" — answered in real time.

Open the app, allow location access, and see every aircraft currently overhead on a live map. Tap any plane to get airline, aircraft type, tail number, origin/destination, altitude, speed, registration history, and photos.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) + Tailwind CSS |
| Map | Leaflet |
| Data fetching | React Query |
| Backend | Node.js + Express (Vercel serverless functions) |
| Hosting | Vercel (connected to this repo) |

## Data Sources

| Data | Source | Cost |
|---|---|---|
| Live aircraft positions | [OpenSky Network](https://opensky-network.org) | Free |
| Flight route / origin / destination | [AviationStack](https://aviationstack.com) | Free tier (500 req/mo) |
| Tail number / registration | [FAA Registry](https://registry.faa.gov) | Free |
| Aircraft photos | [Planespotters.net](https://www.planespotters.net) | Free |

---

## Build Checklist

- [x] **Component 1** — Project scaffold (Vite + React + Tailwind)
- [ ] **Component 2** — Map view with user location
- [ ] **Component 3** — Live plane markers (OpenSky integration)
- [ ] **Component 4** — Click a plane → info panel (callsign, altitude, speed)
- [ ] **Component 5** — Flight route info (AviationStack)
- [ ] **Component 6** — Tail number / registration lookup (FAA)
- [ ] **Component 7** — Aircraft photos (Planespotters)
- [ ] **Component 8** — Polish + deploy to Vercel

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/bhaviksoneji6/skyid-aircraft-tracker.git
cd skyid-aircraft-tracker

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## Project Structure (planned)

```
skyid-aircraft-tracker/
├── src/
│   ├── components/
│   │   ├── Map.jsx
│   │   ├── PlaneMarker.jsx
│   │   └── InfoPanel.jsx
│   ├── hooks/
│   │   ├── useAircraft.js
│   │   └── useLocation.js
│   ├── api/
│   │   ├── opensky.js
│   │   ├── aviationstack.js
│   │   └── faa.js
│   └── App.jsx
├── api/                  # Vercel serverless functions
│   ├── aircraft.js
│   └── flight.js
└── README.md
```
