//import './views/calculator-view.js';

import { LitElement, html, css } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';
import { classMap } from 'https://unpkg.com/lit-html/directives/class-map.js?module';
//import { LitElement, html, css } from 'lit-element';
//import { classMap } from 'lit-html/directives/class-map.js';

import * as calc from './logic/calculations.js';

const ADRENALIN = { name: 'Adrenalin', conc: [.01], unit: 'mg/ml', formula: [1], class: 'vaso' };
const ADRENALIN_STANS = { name: 'Adrenalin', conc: [.1], unit: 'mg/ml', formula: [10], max: [1000], class: 'vaso' };
const ALFENTANIL = { name: 'Alfentanil', conc: [.5], unit: 'mg/ml', formula: [10, 20], class: 'opioid' };
const ATROPIN = { name: 'Atropin', conc: [1], unit: 'mg/ml', formula: [20], max: [1000], class: 'antimuscarinic' };
const BENPEN = { name: 'Benpen', conc: [10], unit: 'mg/ml', formula: [25000], max: [1200000] };
const BUPIVACAIN = { name: 'Bupivacain', conc: [5], unit: 'mg/ml', formula: [2500], class: 'local' };
const CEFUROXIM = { name: 'Cefuroxim', conc: [10], unit: 'mg/ml', formula: [50000], max: [1500000] };
const CORDARONE1 = { name: 'Cordarone', conc: [50], unit: 'mg/ml', formula: [5000], max: [300000] };
const CORDARONE2 = { name: 'Cordarone', conc: [50], unit: 'mg/ml', formula: [5000], max: [150000] };
const DIAZEPAM = { name: 'Diazepam', conc: [5], unit: 'mg/ml', formula: [100], class: 'benzo' };
const FENTANYL = { name: 'Fentanyl', conc: [.05], unit: 'mg/ml', formula: [1, 2], max: [200], class: 'opioid' };
const IBUPROFEN = { name: 'Ibuprofen', conc: [10], unit: 'mg/ml', formula: [5000, 7000], max: [400000] };
const KETAMIN = { name: 'Ketamin', conc: [10], unit: 'mg/ml', formula: [1000, 2000], class: 'sedative' };
const LIDOCAIN = { name: 'Lidocain', conc: [10], unit: 'mg/ml', formula: [3000, 7000], class: 'local' };
const METRONIDAZOLE = { name: 'Metronidazole', unit: 'mg/ml', conc: [5], formula: [7500], max: [500000] };
const MIDAZOLAM = { name: 'Midazolam', conc: [1], unit: 'mg/ml', formula: [100], class: 'benzo' };
const NACL = { name: 'NaCl', conc: [1], unit: 'mmol/ml', formula: [1000], type: 'liquid' };
const ONDANSETRON = { name: 'Ondansetron', conc: [10], unit: 'mg/ml', conc: [2], formula: [100], max: [4000] };
const ORAMORPH = { name: 'Oramorph', conc: [10], unit: 'mg/ml', formula: [20, 40], class: 'opioid' };
const PARACETAMOL = { name: 'Paracetamol', conc: [10], unit: 'mg/ml', formula: [10000, 15000] };
const PROPOFOL = { name: 'Propofol', conc: [10], unit: 'mg/ml', formula: [4000], class: 'sedative' };
const ROCURONIUM = { name: 'Rocuronium', conc: [10], unit: 'mg/ml', formula: [600, 1200], max: [100000], class: 'nmbd' };
const ROBINUL = { name: 'Robinul', conc: [.2], unit: 'mg/ml', formula: [10], max: [400], class: 'antimuscarinic' };
const SUXAMETHONIUM = { name: 'Suxamethonium', conc: [10], unit: 'mg/ml', formula: [2000, 4000], max: [100000], class: 'nmbd' };
const THIOPENTAL = { name: 'Thiopental', conc: [10], unit: 'mg/ml', formula: [3000, 5000], class: 'sedative' };
const CYCLOCAPRON = { name: 'Cyclocapron', conc: [100], unit: 'mg/ml', formula: [15000], max: [1500000] };
const CALCIUMGLUKONAT = { name: 'Calciumglukonat', conc: [.225], unit: 'mmol/ml', formula: [100], max: [4500] };





class CalculatorView extends LitElement {
  static get properties() {
    return {
      _estWeight: { type: String },
      _calculations: { type: Array },
      _vitals: { type: Array },
      _selectedTab: { type: Number },
      _cpr: { type: Array },
      _airwayOverview: { type: Array },
      _eliminations: { type: Array }
    };
  }

  constructor() {
    super();
    this._estWeight = '';
    this._calculations = [];
    this._vitals = [];
    this._airwayOverview = [];
    this._eliminations = [];
    this._selectedTab = 0; // Initially select the first tab
  }

  selectTab(tabIndex) {
    this._selectedTab = tabIndex;
  }

  _updateEstimatedWeight(e) {
    const age = e.target.value;
    this._clearCalculations();
    if (!age) return this._estWeight = '';

    this._estWeight = age <= 5
      ? 2 * age + 8
      : 3 * age + 7;

    if (this._estWeight >= 70) this._estWeight = 70;
    console.log('estWeight', this._estWeight);
  }
  _clearCalculations() {
    this._calculations = [];
  }
  _btnSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const age = formData.get('age');
    const weight = formData.get('weight') ? formData.get('weight') : this._estWeight;
    const burnPercent = formData.get('burn')

    calc.setAge(age);
    calc.setWeight(weight);

    this._vitals = [
      ...calc.respiratoryVitals(),
      ...calc.tidalVolum(),
      ...calc.cardiovascularVitals(),
      ...calc.bloodVolum()
    ];

    this._airwayOverview = [
      ...calc.airwayField()
    ];

    this._cpr = [
      { title: '5 innblåsninger', dose: '15:2', class: 'cpr' },
      { title: 'Frekvens', dose: '100-120', class: 'cpr' },
      ...calc.shockEnergy()
    ];

    this._eliminations = [
      ...calc.urineProduction(),
      ...calc.urineVolume(),
      ...calc.urineCatheter()
    ];

    this._cpr_airways = [
      calc.airway()
    ];

    this._calculations = [
      calc.bloodProd(),

      calc.drug(PROPOFOL),
      calc.drug(KETAMIN),
      calc.drug(THIOPENTAL),
      calc.drug(SUXAMETHONIUM),
      calc.drug(ROCURONIUM),
      calc.drug(FENTANYL),
      calc.drug(ALFENTANIL),
      calc.drug(ORAMORPH),
      calc.drug(PARACETAMOL),
      calc.drug(IBUPROFEN),
      calc.drug(DIAZEPAM),
      calc.drug(MIDAZOLAM),
      calc.drug(ROBINUL),
      calc.drug(ATROPIN),
      calc.drug(ADRENALIN),
      calc.drug(ONDANSETRON),
      calc.drug(CEFUROXIM),
      calc.drug(METRONIDAZOLE),
      calc.drug(BENPEN),
      calc.drug(LIDOCAIN),
      calc.drug(BUPIVACAIN),
      calc.drug(NACL)
    ];

    this._acute_drugs = [
      calc.drug(PROPOFOL),
      calc.drug(KETAMIN),
      calc.drug(SUXAMETHONIUM),
      calc.drug(ROCURONIUM),
      calc.drug(FENTANYL),
      calc.drug(ALFENTANIL),
      calc.drug(DIAZEPAM),
      calc.drug(MIDAZOLAM),
      calc.drug(ROBINUL),
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

    this._drugs = [
      calc.drug(PROPOFOL),
      calc.drug(KETAMIN),
      calc.drug(THIOPENTAL),
      calc.drug(SUXAMETHONIUM),
      calc.drug(ROCURONIUM),
      calc.drug(FENTANYL),
      calc.drug(ALFENTANIL),
      calc.drug(ORAMORPH),
      calc.drug(PARACETAMOL),
      calc.drug(IBUPROFEN),
      calc.drug(DIAZEPAM),
      calc.drug(MIDAZOLAM),
      calc.drug(ROBINUL),
      calc.drug(ATROPIN),
      calc.drug(ADRENALIN),
      calc.drug(ONDANSETRON),
      calc.drug(CEFUROXIM),
      calc.drug(METRONIDAZOLE),
      calc.drug(BENPEN),
      calc.drug(LIDOCAIN),
      calc.drug(BUPIVACAIN),
      calc.drug(NACL),
      calc.drug(CYCLOCAPRON),
      calc.drug(CALCIUMGLUKONAT)
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
        <section>
          <div>
            <label for="age">Alder i år</label>
            <input
              type="number"
              name="age"
              placeholder="År"
              @input="${this._updateEstimatedWeight}"
            />
          </div>
          <div>
            <label for="weight">Vekt i kg</label>
            <input
              type="number"
              name="weight"
              placeholder="~${this._estWeight || ''}kg"
              @input="${this._clearCalculations}"
            />
          </div>
          <div>
            <label for="burn">Brannskade</label>
            <input
              type="number"
              name="burn"
              placeholder="%"
            />
          </div>
        </section>
        <button type="submit" class="calc-submit" id="calc-submit">
          <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M13.03,7.06L14.09,6l1.41,1.41 L16.91,6l1.06,1.06l-1.41,1.41l1.41,1.41l-1.06,1.06L15.5,9.54l-1.41,1.41l-1.06-1.06l1.41-1.41L13.03,7.06z M6.25,7.72h5v1.5h-5 V7.72z M11.5,16h-2v2H8v-2H6v-1.5h2v-2h1.5v2h2V16z M18,17.25h-5v-1.5h5V17.25z M18,14.75h-5v-1.5h5V14.75z"/></g></svg>
        </button>
      </form>
    `;
  }
  render() {
    return html`
      ${this.renderForm()}
      ${this._calculations.length === 0
        ? html`
            <div class="label">Vekt er estimert fra alder, hvis ikke vekt er oppgitt </div>
            <div class="label">Dette er kun et hjelpemiddel. Oppgitte verdier er veiledende og feil kan forekomme</div>
            <div class="label">Basert på åpen kildekode av AnaestheticsApp</div>
          `
        : ''
      }
 
      <!-- Tab buttons -->
      <div class="tab-buttons">
        <button class="${this._selectedTab === 0 ? 'selected' : ''}" @click="${() => this.selectTab(0)}">Oversikt</button>
        <button class="${this._selectedTab === 1 ? 'selected' : ''}" @click="${() => this.selectTab(1)}">Akutt</button>
        <button class="${this._selectedTab === 2 ? 'selected' : ''}" @click="${() => this.selectTab(2)}">Stans</button>
        <button class="${this._selectedTab === 3 ? 'selected' : ''}" @click="${() => this.selectTab(3)}">Brannskade</button>
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
          ${this._acute_drugs.map(item => {
          return html`
              <div class="drug-label ${item.class}">${item.title}</div>
              <div class="drug-dose ${item.class}">${item.dose}</div>
              <div class="drug-dose ${item.class}">${item.dose_volume}</div>
              <div class="drug-dose ${item.class}">${item.formula}</div>
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
              <output class="grid">
                <div class="subheader">Intubasjon</div>
                ${this._cpr_airways.map(item => {
          return html`
                    <div class="drug-label ${item.class}">${item.title}</div>
                    <div class="drug-dose ${item.class}">${item.dose}</div>
                    <div class="drug-dose ${item.class}">${item.dose_volume}</div>
                    <div class="drug-dose ${item.class}">${item.formula}</div>
                  `;
        })}
              </output>
            `
        : ''
      }

              <!-- Tab 4: Brannskade content -->
              ${this._selectedTab === 3
        ? html`
              <output class="grid">
                ${this._drugs.map(item => {
          return html`
                    <div class="drug-label ${item.class}">${item.title}</div>
                    <div class="drug-dose ${item.class}">${item.dose}</div>
                    <div class="drug-dose ${item.class}">${item.dose_volume}</div>
                    <div class="drug-dose ${item.class}">${item.formula}</div>
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
                  `;
        })}
              </output>
            `
        : ''
      }
  </div>
  `;
  }
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 800px;
          padding: 10px;
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
          padding: 20px 20px;
          font-size: 26px;
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
          color: red;
        }

        form {
          display: flex;
          width: 100%;
          padding: 15px 0px;
        }
        form {
          width: 100%;
          padding: 10px;
          display: flex;
          align-items: flex-end;
          margin: 2px;
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
          padding: 8px;
          width: 80px;
          text-align: center;
          border-radius: 0.5em;
          box-shadow: 2px 2px 3px 1px inset;
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
          width: 36px;
          height: 36px;
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
          margin: 20px 0px;
          background-color: rgba(100,100,100,0.1);
          border-radius: 0.7em;
          justify-content: space-evenly;
        }
        output.flex.big {
          margin: 40px 0px;
        }
        output.grid {
          width: 100%;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          flex-wrap: nowrap;
          align-items: stretch;
          margin: 10px;
          color: var(--on-surface);
          font-size: 0.9rem;
        }
        output figure {
          padding: 10px;
          margin: 5px;
          min-width: 75px;
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
        figure span {
          font-size: 1.3rem;
          line-height: 3rem;
        }
        figure figcaption {
          font-size: 0.7rem;
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
          padding: 40px 0px 0px 0px;      
        }
        .subheader{
          color: #fff;
          grid-column: 1 / span 4;
          font-size: 1.1rem;
          padding: 10px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1)
        }
        .drug-label {
          border-radius: 0.7em;
          background-color: #ffffffaa;
          color: #000;
          padding: 10px;
          margin: 2px;
          box-shadow: 2px 2px 3px 1px inset;
          border-bottom: none;
        }
        .drug-dose {
          font-weight: 500;
          white-space: nowrap;
          color: #fff;
          padding: 10px 20px;
          text-align: right;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1)
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
      
      `,
    ];
  }
}
customElements.define('calculator-view', CalculatorView);






