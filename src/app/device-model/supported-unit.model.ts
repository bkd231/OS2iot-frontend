export class SupportedUnit {
  units: Unit[];

  constructor() {
    this.units = [
      { code: "28", name: "kg/m²" },
      { code: "2N", name: "dB" },
      { code: "4H", name: "µm" },
      { code: "4K", name: "mA" },
      { code: "4P", name: "N/m" },
      { code: "A24", name: "cd/m²" },
      { code: "A86", name: "GHz" },
      { code: "A94", name: "g/mol" },
      { code: "B22", name: "kA" },
      { code: "B32", name: "kg • m2" },
      { code: "B43", name: "kJ/(kg.K)" },
      { code: "B49", name: "kΩ" },
      { code: "B61", name: "lm/W" },
      { code: "BAR", name: "bar" },
      { code: "C16", name: "mm/s" },
      { code: "C24", name: "mPa.s" },
      { code: "C26", name: "ms" },
      { code: "C45", name: "nm" },
      { code: "C62", name: "1" },
      { code: "C65", name: "Pa.s" },
      { code: "C91", name: "1/K" },
      { code: "C94", name: "min-1" },
      { code: "CDL", name: "cd" },
      { code: "CEL", name: "°C" },
      { code: "CMQ", name: "cm³" },
      { code: "CMT", name: "cm" },
      { code: "D33", name: "T" },
      { code: "D52", name: "W/K" },
      { code: "D74", name: "kg/mol" },
      { code: "DAY", name: "d" },
      { code: "DD", name: "°" },
      { code: "E01", name: "N/cm²" },
      { code: "E32", name: "l/h" },
      { code: "FAR", name: "F" },
      { code: "GM", name: "g/m²" },
      { code: "GRM", name: "g" },
      { code: "HTZ", name: "Hz" },
      { code: "HUR", name: "h" },
      { code: "KEL", name: "K" },
      { code: "KGM", name: "kg" },
      { code: "KGS", name: "kg/s" },
      { code: "KHZ", name: "kHz" },
      { code: "KL", name: "kg/m" },
      { code: "KMQ", name: "kg/m³" },
      { code: "KVT", name: "kV" },
      { code: "KWT", name: "kW" },
      { code: "L2", name: "l/min" },
      { code: "LTR", name: "l" },
      { code: "LUM", name: "lm" },
      { code: "LUX", name: "lx" },
      { code: "MBR", name: "mbar" },
      { code: "MHZ", name: "MHz" },
      { code: "MIN", name: "min" },
      { code: "MMK", name: "mm²" },
      { code: "MMQ", name: "mm³" },
      { code: "MMT", name: "mm" },
      { code: "MPA", name: "MPa" },
      { code: "MQH", name: "m3/h" },
      { code: "MQS", name: "m³/s" },
      { code: "MTK", name: "m²" },
      { code: "MTQ", name: "m³" },
      { code: "MTR", name: "m" },
      { code: "MTS", name: "m/s" },
      { code: "NEW", name: "N" },
      { code: "NU", name: "N • m" },
      { code: "NUDOT", name: "N.m" },
      { code: "OHM", name: "Ω" },
      { code: "P1", name: "%" },
      { code: "PAL", name: "Pa" },
      { code: "SEC", name: "s" },
      { code: "VLT", name: "V" },
      { code: "WTT", name: "W " },
    ];
  }
}

export class Unit {
  code: string;
  name: string;
}
