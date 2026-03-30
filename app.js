// ============================================================
// najceneje.si — glavna logika aplikacije
// ============================================================

// --- STATE ---
let basket = [];
let activeStores = { Lidl: true, Mercator: true, Spar: true };
let priceChart = null;
let fuelChart = null;
let kurilnoChart = null;
let currentHistoryItem = 'mleko 1L';

const STORE_COLORS = {
  Lidl:     '#d97706',
  Mercator: '#dc2626',
  Spar:     '#1a6b3c',
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initEnergyTabs();
  renderQuickTags();
  renderBasket();
  renderDeals();
  renderFuelPrices();
  renderElektrikaTable();
  renderPlinTable();
  renderKurilnoPrices();
  initStoreToggles();
  renderHistoryChart(currentHistoryItem);
  renderFuelChart();
  renderKurilnoChart();
  initSearch();
});

// --- TABS ---
function initTabs() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });
}

function initEnergyTabs() {
  document.querySelectorAll('.etab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.etab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.etab-content').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('etab-' + btn.dataset.etab).classList.add('active');
    });
  });
}

// --- SEARCH ---
function initSearch() {
  document.getElementById('search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') searchItem();
  });
}

function searchItem() {
  const val = document.getElementById('search-input').value.trim().toLowerCase();
  if (!val) return;
  const match = Object.keys(ZIVILA).find(k =>
    k.includes(val) || val.includes(k.split(' ')[0])
  );
  if (match) {
    addToBasket(match);
  } else {
    showNoMatch(val);
  }
  document.getElementById('search-input').value = '';
}

function showNoMatch(val) {
  const input = document.getElementById('search-input');
  input.style.borderColor = '#dc2626';
  input.placeholder = `"${val}" ni najden — poskusi drugačno besedo`;
  setTimeout(() => {
    input.style.borderColor = '';
    input.placeholder = 'Poišči artikel (mleko, kruh, jajca...)';
  }, 2500);
}

// --- QUICK TAGS ---
function renderQuickTags() {
  const el = document.getElementById('quick-tags');
  el.innerHTML = HITRI_ARTIKLI.map(item =>
    `<span class="tag" onclick="addToBasket('${item}')">${item}</span>`
  ).join('');
}

// --- BASKET ---
function addToBasket(item) {
  if (!basket.includes(item)) {
    basket.push(item);
    currentHistoryItem = item;
    renderBasket();
    renderCompare();
    renderHistoryChart(item);
    document.getElementById('history-label').textContent = item;
  }
}

function removeFromBasket(item) {
  basket = basket.filter(i => i !== item);
  renderBasket();
  renderCompare();
}

function clearBasket() {
  basket = [];
  renderBasket();
  renderCompare();
}

function renderBasket() {
  const list = document.getElementById('basket-list');
  const empty = document.getElementById('basket-empty');
  if (!basket.length) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  list.innerHTML = basket.map(item => `
    <div class="basket-item">
      <span class="basket-item-name">${item}</span>
      <button class="basket-item-remove" onclick="removeFromBasket('${item}')">×</button>
    </div>
  `).join('');
}

// --- COMPARE ---
function renderCompare() {
  const wrap = document.getElementById('compare-table');
  const empty = document.getElementById('compare-empty');
  if (!basket.length) {
    wrap.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  const totals = { Lidl: 0, Mercator: 0, Spar: 0 };
  basket.forEach(item => {
    const p = ZIVILA[item];
    if (p) Object.keys(totals).forEach(s => { totals[s] += p[s] || 0; });
  });

  const sorted = Object.entries(totals).sort((a, b) => a[1] - b[1]);
  const min = sorted[0][1];
  const max = sorted[sorted.length - 1][1];
  const saving = (max - min).toFixed(2);

  wrap.innerHTML = `
    <table>
      <thead><tr><th>Trgovina</th><th>Skupaj</th><th>Razlika</th></tr></thead>
      <tbody>
        ${sorted.map(([store, total], i) => `
          <tr class="${i === 0 ? 'winner' : ''}">
            <td>${store}</td>
            <td class="${i === 0 ? 'winner-price' : ''}">
              ${total.toFixed(2)} €
              ${i === 0 ? '<span class="winner-tag">najceneje</span>' : ''}
            </td>
            <td style="color:#9ca3af">
              ${i === 0 ? '—' : '+' + (total - min).toFixed(2) + ' €'}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="savings-bar">
      Prihraneš do <strong>${saving} €</strong> na nakup če izbereš ${sorted[0][0]}
    </div>
  `;
}

// --- STORE TOGGLES ---
function initStoreToggles() {
  const el = document.getElementById('store-toggles');
  el.innerHTML = Object.keys(STORE_COLORS).map(store => `
    <button class="store-toggle ${store.toLowerCase()} active"
            onclick="toggleStore('${store}', this)">
      ${store}
    </button>
  `).join('');
}

function toggleStore(store, btn) {
  activeStores[store] = !activeStores[store];
  btn.classList.toggle('inactive', !activeStores[store]);
  updateHistoryChart();
}

// --- HISTORY CHART (živila) ---
function renderHistoryChart(item) {
  const hist = ZGODOVINA[item] || ZGODOVINA['mleko 1L'];
  const ctx = document.getElementById('price-chart').getContext('2d');
  if (priceChart) priceChart.destroy();

  const datasets = Object.entries(STORE_COLORS).map(([store, color]) => ({
    label: store,
    data: hist[store] || [],
    borderColor: color,
    backgroundColor: color + '18',
    tension: 0.4,
    pointRadius: 4,
    pointHoverRadius: 6,
    borderWidth: 2,
    fill: false,
    hidden: !activeStores[store],
  }));

  priceChart = new Chart(ctx, {
    type: 'line',
    data: { labels: MESECI, datasets },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} €`
          }
        }
      },
      scales: {
        y: {
          ticks: { callback: v => v.toFixed(2) + ' €', font: { size: 11 } },
          grid: { color: 'rgba(0,0,0,0.05)' }
        },
        x: { ticks: { font: { size: 11 } }, grid: { display: false } }
      }
    }
  });
}

function updateHistoryChart() {
  if (!priceChart) return;
  priceChart.data.datasets.forEach(ds => {
    ds.hidden = !activeStores[ds.label];
  });
  priceChart.update();
}

// --- DEALS ---
function renderDeals() {
  const el = document.getElementById('deals-grid');
  el.innerHTML = AKCIJE.map(deal => {
    const pct = Math.round((1 - deal.newPrice / deal.oldPrice) * 100);
    return `
      <div class="deal-card">
        <div class="deal-store">${deal.store}</div>
        <div class="deal-name">${deal.name}</div>
        <div class="deal-prices">
          <span class="deal-new">${deal.newPrice.toFixed(2)} €</span>
          <span class="deal-old">${deal.oldPrice.toFixed(2)} €</span>
          <span class="deal-pct">-${pct}%</span>
        </div>
      </div>
    `;
  }).join('');
}

// --- FUEL PRICES ---
function renderFuelPrices() {
  const el = document.getElementById('fuel-prices');
  const trendLabel = { up: '▲ višje', down: '▼ nižje', same: '— nespremenjeno' };
  el.innerHTML = Object.entries(GORIVO).map(([name, data]) => `
    <div class="fuel-card">
      <div class="fuel-type">${name}</div>
      <div class="fuel-price">${data.cena.toFixed(3)}</div>
      <div class="fuel-unit">${data.enota}</div>
      <div class="fuel-trend ${data.trend}">
        ${trendLabel[data.trend]} (${data.sprememba} €)
      </div>
    </div>
  `).join('');
}

// --- FUEL CHART ---
function renderFuelChart() {
  const ctx = document.getElementById('fuel-chart').getContext('2d');
  if (fuelChart) fuelChart.destroy();

  const colors = { '95 oktansko': '#d97706', 'dizel': '#1d4ed8', 'kurilno olje': '#dc2626' };
  const datasets = Object.entries(GORIVO_ZGODOVINA).map(([name, data]) => ({
    label: name,
    data,
    borderColor: colors[name],
    backgroundColor: colors[name] + '15',
    tension: 0.4,
    pointRadius: 3,
    borderWidth: 2,
    fill: false,
  }));

  fuelChart = new Chart(ctx, {
    type: 'line',
    data: { labels: GORIVO_MESECI, datasets },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: true, position: 'bottom', labels: { font: { size: 11 }, boxWidth: 12 } },
        tooltip: {
          callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(3)} €/L` }
        }
      },
      scales: {
        y: {
          ticks: { callback: v => v.toFixed(2) + ' €', font: { size: 11 } },
          grid: { color: 'rgba(0,0,0,0.05)' }
        },
        x: { ticks: { font: { size: 11 } }, grid: { display: false } }
      }
    }
  });
}

// --- KURILNO OIL PRICES ---
function renderKurilnoPrices() {
  const el = document.getElementById('kurilno-prices');
  const d = GORIVO['kurilno olje'];
  el.innerHTML = `
    <div class="fuel-card">
      <div class="fuel-type">Kurilno olje EL</div>
      <div class="fuel-price">${d.cena.toFixed(3)}</div>
      <div class="fuel-unit">€/L (za 1000L+)</div>
      <div class="fuel-trend ${d.trend}">${d.trend === 'same' ? '— nespremenjeno' : (d.trend === 'up' ? '▲ višje' : '▼ nižje')} (${d.sprememba} €)</div>
    </div>
    <div class="fuel-card">
      <div class="fuel-type">Za 500L</div>
      <div class="fuel-price">${(d.cena * 500).toFixed(0)}</div>
      <div class="fuel-unit">€ skupaj</div>
      <div class="fuel-trend same">ocena za 500L dostave</div>
    </div>
    <div class="fuel-card">
      <div class="fuel-type">Za 1000L</div>
      <div class="fuel-price">${(d.cena * 1000).toFixed(0)}</div>
      <div class="fuel-unit">€ skupaj</div>
      <div class="fuel-trend same">ocena za 1000L dostave</div>
    </div>
  `;
}

function renderKurilnoChart() {
  const ctx = document.getElementById('kurilno-chart').getContext('2d');
  if (kurilnoChart) kurilnoChart.destroy();
  kurilnoChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: GORIVO_MESECI,
      datasets: [{
        label: 'Kurilno olje €/L',
        data: GORIVO_ZGODOVINA['kurilno olje'],
        borderColor: '#dc2626',
        backgroundColor: '#dc262615',
        tension: 0.4,
        pointRadius: 4,
        borderWidth: 2,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => `${ctx.parsed.y.toFixed(3)} €/L` } }
      },
      scales: {
        y: { ticks: { callback: v => v.toFixed(2) + ' €', font: { size: 11 } }, grid: { color: 'rgba(0,0,0,0.05)' } },
        x: { ticks: { font: { size: 11 } }, grid: { display: false } }
      }
    }
  });
}

// --- ELEKTRIKA TABLE ---
function renderElektrikaTable() {
  const el = document.getElementById('elektrika-table');
  el.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Ponudnik</th>
          <th>VT (ct/kWh)</th>
          <th>MT (ct/kWh)</th>
          <th>Fiksni (€/leto)</th>
          <th>Letni strošek*</th>
          <th>Vrsta</th>
        </tr>
      </thead>
      <tbody>
        ${ELEKTRIKA.map((p, i) => {
          const letni = calcLetniStrosek(p, 3500);
          return `
            <tr class="${i === 0 ? 'best-row' : ''}">
              <td class="provider-name">
                <span class="rank-${p.rank}">${p.ponudnik}</span>
              </td>
              <td class="${i === 0 ? 'best-price' : ''}">${p.cenaVT.toFixed(2)}</td>
              <td class="${i === 0 ? 'best-price' : ''}">${p.cenaMT.toFixed(2)}</td>
              <td>${p.fiksni.toFixed(0)}</td>
              <td class="price-cell ${i === 0 ? 'best-price' : ''}">${letni.toFixed(0)} €</td>
              <td><span style="font-size:11px;padding:2px 7px;border-radius:20px;background:${p.tip === 'fiksni' ? '#e8f5ee' : '#fef3c7'};color:${p.tip === 'fiksni' ? '#1a6b3c' : '#92400e'}">${p.tip}</span></td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
    <div style="padding:10px 16px;font-size:11px;color:#9ca3af;border-top:1px solid #f3f4f6">
      * Letni strošek izračunan za 3.500 kWh/leto (65% VT, 35% MT), brez DDV
    </div>
  `;
}

function calcLetniStrosek(ponudnik, kwh) {
  const vtKwh = kwh * VT_DELEZ;
  const mtKwh = kwh * (1 - VT_DELEZ);
  return (vtKwh * ponudnik.cenaVT / 100) + (mtKwh * ponudnik.cenaMT / 100) + ponudnik.fiksni;
}

// --- ELEKTRIKA KALKULATOR ---
function calcElektrika() {
  const kwh = parseFloat(document.getElementById('kwh-input').value) || 3500;
  const results = ELEKTRIKA.map(p => ({
    ...p,
    letni: calcLetniStrosek(p, kwh)
  })).sort((a, b) => a.letni - b.letni);

  const min = results[0].letni;
  const max = results[results.length - 1].letni;

  document.getElementById('calc-result').innerHTML = `
    <div style="margin-bottom:8px;font-size:13px;color:#4b5563">
      Za <strong>${kwh.toLocaleString()} kWh/leto</strong>:
    </div>
    ${results.map((p, i) => `
      <div class="calc-result-row">
        <span style="font-size:13px;${i === 0 ? 'font-weight:600;color:#1a6b3c' : ''}">
          ${i === 0 ? '🥇 ' : ''}${p.ponudnik}
        </span>
        <span style="font-weight:600;${i === 0 ? 'color:#1a6b3c' : ''}">
          ${p.letni.toFixed(0)} €/leto
          ${i > 0 ? `<span style="font-size:11px;color:#9ca3af;font-weight:400"> (+${(p.letni - min).toFixed(0)} €)</span>` : ''}
        </span>
      </div>
    `).join('')}
    <div style="margin-top:10px;padding:10px;background:#e8f5ee;border-radius:8px;font-size:13px;color:#1a6b3c;font-weight:500;text-align:center">
      Prihraneš do ${(max - min).toFixed(0)} €/leto če izbereš ${results[0].ponudnik}
    </div>
  `;
}

// --- PLIN TABLE ---
function renderPlinTable() {
  const el = document.getElementById('plin-table');
  el.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Ponudnik</th>
          <th>Cena (ct/kWh)</th>
          <th>Fiksni (€/leto)</th>
          <th>Pogodba</th>
        </tr>
      </thead>
      <tbody>
        ${PLIN.map((p, i) => `
          <tr class="${i === 0 ? 'best-row' : ''}">
            <td class="provider-name"><span class="rank-${p.rank}">${p.ponudnik}</span></td>
            <td class="price-cell ${i === 0 ? 'best-price' : ''}">${p.cena.toFixed(2)}</td>
            <td>${p.fiksni.toFixed(0)}</td>
            <td style="font-size:12px;color:#9ca3af">${p.pogodba}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div style="padding:10px 16px;font-size:11px;color:#9ca3af;border-top:1px solid #f3f4f6">
      Cene brez DDV. Preverite aktualne pogoje pri posameznem ponudniku.
    </div>
  `;
}
