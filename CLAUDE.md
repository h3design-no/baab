# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Hva BAAB er

BAAB (BarneAnestesi & AkuttBehandling) er et pediatrisk dose- og parameterkalkulator-PWA for anestesi og akuttbehandling — en lokal utvidet utgave av COPE-appen. Basert på åpen kildekode fra [AnaestheticsApp](https://anaesthetics.app/) under ISC-lisens. Under utvikling og ikke kvalitetssikret; verdier er veiledende.

## Kjøring og utvikling

- Ren statisk side. Ingen build-step, ingen `package.json`, ingen npm — Lit 3 lastes direkte fra `cdn.jsdelivr.net`.
- Lokal utvikling: server filene over HTTP (f.eks. `python3 -m http.server`). Service worker krever HTTP/HTTPS, ikke `file://`.
- Ingen tester, linter eller formatter konfigurert.
- Endringer vises ved hard reload — service worker cacher, men cache-busting på lokale requests håndteres allerede i [service-worker.js](service-worker.js).

## Arkitektur

**Én Lit-webkomponent driver hele UI-et.** [main.js](main.js) definerer `<calculator-view>` (LitElement) som rendrer alle fanene: "Oversikt", "Akutt", "Stans" (HLR), "Brann" (Parkland), "Medisiner". Innebygget CSS ligger på slutten av filen.

**Dataflyt ved input:**
1. Bruker setter alder (slider) og vekt (manuelt eller estimert fra alder).
2. `_btnSubmit()` i [main.js](main.js) kalles.
3. Den setter global state via `calc.setAge()`, `calc.setWeight()`, `calc.setBurnPercent()` i [logic/calculations.js](logic/calculations.js).
4. Kaller deretter `calc.respiratoryVitals()`, `calc.airwayField()`, `calc.hollidaySegar()`, `calc.drug(...)` osv. og fyller reaktive state-arrays (`_vitals`, `_calculations`, `_burnDrugs`, `_cpr`, ...).
5. Lit re-rendrer.

**De tre logikk-/datafilene henger sammen slik:**
- [drugList.js](drugList.js) eksporterer `drugs`-objektet med medisindefinisjoner: `{name, conc, unit, formula: [perKg]|[min, max], max?, class?, age_limit?, dec?, dv?, dialogText}`. `class` styrer fargekoding i UI-et (`opioid`, `sedative`, `nmbd`, `antinmbd`, `vaso`, `benzo`, `antimuscarinic`, `local`).
- [logic/calculations.js](logic/calculations.js) inneholder alle medisinske formler: aldersbaserte oppslagstabeller (vitalia, luftvei, urin), Holliday-Segar for væske, Parkland for brann, MTP for blodprodukter. `drug(opts)` er den sentrale dose-kalkulatoren — tar et drugList-objekt, returnerer formatert dose + injeksjonsvolum med smart enhetshåndtering (µg→mg→g).
- [main.js](main.js) destrukturerer enkeltmedisiner fra `drugs` (øverst i filen) og setter dem sammen i fanespesifikke arrays.

**Når du legger til/endrer en medisin:** rediger [drugList.js](drugList.js), og legg den inn i riktig fane-array i `_btnSubmit()` i [main.js](main.js). `class`-feltet bestemmer farge (definert i CSS-en i `main.js`).

**Når du endrer en formel** (vitalia, væske, luftvei, dosering): kun [logic/calculations.js](logic/calculations.js) — `main.js` kaller bare ut.

## PWA-detaljer som er lett å trå feil i

- [service-worker.js](service-worker.js) bruker network-first med cache-fallback. Lokale requests får `?cache-bust=<timestamp>` for å omgå GitHub Pages' `max-age=600`.
- Whitelist for caching: egen host, `fonts.googleapis.com`, `fonts.gstatic.com`, `cdn.jsdelivr.net`. Nye eksterne avhengigheter må inn i whitelisten øverst i filen, ellers passerer de uten cache.
- SW forhåndscacher Lit-CDN ved install — hvis Lit-versjon byttes, må URL-ene i `install`-handleren oppdateres tilsvarende.
- [manifest.json](manifest.json): `display: standalone`, scope `/`. Må endres ved deployment til underkatalog.

## Domenekontekst

- Alle vekt-/aldersgrenser og doser er **pediatriske** (0–18 år).
- "Stans" = hjertestans/HLR. "Brann" = brannskade. "MTP" = massiv transfusjonsprotokoll.
- Alder kodes både som `_age` (desimalår) og `_age_months` (heltall). Mange tabeller bruker måneder for de yngste.
- Vekt kan estimeres fra alder via en stor switch i [main.js](main.js) som mapper slider-posisjon (0–1000) til alder/vekt — ikke endre uten å forstå mappingen.
