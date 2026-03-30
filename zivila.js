// ============================================================
// ŽIVILA — podatki o cenah
// V produkciji: ta datoteka se generira avtomatsko iz scraperja
// ============================================================

const ZIVILA = {
  'mleko 1L':        { Lidl: 0.89, Mercator: 0.99, Spar: 0.95 },
  'kruh 500g':       { Lidl: 1.19, Mercator: 1.39, Spar: 1.29 },
  'jajca 10 kom':    { Lidl: 2.49, Mercator: 2.89, Spar: 2.69 },
  'maslo 250g':      { Lidl: 2.39, Mercator: 2.79, Spar: 2.59 },
  'sir gouda 400g':  { Lidl: 3.29, Mercator: 3.89, Spar: 3.59 },
  'piščanec 1kg':    { Lidl: 4.99, Mercator: 5.79, Spar: 5.49 },
  'pasta 500g':      { Lidl: 0.79, Mercator: 0.99, Spar: 0.89 },
  'paradižnik 1kg':  { Lidl: 1.49, Mercator: 1.79, Spar: 1.65 },
  'banane 1kg':      { Lidl: 1.09, Mercator: 1.29, Spar: 1.19 },
  'jogurt 500g':     { Lidl: 0.99, Mercator: 1.19, Spar: 1.09 },
  'moka 1kg':        { Lidl: 0.89, Mercator: 1.05, Spar: 0.99 },
  'sladkor 1kg':     { Lidl: 1.29, Mercator: 1.49, Spar: 1.39 },
  'olje sončnično 1L':{ Lidl: 1.49, Mercator: 1.79, Spar: 1.65 },
  'riž 1kg':         { Lidl: 1.19, Mercator: 1.45, Spar: 1.35 },
  'pomaranče 1kg':   { Lidl: 1.29, Mercator: 1.59, Spar: 1.45 },
  'jabolka 1kg':     { Lidl: 1.39, Mercator: 1.69, Spar: 1.55 },
  'krompir 1kg':     { Lidl: 0.99, Mercator: 1.19, Spar: 1.09 },
  'čebula 1kg':      { Lidl: 0.79, Mercator: 0.99, Spar: 0.89 },
  'kavna mešanica':  { Lidl: 3.49, Mercator: 4.29, Spar: 3.89 },
  'toaletni papir 8 rol': { Lidl: 2.99, Mercator: 3.79, Spar: 3.49 },
};

// Mesečna zgodovina cen (zadnjih 6 mesecev: Okt → Mar)
const ZGODOVINA = {
  'mleko 1L': {
    Lidl:     [0.79, 0.82, 0.85, 0.85, 0.87, 0.89],
    Mercator: [0.89, 0.92, 0.95, 0.97, 0.99, 0.99],
    Spar:     [0.85, 0.88, 0.90, 0.92, 0.93, 0.95],
  },
  'kruh 500g': {
    Lidl:     [1.05, 1.09, 1.12, 1.15, 1.17, 1.19],
    Mercator: [1.19, 1.25, 1.29, 1.33, 1.37, 1.39],
    Spar:     [1.12, 1.17, 1.21, 1.24, 1.27, 1.29],
  },
  'jajca 10 kom': {
    Lidl:     [2.19, 2.29, 2.35, 2.39, 2.44, 2.49],
    Mercator: [2.49, 2.59, 2.69, 2.75, 2.82, 2.89],
    Spar:     [2.29, 2.42, 2.52, 2.59, 2.65, 2.69],
  },
  'maslo 250g': {
    Lidl:     [1.99, 2.09, 2.19, 2.25, 2.32, 2.39],
    Mercator: [2.29, 2.45, 2.55, 2.65, 2.72, 2.79],
    Spar:     [2.15, 2.25, 2.35, 2.42, 2.49, 2.59],
  },
};

const MESECI = ['Okt', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

// Tedenske akcije
const AKCIJE = [
  { store: 'Lidl', name: 'Piščančja prsa 1kg', oldPrice: 5.99, newPrice: 3.99 },
  { store: 'Mercator', name: 'Gauda sir 400g', oldPrice: 3.89, newPrice: 2.49 },
  { store: 'Spar', name: 'Grški jogurt 500g', oldPrice: 1.99, newPrice: 1.29 },
  { store: 'Lidl', name: 'Oljčno olje 750ml', oldPrice: 5.49, newPrice: 3.79 },
  { store: 'Mercator', name: 'Testenine De Cecco', oldPrice: 1.79, newPrice: 0.99 },
  { store: 'Spar', name: 'Mlečna čokolada 100g', oldPrice: 1.49, newPrice: 0.89 },
];

const HITRI_ARTIKLI = [
  'mleko 1L', 'kruh 500g', 'jajca 10 kom',
  'maslo 250g', 'pasta 500g', 'banane 1kg',
  'jogurt 500g', 'piščanec 1kg'
];
