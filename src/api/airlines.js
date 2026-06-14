const AIRLINE_CODES = {
  AAL: 'American Airlines', UAL: 'United Airlines', DAL: 'Delta Air Lines',
  SWA: 'Southwest Airlines', ASA: 'Alaska Airlines', JBU: 'JetBlue Airways',
  FFT: 'Frontier Airlines', NKS: 'Spirit Airlines', HAL: 'Hawaiian Airlines',
  SKW: 'SkyWest Airlines', RPA: 'Republic Airways', ENY: 'Envoy Air',
  BAW: 'British Airways', VIR: 'Virgin Atlantic', EZY: 'easyJet',
  RYR: 'Ryanair', IBE: 'Iberia', AFR: 'Air France', DLH: 'Lufthansa',
  KLM: 'KLM Royal Dutch Airlines', AUA: 'Austrian Airlines', SWR: 'Swiss International',
  TAP: 'TAP Air Portugal', AZA: 'Alitalia', VLG: 'Vueling', BEL: 'Brussels Airlines',
  UAE: 'Emirates', ETD: 'Etihad Airways', QTR: 'Qatar Airways', GFA: 'Gulf Air',
  SVA: 'Saudi Arabian Airlines', FDB: 'flydubai', EKW: 'Air Arabia',
  SIA: 'Singapore Airlines', MAS: 'Malaysia Airlines', THA: 'Thai Airways',
  CPA: 'Cathay Pacific', JAL: 'Japan Airlines', ANA: 'All Nippon Airways',
  KAL: 'Korean Air', AAR: 'Asiana Airlines', CCA: 'Air China',
  CSN: 'China Southern', CES: 'China Eastern', HXA: 'Hainan Airlines',
  AIC: 'Air India', IGO: 'IndiGo', SEJ: 'SpiceJet', GOW: 'Go Air',
  QFA: 'Qantas', VOZ: 'Virgin Australia', JST: 'Jetstar',
  TAM: 'LATAM Airlines', GLO: 'Gol Linhas Aéreas', AZU: 'Azul Airlines',
  AVA: 'Avianca', LAN: 'LAN Airlines', PAL: 'Philippine Airlines',
  TGW: 'Thai Smile', BAV: 'Bamboo Airways', VJC: 'VietJet Air',
  AEA: 'Air Europa', TCX: 'Thomas Cook Airlines', TOM: 'TUI Airways',
  EIN: 'Aer Lingus', FIN: 'Finnair', SAS: 'Scandinavian Airlines',
  NAX: 'Norwegian Air', WZZ: 'Wizz Air', TRA: 'Transavia',
  CFG: 'Condor', EWG: 'Eurowings', TUI: 'TUI fly',
  ETH: 'Ethiopian Airlines', KQA: 'Kenya Airways', MSR: 'EgyptAir',
  RAM: 'Royal Air Maroc', RJA: 'Royal Jordanian', THY: 'Turkish Airlines',
  PGT: 'Pegasus Airlines', OHY: 'Onur Air', AXB: 'Air Arabia Abu Dhabi',
  FEX: 'FedEx', UPS: 'UPS Airlines', ABX: 'ABX Air', GTI: 'Atlas Air',
  POE: 'Polar Air Cargo', CLX: 'Cargolux',
}

export function getAirlineName(callsign) {
  if (!callsign || callsign === 'N/A') return null
  const code = callsign.replace(/[0-9]/g, '').trim().toUpperCase()
  return AIRLINE_CODES[code] ?? null
}
