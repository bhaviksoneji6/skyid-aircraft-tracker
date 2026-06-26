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

// Military jets
const MILITARY_EXACT = new Set([
  'F15', 'F16', 'F18', 'FA18', 'F22', 'F35', 'F117', 'F14',
  'A10', 'AV8', 'AV8B',
  'B1', 'B2', 'B52', 'B21',
  'T38', 'T45', 'T6',
  'F5', 'F4',
])

function matchesPrefix(tc, prefixes) {
  return prefixes.some((p) => tc.startsWith(p))
}

// Returns one of: 'jet' | 'bizjet' | 'turboprop' | 'light' | 'helicopter' | 'military' | 'glider' | 'unknown'
export function getAircraftType(category, typecode, description) {
  const tc = typecode?.toUpperCase().trim() ?? ''
  const cat = category ?? ''
  const desc = description?.toUpperCase() ?? ''

  // Helicopters — category A7, then type code, then description as last resort
  // (catches unknown type codes and bad category data from the source)
  if (cat === 'A7') return 'helicopter'
  if (tc && (HELI_EXACT.has(tc) || matchesPrefix(tc, HELI_PREFIXES))) return 'helicopter'
  if (desc && HELI_DESC_KEYWORDS.some((k) => desc.includes(k))) return 'helicopter'

  // Gliders
  if (cat === 'B1' || cat === 'B4') return 'glider'

  // Military
  if (cat === 'A6') return 'military'
  if (tc && MILITARY_EXACT.has(tc)) return 'military'

  // Turboprops — type code required (category alone can't tell)
  if (tc && TURBOPROP_EXACT.has(tc)) return 'turboprop'

  // Business / private jets — same category as commercial but different type code
  if (tc && BIZJET_EXACT.has(tc)) return 'bizjet'

  // Light piston GA — category A1/A2 = light single/multi piston
  if (cat === 'A1' || cat === 'A2') return 'light'
  if (tc && (LIGHT_EXACT.has(tc) || matchesPrefix(tc, LIGHT_PREFIXES))) return 'light'

  // Confirmed commercial/airline jet category
  if (cat === 'A3' || cat === 'A4' || cat === 'A5') return 'jet'

  // Truly unclassified — don't guess
  return 'unknown'
}
