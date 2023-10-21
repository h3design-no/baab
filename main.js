//import './views/calculator-view.js';

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
// import { classMap } from 'https://cdn.jsdelivr.net/gh/lit/dist@3.0.0/all/lit-all.min.js.map';
//import { LitElement, html, css } from 'lit-element';
//import { classMap } from 'lit-html/directives/class-map.js';


import * as calc from './logic/calculations.js';

const ADRENALIN = { name: 'Adrenalin', conc: [.01], unit: 'mg/ml', formula: [1], class: 'vaso' };
const ADRENALIN_STANS = { name: 'Adrenalin', conc: [.1], unit: 'mg/ml', formula: [10], max: [1000], class: 'vaso' };
const ALFENTANIL = { name: 'Alfentanil', conc: [.5], unit: 'mg/ml', formula: [10, 20], class: 'opioid' };
const ATROPIN = { name: 'Atropin', conc: [1], unit: 'mg/ml', formula: [10, 20], max: [1000], class: 'antimuscarinic' };
const BENPEN = { name: 'Benpen', conc: [10], unit: 'mg/ml', formula: [25000], max: [1200000] };
const BRIDION = { name: 'Bridion', conc: [100], unit: 'mg/ml', formula: [2000, 4000], max: [1200000], class: 'antinmbd' };
const BUPIVACAIN = { name: 'Bupivacain', conc: [2.5], unit: 'mg/ml', formula: [2000], class: 'local' };
const CALCIUMGLUKONAT = { name: 'Calciumglukonat', conc: [.225], unit: 'mmol/ml', formula: [100], max: [4500] };
const CEFAZOLIN = { name: 'Cefazolin', conc: [100], unit: 'mg/ml', formula: [30000], max: [2000000] };
const CEFUROXIM = { name: 'Cefuroxim', conc: [100], unit: 'mg/ml', formula: [50000], max: [1500000] };
const CISATRACURIUM = { name: 'Cisatracurium', conc: [2], unit: 'mg/ml', formula: [150], max: [100000], class: 'nmbd' };
const CORDARONE1 = { name: 'Cordarone', conc: [50], unit: 'mg/ml', formula: [5000], max: [300000] };
const CORDARONE2 = { name: 'Cordarone', conc: [50], unit: 'mg/ml', formula: [5000], max: [150000] };
const CYCLOCAPRON = { name: 'Cyclocapron', conc: [100], unit: 'mg/ml', formula: [15000], max: [1500000] };
const DEKSAMETASON = { name: 'Deksametason', conc: [4], unit: 'mg/ml', formula: [200, 400], max: [12000], dec: [1] };
const DEXDOR_N = { name: 'Dexdor (nasal)*', conc: [.1], unit: 'mg/ml', formula: [2, 4], max: [200], dv: [.1] };
const DIAZEPAM = { name: 'Diazepam', conc: [5], unit: 'mg/ml', formula: [100], class: 'benzo' };
const FENTANYL = { name: 'Fentanyl', conc: [.05], unit: 'mg/ml', formula: [1, 2], max: [200], class: 'opioid', text: 'Bivirkninger: respirasjondepresjon'};
const FIBRINOGEN = { name: 'Fibrinogen', conc: [20], unit: 'mg/ml', formula: [35000, 70000], max: [5000000] };
const GLYCOPYRRON = { name: 'Glycopyrron', conc: [.2], unit: 'mg/ml', formula: [5, 10], max: [400], class: 'antimuscarinic' };
const IBUPROFEN = { name: 'Ibuprofen', conc: [10], unit: 'mg/ml', formula: [6000, 10000], max: [400000], age_limit: [6] };
const KETAMIN = { name: 'Ketamin', conc: [10], unit: 'mg/ml', formula: [1000, 2000], class: 'sedative' };
const KETAMIN_N = { name: 'Ketamin (nasal)*', conc: [50], unit: 'mg/ml', formula: [1000, 1500], class: 'sedative', dv: [.1] };
const KETOROLAK = { name: 'Ketorolak', conc: [30], unit: 'mg/ml', formula: [500, 600], max: [30000], age_limit: [12] };
const KLONIDIN = { name: 'Klonidin', conc: [.015], unit: 'mg/ml', formula: [1], max: [75] };
const LIDOCAIN = { name: 'Lidocain', conc: [10], unit: 'mg/ml', formula: [3000, 7000], class: 'local' };
const METRONIDAZOLE = { name: 'Metronidazole', unit: 'mg/ml', conc: [5], formula: [7500], max: [1500000] };
const MIDAZOLAM = { name: 'Midazolam', conc: [1], unit: 'mg/ml', formula: [50, 100], class: 'benzo' };
const NACL = { name: 'NaCl', conc: [1], unit: 'mmol/ml', formula: [2000], type: 'liquid' };
const ONDANSETRON = { name: 'Ondansetron', conc: [2], unit: 'mg/ml', formula: [150], max: [4000] };
const ORAMORPH = { name: 'Oramorph', conc: [10], unit: 'mg/ml', formula: [20, 40], class: 'opioid' };
const PARACETAMOL = { name: 'Paracetamol', conc: [10], unit: 'mg/ml', formula: [10000, 15000] };
const PARECOXIB = { name: 'Parecoxib', conc: [10], unit: 'mg/ml', formula: [1000], max: [40000], age_limit: [12] };
const PROPOFOL = { name: 'Propofol', conc: [10], unit: 'mg/ml', formula: [3000, 5000], class: 'sedative', dec: [0] };
const ROCURONIUM = { name: 'Rocuronium', conc: [10], unit: 'mg/ml', formula: [600, 1200], max: [100000], class: 'nmbd' };
const ROBINUL_NEOSTIGMIN = { name: 'Robinul/Neostigmin 0.5 /', conc: [2.5], unit: 'mg/ml', formula: [50], max: [5000], class: 'antinmbd' };
const SUXAMETHONIUM = { name: 'Suxamethonium', conc: [10], unit: 'mg/ml', formula: [1000, 2000], max: [100000], class: 'nmbd' };
const THIOPENTAL = { name: 'Thiopental', conc: [25], unit: 'mg/ml', formula: [5000, 8000], class: 'sedative' };
const VECURONIUM = { name: 'Vecuronium', conc: [2], unit: 'mg/ml', formula: [100], max: [100000], class: 'nmbd' };


///////////////////////////////////////////




/////////////////////////////////////////

class CalculatorView extends LitElement {
  static get properties() {
    return {
      _estWeight: { type: String },
      _calculations: { type: Array },
      _vitals: { type: Array },
      _selectedTab: { type: Number },
      _cpr: { type: Array },
      _airwayOverview: { type: Array },
      _eliminations: { type: Array },
    };
  }

  constructor() {
    super();
    this._estWeight = '15';
    this._calculations = [];
    this._vitals = [];
    this._airwayOverview = [];
    this._fluids = [];
    this._eliminations = [];
    this._acuteDrugs = [];
    this._cpr = [];
    this._cpr_adrenalin = [];
    this._cpr_airways = [];
    this._cpr_cordarone1 = [];
    this._cpr_cordarone2 = [];
    this._burn =[];
    this._burnDrugs = [];
    this._drugs =[];
    this._selectedTab = 0; // Initially select the first tab
    //////////
   
    /////////
  }

  selectTab(tabIndex) {
    this._selectedTab = tabIndex;
  }

  ////////////////////////



  ///////////////////////



  _updateEstimatedWeight(e) {
    const age = e.target.value < 19
      ? e.target.value + 'm'
      : Math.ceil(e.target.value / 12)
 
    this._clearCalculations();
    if (!age) return this._estWeight = '';


    // this._estWeight = age <= 5
    //   ? 2 * age + 8
    //   : 3 * age + 7;

    switch(age) {
      case '0m':
        this._estWeight = 3
        break;
      case '1m':
        this._estWeight = 4
        break;
        case '2m':
          this._estWeight = 5
          break;
      case '3m':
        this._estWeight = 6
        break;
      case '4m':
        this._estWeight = 7
        break;
      case '5m':
        this._estWeight = 7
        break;
      case '6m':
        this._estWeight = 8
        break;
      case '7m':
        this._estWeight = 8
        break;
      case '8m':
        this._estWeight = 9
        break;
      case '9m':
        this._estWeight = 9
        break;
      case '10m':
        this._estWeight = 9
        break;
      case '11m':
        this._estWeight = 10
        break;
      case '12m':
        this._estWeight = 10
        break;  
      case '13m':
        this._estWeight = 10
        break;
      case '14m':
        this._estWeight = 10
        break;
      case '15m':
        this._estWeight = 11
        break;
      case '16m':
        this._estWeight = 11
        break; 
      case '17m':
        this._estWeight = 11
        break;
      case '18m':
        this._estWeight = 11
        break;
      case 2:
        this._estWeight = 12
        break;
      case 3:
        this._estWeight = 15
        break;  
      case 4:
        this._estWeight = 17
        break;
      case 5:
        this._estWeight = 19
        break;
      case 6:
        this._estWeight = 21
        break;
      case 7:
        this._estWeight = 25
        break;  
      case 8:
        this._estWeight = 27
        break;
      case 9:
        this._estWeight = 28
        break; 
      case 10:
        this._estWeight = 31
        break;
      case 11:
        this._estWeight = 34
        break;  
      case 12:
        this._estWeight = 38
        break;
      case 13:
        this._estWeight = 42
        break;
      case 14:
        this._estWeight = 48
        break;
      case 15:
        this._estWeight = 54
        break;  
      case 16:
        this._estWeight = 60
        break;
      case 17:
        this._estWeight = 63
        break;   
      case 18:
        this._estWeight = 65
        break;
    } 

    if (this._estWeight >= 70) this._estWeight = 70;
    // console.log('estWeight', this._estWeight);

    const months = parseInt(e.target.value);
    let ageText = "";

    if (months < 19) {
      ageText = months + " måneder";
    } else {
      const years = Math.ceil(months / 12);
      ageText = years + " år";
    }

    this.shadowRoot.getElementById("age-output").textContent = ageText;
  }
  _clearCalculations() {
    this._calculations = [];
  }
  _btnSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const months = formData.get('age');
    const age = formData.get('age') / 12;
    const weight = formData.get('weight') ? formData.get('weight') : this._estWeight;
    const burnPercent = formData.get('burn')
    console.log(months)

    calc.setAge(age);
    calc.ageMonths(months);
    calc.setWeight(weight);
    calc.setBurnPercent(burnPercent);

    this._vitals = [
      ...calc.respiratoryVitals(),
      ...calc.tidalVolume(),
      ...calc.cardiovascularVitals(),
      ...calc.bloodVolume()
    ];

    this._airwayOverview = [
      ...calc.airwayField()
    ];

    this._cpr = [
      { title: '5 innblåsninger', dose: '15:2', class: 'cpr' },
      { title: 'Frekvens', dose: '100-120', class: 'cpr' },
      ...calc.shockEnergy()
    ];

    this._fluids = [
      { title: 'Basalt væskebehov', dose: 'Holliday & Segar :', class: '' },
      ...calc.hollidaySegar()
    ];

    this._eliminations = [
      ...calc.urineProduction(),
      ...calc.urineVolume(),
      ...calc.urineCatheter()
    ];

    this._cpr_airways = [
      calc.airway()
    ];

    this._burn = [
      ...calc.burnPercent()
    ];

    this._calculations = [
      calc.drug(PROPOFOL),
      calc.drug(KETAMIN),
      calc.drug(KETAMIN_N),
      calc.drug(THIOPENTAL),
      calc.drug(DEXDOR_N),
      calc.drug(SUXAMETHONIUM),
      calc.drug(ROCURONIUM),
      calc.drug(VECURONIUM),
      calc.drug(CISATRACURIUM),
      calc.drug(ROBINUL_NEOSTIGMIN),
      calc.drug(FENTANYL),
      calc.drug(ALFENTANIL),
      calc.drug(PARACETAMOL),
      calc.drug(IBUPROFEN),
      calc.drug(PARECOXIB),
      calc.drug(KETOROLAK),
      calc.drug(DIAZEPAM),
      calc.drug(MIDAZOLAM),
      calc.drug(GLYCOPYRRON),
      calc.drug(ATROPIN),
      calc.drug(ADRENALIN),
      calc.drug(KLONIDIN),
      calc.drug(DEKSAMETASON),
      calc.drug(ONDANSETRON),
      calc.drug(CEFUROXIM),
      calc.drug(METRONIDAZOLE),
      calc.drug(CEFAZOLIN),
      calc.drug(BENPEN),
      calc.drug(LIDOCAIN),
      calc.drug(BUPIVACAIN),
      calc.bloodProd()
    ];

    this._acuteDrugs = [
      calc.bloodProd(),
      calc.drug(CYCLOCAPRON),
      calc.drug(CALCIUMGLUKONAT),
      calc.drug(FIBRINOGEN),
      calc.drug(PROPOFOL),
      calc.drug(KETAMIN),
      calc.drug(SUXAMETHONIUM),
      calc.drug(ROCURONIUM),
      calc.drug(FENTANYL),
      calc.drug(ALFENTANIL),
      calc.drug(DIAZEPAM),
      calc.drug(MIDAZOLAM),
      calc.drug(GLYCOPYRRON),
      calc.drug(ATROPIN),
      calc.drug(ADRENALIN),
      calc.drug(ONDANSETRON),
      calc.drug(NACL)
    ];

    this._cpr_adrenalin = [
      calc.drug(ADRENALIN_STANS),
    ];

    this._cpr_cordarone1 = [
      calc.drug(CORDARONE1),
    ];

    this._cpr_cordarone2 = [
      calc.drug(CORDARONE2),
    ];

    this._burnDrugs = [
      calc.drug(PROPOFOL),
      calc.drug(KETAMIN),
      calc.drug(KETAMIN_N),
      calc.drug(THIOPENTAL),
      calc.drug(SUXAMETHONIUM),
      calc.drug(ROCURONIUM),
      calc.drug(FENTANYL),
      calc.drug(ALFENTANIL),
      calc.drug(DIAZEPAM),
      calc.drug(MIDAZOLAM),
      calc.drug(GLYCOPYRRON),
      calc.drug(ATROPIN),
      calc.drug(ADRENALIN),
      calc.drug(ONDANSETRON),
      calc.drug(LIDOCAIN),
      calc.drug(BUPIVACAIN)
    ];

    this._drugs = [
      calc.drug(PROPOFOL),
      calc.drug(KETAMIN),
      calc.drug(THIOPENTAL),
      calc.drug(SUXAMETHONIUM),
      calc.drug(ROCURONIUM),
      calc.drug(VECURONIUM),
      calc.drug(CISATRACURIUM),
      calc.drug(ROBINUL_NEOSTIGMIN),
      calc.drug(BRIDION),
      calc.drug(FENTANYL),
      calc.drug(ALFENTANIL),
      calc.drug(ORAMORPH),
      calc.drug(PARACETAMOL),
      calc.drug(IBUPROFEN),
      calc.drug(DIAZEPAM),
      calc.drug(MIDAZOLAM),
      calc.drug(GLYCOPYRRON),
      calc.drug(ATROPIN),
      calc.drug(ADRENALIN),
      calc.drug(DEKSAMETASON),
      calc.drug(ONDANSETRON),
      calc.drug(CEFAZOLIN),
      calc.drug(CEFUROXIM),
      calc.drug(METRONIDAZOLE),
      calc.drug(BENPEN),
      calc.drug(LIDOCAIN),
      calc.drug(BUPIVACAIN),
      calc.drug(NACL),
      calc.drug(CYCLOCAPRON),
      calc.drug(CALCIUMGLUKONAT),
      calc.drug(FIBRINOGEN)
    ];

    /*
    if (age<=1) {
      container.appendChild(make(['div', {class:'flex-item-view'}, 'Term>3kg to <8mo']));
      container.appendChild(make(['div', {class:'flex-item-view'}, 'COETT #3']));
    }
    */
  }



  renderForm() {
    return html`
      <form id="formCalc" @submit="${this._btnSubmit}">
        <div  class="awb-input">
          <div class="slider">
          <div class="labels">
            <div class="age-display">

            <label for="age">Alder:</label><output id="age-output">3 år</output>
  </div>
  <div class="wbi">
            <label for="weight">Vekt i kg:</label>
            <input
              type="number"
              name="weight"
              placeholder="~${this._estWeight || ''}kg"
              @input="${this._clearCalculations}"
            />
  </div>
  <div class="wbi">      
          
            <label for="burn">Brannskade:</label>
            <input
              type="number"
              name="burn"
              placeholder="%"
            />
            </div>
          </div>
          
            <div class="slider-container">
              <input type="range" name="age" id="age-slider" min="0" max="216" step="1" value='36'  @input="${this._updateEstimatedWeight}">
              
            </div>
          </div>
          <section>
 
  </section>
  </div>
       
        <button type="submit" class="calc-submit" id="calc-submit">
          <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M13.03,7.06L14.09,6l1.41,1.41 L16.91,6l1.06,1.06l-1.41,1.41l1.41,1.41l-1.06,1.06L15.5,9.54l-1.41,1.41l-1.06-1.06l1.41-1.41L13.03,7.06z M6.25,7.72h5v1.5h-5 V7.72z M11.5,16h-2v2H8v-2H6v-1.5h2v-2h1.5v2h2V16z M18,17.25h-5v-1.5h5V17.25z M18,14.75h-5v-1.5h5V14.75z"/></g></svg>
        </button>
      </form>
    `;
  }
  render() {
    return html`
    <drug-dialog style="display: none;"></drug-dialog>
      ${this.renderForm()}
      ${this._calculations.length === 0
        ? html`
             <img class="logo" src="logo.svg">
            <div class="label">UNDER UTVIKLING - BRUK MED VARSOMHET</div>
            <div class="label">Velg alder, vekt og eventuelt % 2. og 3. grads forbrenning over (vekt estimeres hvis ikke oppgitt)</div>
            <div class="label">-> Trykk på den blå knappen for å kalkulere (alle verdier kan oppdateres senere) </div>
            <div class="label">Dette er kun et hjelpemiddel. Oppgitte verdier er veiledende, og feil kan forekomme</div>
            <div class="label"><a href="om.html">Se her for hjelp til å installere som en app</a></div>
          `
        : ''
      }
 
      <!-- Tab buttons -->
      <div class="tab-buttons">
        <button class="${this._selectedTab === 0 ? 'selected' : ''}" @click="${() => this.selectTab(0)}">Oversikt</button>
        <button class="${this._selectedTab === 1 ? 'selected' : ''}" @click="${() => this.selectTab(1)}">Akutt</button>
        <button class="${this._selectedTab === 2 ? 'selected' : ''}" @click="${() => this.selectTab(2)}">Stans</button>
        <button class="${this._selectedTab === 3 ? 'selected' : ''}" @click="${() => this.selectTab(3)}">Brann</button>
        <button class="${this._selectedTab === 4 ? 'selected' : ''}" @click="${() => this.selectTab(4)}">Medisiner</button>
        <!-- Add more tab buttons as needed -->
      </div>

      <!-- Tab content -->
      <div class="tab-content">
        <!-- Tab 1: Oversikt content -->
        ${this._selectedTab === 0
        ? html`
              <output class="flex">
                ${this._vitals.map(item => {
          return html`
                    <figure class="${item.class}">
                      <figcaption>${item.title}</figcaption>
                      <span>${item.dose}</span>
                    </figure>
                  `;
        })}
              </output>
              
              <output class="flex">
                ${this._airwayOverview.map(item => {
          return html`
                    <figure class="${item.class}">
                      <figcaption>${item.title}</figcaption>
                      <span>${item.dose}</span>
                    </figure>
                  `;
        })}
              </output>
              <output class="grid">
                ${this._calculations.map(item => {
          return html`
                    <div class="drug-label ${item.class}">${item.title}</div>
                    <div class="drug-dose ${item.class}">${item.dose}</div>
                    <div class="drug-dose ${item.class}">${item.dose_volume}</div>
                    <div class="drug-dose ${item.class}">${item.formula}</div>
                    <div class="line"></div>
                  `;
        })}
              </output>
          
              <output class="flex">
                ${this._fluids.map(item => {
          return html`
                    <figure class="${item.class}">
                      <figcaption>${item.title}</figcaption>
                      <span>${item.dose}</span>
                    </figure>
                  `;
        })}
        </output>
              <output class="flex">
                ${this._eliminations.map(item => {
          return html`
                    <figure class="${item.class}">
                      <figcaption>${item.title}</figcaption>
                      <span>${item.dose}</span>
                    </figure>
                  `;
        })}
              </output>
            `
        : ''
      }

  
        <!-- Tab 2: Akutt content -->
        ${this._selectedTab === 1
        ? html`
          <output class="flex">
          ${this._vitals.map(item => {
          return html`
              <figure class="${item.class}">
                <figcaption>${item.title}</figcaption>
                <span>${item.dose}</span>
              </figure>
            `;
        })}
        </output>
        <output class="grid">
          ${this._acuteDrugs.map(item => {
          return html`
              <div class="drug-label ${item.class}">${item.title}</div>
              <div class="drug-dose ${item.class}">${item.dose}</div>
              <div class="drug-dose ${item.class}">${item.dose_volume}</div>
              <div class="drug-dose ${item.class}">${item.formula}</div>
              <div class="line"></div>
            `;
        })}
        </output>
    `
        : ''
      }

              <!-- Tab 3: Stans content -->
              ${this._selectedTab === 2
        ? html`
              
              <output class="flex big">
                ${this._cpr.map(item => {
          return html`
                    <figure class="${item.class}">
                      <figcaption>${item.title}</figcaption>
                      <span>${item.dose}</span>
                    </figure>
                  `;
        })}
              </output>
              <output class="grid">
                <div class="subheader">Adrenalin: fra 1. sløyfe ved PEA/asystole eller fra 2. sjokk ved VF/VT</div>
                ${this._cpr_adrenalin.map(item => {
          return html`
                    <div class="drug-label ${item.class}">${item.title}</div>
                    <div class="drug-dose ${item.class}">${item.dose}</div>
                    <div class="drug-dose ${item.class}">${item.dose_volume}</div>
                    <div class="drug-dose ${item.class}">${item.formula}</div>
                    <div class="line"></div>
                  `;
        })}
              </output>
              <output class="grid">
                <div class="subheader">Cordarone etter 2. mislykkede sjokk</div>
                ${this._cpr_cordarone1.map(item => {
          return html`
                    <div class="drug-label ${item.class}">${item.title}</div>
                    <div class="drug-dose ${item.class}">${item.dose}</div>
                    <div class="drug-dose ${item.class}">${item.dose_volume}</div>
                    <div class="drug-dose ${item.class}">${item.formula}</div>
                    <div class="line"></div>
                  `;
        })}
              </output>
              <output class="grid">
                <div class="subheader">Cordarone etter 3. mislykkede sjokk</div>
                ${this._cpr_cordarone2.map(item => {
          return html`
                    <div class="drug-label ${item.class}">${item.title}</div>
                    <div class="drug-dose ${item.class}">${item.dose}</div>
                    <div class="drug-dose ${item.class}">${item.dose_volume}</div>
                    <div class="drug-dose ${item.class}">${item.formula}</div>
                    <div class="line"></div>
                  `;
        })}
              </output>
              <div class="header">Normalverdier</div>
              <output class="flex">
                ${this._vitals.map(item => {
          return html`
                    <figure class="${item.class}">
                      <figcaption>${item.title}</figcaption>
                      <span>${item.dose}</span>
                    </figure>
                  `;
        })}
              </output>
              <div class="header">Luftveier</div>
              <output class="flex">
                ${this._airwayOverview.map(item => {
          return html`
                    <figure class="${item.class}">
                      <figcaption>${item.title}</figcaption>
                      <span>${item.dose}</span>
                    </figure>
                  `;
        })}
              </output>
            `
        : ''
      }

              <!-- Tab 4: Brannskade content -->
              ${this._selectedTab === 3
        ? html`
              <output class="flex">
                ${this._vitals.map(item => {
          return html`
                    <figure class="${item.class}">
                      <figcaption>${item.title}</figcaption>
                      <span>${item.dose}</span>
                    </figure>
                  `;
        })}
              </output>

              <output class="grid">
                ${this._burnDrugs.map(item => {
          return html`
                    <div class="drug-label ${item.class}">${item.title}</div>
                    <div class="drug-dose ${item.class}">${item.dose}</div>
                    <div class="drug-dose ${item.class}">${item.dose_volume}</div>
                    <div class="drug-dose ${item.class}">${item.formula}</div>
                    <div class="line"></div>
                  `;
        })}
              </output>
              <div class="header">Væskebehov første døgn</div>
              <output class="flex">
                ${this._burn.map(item => {
          return html`
                    <figure class="${item.class}">
                      <figcaption>${item.title}</figcaption>
                      <span>${item.dose}</span>
                    </figure>
                  `;
        })}
        </output>
        <div class="header">Diurese</div>
        <output class="flex">
                ${this._eliminations.map(item => {
          return html`
                    <figure class="${item.class}">
                      <figcaption>${item.title}</figcaption>
                      <span>${item.dose}</span>
                    </figure>
                  `;
        })}
              </output>
            `
        : ''
      }

                    <!-- Tab 5: Medisiner content -->
                    ${this._selectedTab === 4
        ? html`
              <output class="grid">
                ${this._drugs.map(item => {
          return html`
                    <div class="drug-label ${item.class}">${item.title}</div>
                    <div class="drug-dose ${item.class}">${item.dose}</div>
                    <div class="drug-dose ${item.class}">${item.dose_volume}</div>
                    <div class="drug-dose ${item.class}">${item.formula}</div>
                    <div class="line"></div>
                  `;
        })}
              </output>
            `
        : ''
      }
      <div>* Doseringsvolum for nasal administrasjon er oppgitt inkludert dødvolum på 0,1 ml </div>

  </div>
  
  `;
  }
  static get styles() {
    return [
      css`
        html {
          font-size: 12px;
        }

        :host {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 800px;
          padding: 10px;
        }
        .slider-container {
          width: 100%;
        }
        .slider{
          width: 100%;
          padding: .5rem;
        }
        .labels {
          display: flex;
          justify-content: space-evenly;
          
        }
        #age-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 15px;
          border-radius: 5px;  
          margin: 10px 0px;
          background: #d3d3d3;
          outline: none;
          opacity: 0.7;
          -webkit-transition: .2s;
          transition: opacity .2s;
        }
        #age-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 30px;
          height: 30px;
          border-radius: 50%; 
          background: #3399ff;
          cursor: pointer;
        }

        #age-output {
          color: #fff;
        }
        .age-display{
          display: flex;
          width: 25%;
        }
        .wbi{
          display: flex;
        }
        .logo{
          width: 50%;
          padding:4rem;
        }

        button:focus,
        select:focus,
        input:focus {
          outline: none;
        }
        button,
        input,
        select {
          font-family: inherit;
          font-size: inherit;
          border: 0;
        }
        .tab-buttons {
          margin-top: 20px;
          display: flex;
          width: 100%;
        }
  
        .tab-buttons button {
          flex: 1;
          margin: 0px 1px;
          padding: 1.2rem 1.2rem;
          font-size: 1.4rem;
          color: white; /* Set tab text color to white */
          background-color: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          
          
        }
  
        .tab-buttons button.selected {
          background-color: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: none;
        }
  
        .tab-content {
          margin: 0px 1px;
          width: 100%;
          padding: 10px;
          background-color: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        summary {
          outline: none;
          -webkit-tap-highlight-color: transparent;
          cursor: pointer;
        }
        a {
          color: #ccc;
          text-decoration: none;
        }
        form {
          width: 100%;
          padding: 10px;
          display: flex;
         
          margin: 2px; 
        }
        .awb-input {
          display: flex;
          flex-direction: row;
          width: 95%
        }
        section {
          display: flex;
        }
        section div {
          margin-right: 10px;
        }
        label {
          color: #eee;
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 0.025em;
          font-weight: 500;
          display: block;
          margin: 5px;
        }
        input {
          background-color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(5px);
          color: #000;
          border: 0;
          
          width: 80px;
          text-align: center;
          border-radius: 0.5em;
         
        }
        button {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          background-color: transparent;
          fill: rgb(33, 150, 243);
          padding: 0;
          line-height: 0;
        }
        button:hover {
          fill: #F44336;
        }
        svg {
          width: 70px;
          height: 70px;
        }
        div.label {
          width: 100%;
          padding: 10px;
          color: #fff;
          font-weight: 500;
          font-size: 0.9rem;
          margin: 2px;
        }
        output.flex {
          width: 100%;
          color: #fff;
          justify-content: center;
          display: flex;
          text-align: center;
          margin: 1.2rem 0px;
          background-color: rgba(100,100,100,0.1);
          border-radius: 0.7em;
          justify-content: space-evenly;
        }
        output.flex.big {
          margin: 2.2rem 0px;
        }
        output.grid {
          width: 100%;
          display: grid;
          grid-template-columns: auto auto auto auto;
          flex-wrap: nowrap;
          align-items: stretch;
          margin: 0px;
          color: var(--on-surface);
          font-size: 0.9rem;
        }
        output figure {
          padding: 0.7rem;
          margin: 0.5rem;
          min-width: 2rem;
        }
        figure.green {
          color: #43ff43;
        }
        figure.blue {
          color: #51b1ff;
        }
        figure.red {
          color: #ff5722;
        }
        figure.yellow {
          color: #ffff88;
        }
        figure span {
          font-size: 1.2rem;      
        }
        figure figcaption {
          font-size: 0.7rem;
          margin-bottom: .5rem;
        }

        figure.cpr span {
          font-size: 1.6rem;
        }
        figure.cpr figcaption {
          font-size: 0.9rem;
        }
        footer {
          padding: 2px 8px;
          background-color: var(--card-important-background);
          grid-column-end: span 3;
          font-size: 12px;
          color: var(--card-important-color);
        }
        .header{
          display: flex;
          color: #fff;
          justify-content: center;
          font-size: 1.3rem;
          padding: 2rem 0px 0px 0px;      
        }
        .subheader{
          color: #fff;
          grid-column: 1 / span 4;
          font-size: 1.1rem;
          padding: 10px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1)
        }
        .line{
          color: #fff;
          grid-column: 1 / span 4;        
          border-bottom: 2px solid rgba(255, 255, 255, 0.1)
        }
        .drug-label {
          border-radius: 0.7em;
          background-color: #ffffffaa;
          color: #000;
          padding: 0.6rem;
          margin: 2px;
          box-shadow: 2px 2px 3px 1px inset;
          border-bottom: none;
        }
        .drug-dose {
          font-weight: 500;
          white-space: nowrap;
          color: #fff;
          padding: 0.6rem 0.6rem;
          text-align: right;
        }
        output div {
          animation: fadein 0.5s;
          -moz-animation: fadein 0.5s;
          -webkit-animation: fadein 0.5s;
          -o-animation: fadein 0.5s;
        }
        .drug-label.nmbd {
          background-color: #ef5350bb;
        }
        .drug-label.antinmbd {
          background: rgb(239,83,80);
background: linear-gradient(157deg, rgba(239,83,80,0.73) 9%, rgba(255,255,255,0.73) 9%, rgba(255,255,255,0.73) 26%, rgba(239,83,80,0.73) 26%, rgba(239,83,80,0.73) 42%, rgba(255,255,255,0.73) 42%, rgba(255,255,255,0.73) 59%, rgba(239,83,80,0.73) 59%, rgba(239,83,80,0.73) 74%, rgba(255,255,255,0.73) 74%, rgba(255,255,255,0.73) 91%, rgba(239,83,80,0.73) 91%);
        }
        .drug-label.opioid {
          background-color: #90caf9bb;
        }
        .drug-label.sedative {
          /* background-color: #ffe60029; */
          background-color: #ffeb3bbb;
        }
        .drug-label.benzo {
          background-color: #f58e2fbb;
        }
        .drug-label.antimuscarinic {
          background-color: #4caf50bb;
        }
        .drug-label.vaso {
          background-color: #cba0fabb;
        }
        .drug-label.local {
          background-color: #a0a0a0bb;
        }
        .drug-dose.nmbd {
          color: #ef5350;
        }
        .drug-dose.opioid {
          color: #90caf9;
        }
        .drug-dose.sedative {
          color: #ffeb3b;
        }
        .drug-dose.benzo {
          color: #f58e2f;
        }
        .drug-dose.antimuscarinic {
          color: #4caf50;
        }
        .drug-dose.vaso {
          color: #cba0fa;
        }
        .drug-dose.local {
          color: #a0a0a0;
        }
        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @-webkit-keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        } /* Safari and Chrome */
        @media only screen and (max-width: 592px) {
        .age-display{
          flex-direction: column;
        }
        .wbi{
          flex-direction: column;
        }
        .slider {
          width: 100%;
        }
      }
      
      `,
    ];
  }

  ///////////////////////////////////////



  //////////////////////////////////////
}
customElements.define('calculator-view', CalculatorView);






