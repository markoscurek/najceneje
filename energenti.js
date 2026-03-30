// ============================================================
// ENERGENTI — podatki o cenah
// V produkciji: gorivo se bere iz goriva.si, ostalo ročno/mesečno
// ============================================================

// GORIVO — regulirane cene (posodablja vlada tedensko od marca 2026)
const GORIVO = {
  '95 oktansko': { cena: 1.389, enota: '€/L', trend: 'up', sprememba: '+0.021' },
  'dizel':       { cena: 1.312, enota: '€/L', trend: 'down', sprememba: '-0.008' },
  'kurilno olje':{ cena: 1.024, enota: '€/L', trend: 'same', sprememba: '0.000' },
  'UNP plin':    { cena: 0.812, enota: '€/L', trend: 'up', sprememba: '+0.015' },
};

// Mesečna zgodovina cen goriva (Okt → Mar)
const GORIVO_ZGODOVINA = {
  '95 oktansko': [1.291, 1.312, 1.334, 1.358, 1.368, 1.389],
  'dizel':       [1.251, 1.272, 1.289, 1.305, 1.320, 1.312],
  'kurilno olje':[0.951, 0.972, 0.989, 1.005, 1.024, 1.024],
};

const GORIVO_MESECI = ['Okt', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

// ELEKTRIKA — paketi ponudnikov (cena v ct/kWh brez DDV, fiksni del €/leto)
const ELEKTRIKA = [
  {
    rank: 1,
    ponudnik: 'E3 energetika',
    paket: 'E3 Fiksni',
    cenaVT: 12.80, cenaMT: 8.20,
    fiksni: 48.00,
    tip: 'fiksni',
    pogodba: '12 mesecev',
    url: 'https://e3.si',
  },
  {
    rank: 2,
    ponudnik: 'Petrol',
    paket: 'Petrol Varčni',
    cenaVT: 13.10, cenaMT: 8.50,
    fiksni: 36.00,
    tip: 'fiksni',
    pogodba: '24 mesecev',
    url: 'https://petrol.si',
  },
  {
    rank: 3,
    ponudnik: 'Gen-I',
    paket: 'Gen-I Zelena',
    cenaVT: 13.45, cenaMT: 8.80,
    fiksni: 42.00,
    tip: 'fiksni',
    pogodba: '12 mesecev',
    url: 'https://gen-i.si',
  },
  {
    rank: 4,
    ponudnik: 'Elektro Ljubljana',
    paket: 'EL Osnovna',
    cenaVT: 13.90, cenaMT: 9.10,
    fiksni: 60.00,
    tip: 'spremenljivi',
    pogodba: 'nedoločen čas',
    url: 'https://elektro-ljubljana.si',
  },
  {
    rank: 5,
    ponudnik: 'Energija+',
    paket: 'Smart Home',
    cenaVT: 14.20, cenaMT: 9.30,
    fiksni: 54.00,
    tip: 'spremenljivi',
    pogodba: 'nedoločen čas',
    url: 'https://energijaplus.si',
  },
];

// ZEMELJSKI PLIN — paketi ponudnikov (cena v ct/kWh)
const PLIN = [
  {
    rank: 1,
    ponudnik: 'Petrol',
    paket: 'Petrol Plin Varčni',
    cena: 8.12,
    fiksni: 84.00,
    pogodba: '12 mesecev',
  },
  {
    rank: 2,
    ponudnik: 'E3 energetika',
    paket: 'E3 Plin Fiksni',
    cena: 8.34,
    fiksni: 72.00,
    pogodba: '12 mesecev',
  },
  {
    rank: 3,
    ponudnik: 'Gen-I',
    paket: 'Gen-I Plin',
    cena: 8.56,
    fiksni: 78.00,
    pogodba: '24 mesecev',
  },
  {
    rank: 4,
    ponudnik: 'Energija+',
    paket: 'Plin Standard',
    cena: 8.89,
    fiksni: 96.00,
    pogodba: 'nedoločen čas',
  },
];

// Povprečna razdelitev porabe elektrike (VT/MT)
const VT_DELEZ = 0.65; // 65% visoka tarifa, 35% nizka tarifa
