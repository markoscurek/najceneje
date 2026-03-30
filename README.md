# najceneje.si 🥦⚡

**Primerjava cen živil in energentov v Sloveniji** — vse na enem mestu, vsak dan osveženo.

## Kaj app primerja

### 🥦 Živila
- Primerjava cen v **Lidl, Mercator, Spar**
- Sestavi svojo košarico in takoj vidiš kje je najcenejša
- Graf zgodovine cen zadnjih 6 mesecev
- Tedenske akcije

### ⚡ Energenti
- **Gorivo** — 95 oktansko, dizel, UNP (regulirane cene, tedensko)
- **Elektrika** — primerjava tarifnih paketov ponudnikov + kalkulator prihrankov
- **Zemeljski plin** — primerjava ponudnikov
- **Kurilno olje** — trenutna cena in kalkulator za naročilo

## Tehnologije

- **Frontend**: HTML, CSS, JavaScript (brez frameworka — enostavno za deploy)
- **Grafi**: Chart.js
- **Hosting**: Vercel (brezplačno)
- **Podatki**: statične JS datoteke (v produkciji: Python scraper)

## Struktura projekta

```
najceneje/
├── index.html              # Glavna stran
├── src/
│   ├── styles/
│   │   └── main.css        # Vsi stili
│   ├── data/
│   │   ├── zivila.js       # Cene živil (posodablja scraper)
│   │   └── energenti.js    # Cene energentov (posodablja scraper)
│   └── components/
│       └── app.js          # Logika aplikacije
└── README.md
```

## Kako zagnati lokalno

1. Prenesi projekt (zeleni gumb "Code" → "Download ZIP")
2. Odpri mapo in dvoklikni `index.html`
3. App se odpre v brskalniku — to je vse!

## Kako objaviti na Vercel

1. Ustvari račun na [vercel.com](https://vercel.com)
2. Klikni "Add New Project" → "Import Git Repository"
3. Izberi ta repozitorij
4. Klikni "Deploy" — app je živ v 60 sekundah
5. Poveži svojo domeno v nastavitvah

## Posodabljanje podatkov

### Zdaj (ročno)
Uredi datoteki `src/data/zivila.js` in `src/data/energenti.js` direktno na GitHubu.

### V prihodnosti (avtomatsko)
Python scraper bo vsak dan ob 6:00 posodobil podatke prek GitHub Actions:
- Gorivo: scraping iz goriva.si
- Živila: scraping iz Mercator/Spar/Lidl spletnih strani
- Elektrika/plin: mesečno ročno posodabljanje

## Avtorji

Projekt nastaja z namenom pomagati slovenskim gospodinjstvom pri varčevanju.

---

*Podatki so informativne narave. Preverite cene pri posamezni trgovini/ponudniku.*
