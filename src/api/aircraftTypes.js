// Helicopter type codes (exact match)
const HELI_EXACT = new Set([
  // Robinson
  'R22', 'R44', 'R66',
  // Airbus Helicopters / Eurocopter
  'EC20', 'EC25', 'EC30', 'EC35', 'EC45', 'EC55', 'EC75',
  'H125', 'H130', 'H135', 'H145', 'H155', 'H160', 'H175', 'H215', 'H225',
  // Aerospatiale / AS
  'AS32', 'AS50', 'AS55', 'AS65',
  // Bell
  'B06', 'B06B', 'B212', 'B214', 'B222', 'B230', 'B407', 'B412', 'B427', 'B429',
  'B430', 'B505', 'B525',
  // Sikorsky
  'S61', 'S61R', 'S70', 'S76', 'S76A', 'S76B', 'S76C', 'S92',
  // MD Helicopters
  'H500', 'MD52', 'MD60', 'MD90',
  // AgustaWestland / Leonardo
  'AW09', 'AW19', 'AW69', 'AW10', 'AW13', 'AW16', 'AW17',
  // MBB
  'BK17',
  // Mil
  'MI8', 'MI17', 'MI26',
  // Military helos
  'HH60', 'MH60', 'SH60', 'UH60', 'CH47', 'CH46',
  // Boeing Vertol / tiltrotor
  'H47', 'H46', 'V22', 'MV22', 'CV22',
])

// Description substrings that only appear in helicopter aircraft names
// Used as a last-resort fallback when type code is unknown or category is bad data
const HELI_DESC_KEYWORDS = [
  'HELICOPTER', 'HELICOPTERS', 'ROTOR',
  'EUROCOPTER', 'ROBINSON', 'SIKORSKY', 'AGUSTA', 'GUIMBAL', 'ENSTROM',
  'VERTOL', 'CHINOOK',
]

// Helicopter prefix patterns
const HELI_PREFIXES = ['EC3', 'EC4', 'EC5', 'EC6', 'EC7', 'H12', 'H13', 'H14', 'H15', 'H16', 'H17', 'H22', 'AS3', 'AS5', 'AS6', 'AW', 'R2', 'R4', 'R6']

// Turboprop type codes
const TURBOPROP_EXACT = new Set([
  // ATR
  'AT43', 'AT45', 'AT72', 'AT73', 'AT75', 'AT76',
  // Bombardier Dash 8 / Q series
  'DH8A', 'DH8B', 'DH8C', 'DH8D',
  // de Havilland Canada
  'DHC6', 'DHC7',
  // Pilatus
  'PC12',
  // Cessna Caravan
  'C208', 'C208B',
  // Embraer
  'E120',
  // Jetstream
  'J328', 'J41', 'J31',
  // Saab
  'SF34', 'SB20', 'SB05',
  // Swearingen / Fairchild
  'SW4', 'SW3',
  // Beechcraft King Air / 1900
  'BE99', 'BE9L', 'B1900', 'B350', 'BE20', 'BE30',
  // CASA
  'C212', 'CN2',
  // Let
  'L410',
  // Piaggio
  'P180',
  // Piper Cheyenne
  'PA31T', 'PA42',
  // Daher TBM
  'TBM7', 'TBM8', 'TBM9',
])

// Business / private jets — rear-mounted engines, typically smaller
const BIZJET_EXACT = new Set([
  // Gulfstream
  'GLF4', 'GLF5', 'GL5T', 'GL7T', 'GLEX', 'G150', 'G200', 'G280',
  'G350', 'G400', 'G450', 'G500', 'G550', 'G600', 'G650', 'G700',
  // Bombardier Challenger
  'CL30', 'CL60', 'CL65',
  // Bombardier Learjet
  'LJ24', 'LJ25', 'LJ31', 'LJ35', 'LJ40', 'LJ45', 'LJ55', 'LJ60', 'LJ75',
  // Dassault Falcon
  'F2EX', 'F2TH', 'F7X', 'FA7X', 'F900', 'F50', 'F10T',
  // Cessna Citation
  'C500', 'C501', 'C510', 'C525', 'C526', 'C56X', 'C560', 'C680', 'C68A', 'C750',
  // Embraer Phenom / Legacy
  'E50P', 'E55P', 'E135', 'E545', 'E550',
  // HondaJet
  'HB20',
  // Beechcraft Premier / Hawker
  'BE40', 'BE400', 'H25B', 'H25C', 'HA4T',
  // Pilatus PC-24
  'PC24',
  // IAI Astra / Galaxy
  'ASTR', 'G100',
  // Mitsubishi MU-300
  'MU30',
])

// Light piston aircraft prefixes
const LIGHT_PREFIXES = [
  'C15', 'C16', 'C17', 'C18', 'C19', 'C20', 'C21',
  'PA1', 'PA2', 'PA3', 'PA4',
  'DA2', 'DA4',
  'SR2',
  'M20',
  'RV6', 'RV7', 'RV8', 'RV9', 'RV1', 'RV3', 'RV4',
]

// Light piston exact codes
const LIGHT_EXACT = new Set([
  'C172', 'C182', 'C206', 'C152', 'C150', 'C162', 'C185', 'C210',
  'PA28', 'PA32', 'PA34', 'PA18', 'PA22', 'PA24', 'PA30', 'PA36', 'PA38', 'PA44', 'PA46',
  'BE33', 'BE35', 'BE36', 'BE55', 'BE58', 'BE60', 'BE76', 'BE77', 'BE23',
  'DA20', 'DA40', 'DA42',
  'SR20', 'SR22', 'SR22T',
  'M20P', 'M20T', 'M20V',
  'AA5', 'AA1',
])

// Military jets, transports, patrol, and tankers
const MILITARY_EXACT = new Set([
  // Fighter / attack
  'F15', 'F15E', 'F15C', 'F15D', 'F16', 'F16C', 'F16D', 'F18', 'FA18', 'F22', 'F35',
  'F35A', 'F35B', 'F35C', 'F117', 'F14', 'F5', 'F4', 'A10',
  // V/STOL
  'AV8', 'AV8B',
  // Bombers
  'B1', 'B2', 'B52', 'B21',
  // Trainers
  'T38', 'T45', 'T6', 'T1',
  // C-130 family (all mission variants)
  'C130', 'C30J', 'LC13', 'KC13', 'AC13', 'HC13', 'MC13', 'WC13', 'EC13',
  // Heavy transports
  'C17', 'C5',
  // Medium transports
  'C27J', 'C295', 'C160',
  // Tankers
  'KC46', 'K35R', 'KC10',
  // Patrol / ISR
  'P8', 'P3', 'E3CF', 'E3TF', 'E6', 'U2', 'RC35', 'WP3D',
  // VIP / command
  'C40B', 'C40C', 'C32', 'C37', 'VC25', 'E4',
  // Utility
  'C12', 'C12F', 'C26',
])

// Confirmed glider ICAO type codes — the ONLY way we assign the glider symbol
// (B1/B4 ADS-B category is unreliable; many helicopters and military transports
//  arrive with bad category data from airplanes.live)
const GLIDER_EXACT = new Set([
  // Schleicher
  'ASW15', 'ASW17', 'ASW19', 'ASW20', 'ASW22', 'ASW24', 'ASW27', 'ASW28',
  'ASK13', 'ASK18', 'ASK21', 'ASK23',
  'ASH25', 'ASH26', 'ASH31',
  // DG Flugzeugbau
  'DG10', 'DG20', 'DG30', 'DG40', 'DG50', 'DG60', 'DG80',
  // Rolladen-Schneider
  'LS1', 'LS3', 'LS4', 'LS6', 'LS7', 'LS8', 'LS10',
  // Grob
  'G102', 'G103', 'G104',
  // Schempp-Hirth
  'DISC', 'DIS2', 'NIMB', 'NIM2', 'NIM3', 'VENT', 'VEN2', 'ARCUS', 'JANU',
  // SZD
  'SZD50', 'SZD54', 'SZD55',
  // Blanik
  'L13', 'L23', 'L33',
  // PZL / LAK / other
  'PW5', 'PW6', 'LAK17', 'LAK19', 'PIK20', 'H36', 'ASTIR',
])

function matchesPrefix(tc, prefixes) {
  return prefixes.some((p) => tc.startsWith(p))
}

// Returns one of: 'jet' | 'bizjet' | 'turboprop' | 'light' | 'helicopter' | 'military' | 'glider' | 'unknown'
export function getAircraftType(category, typecode, description) {
  const tc = typecode?.toUpperCase().trim() ?? ''
  const cat = category ?? ''
  const desc = description?.toUpperCase() ?? ''

  // Helicopters — category A7, then type code, then description keywords
  if (cat === 'A7') return 'helicopter'
  if (tc && (HELI_EXACT.has(tc) || matchesPrefix(tc, HELI_PREFIXES))) return 'helicopter'
  if (desc && HELI_DESC_KEYWORDS.some((k) => desc.includes(k))) return 'helicopter'

  // Military — high-performance category or explicit type code
  // Must come before light check (C-17 type code 'C17' would match LIGHT_PREFIXES otherwise)
  if (cat === 'A6') return 'military'
  if (tc && MILITARY_EXACT.has(tc)) return 'military'

  // Turboprops — type code required (category alone can't distinguish)
  if (tc && TURBOPROP_EXACT.has(tc)) return 'turboprop'

  // Business / private jets
  if (tc && BIZJET_EXACT.has(tc)) return 'bizjet'

  // Light piston GA — category A1/A2 or known type code
  if (cat === 'A1' || cat === 'A2') return 'light'
  if (tc && (LIGHT_EXACT.has(tc) || matchesPrefix(tc, LIGHT_PREFIXES))) return 'light'

  // Commercial / airline jets
  if (cat === 'A3' || cat === 'A4' || cat === 'A5') return 'jet'

  // Gliders — only via confirmed ICAO type code; never via B1/B4 category alone
  // because airplanes.live frequently sends B1 for helicopters and military transports
  // with bad or missing transponder category data
  if (tc && GLIDER_EXACT.has(tc)) return 'glider'

  return 'unknown'
}
