let _weight;
let _age;
let _age_months;
let _burnPercent

export function setAge(age) {
  _age = age;
}
export function ageMonths(age) {
  _age_months = age;
}
export function setWeight(weight) {
  _weight = weight;
}
export function setBurnPercent(burnPercent) {
  _burnPercent = burnPercent;
}
export function respiratoryVitals() {
  let rr
  if (_age > 18) {
    return [];
  } else if (_age <= 1) {
    rr = '30 - 60';
  } else if (_age <= 2) {
    rr = '24 - 40';
  } else if (_age <= 5) {
    rr = '20 - 34';
  } else if (_age <= 12) {
    rr = '15 - 30';
  } else {
    rr = '12 - 20';
  }
  return [{ title: 'RF', dose: rr, class: 'blue' }];
}
export function tidalVolume() {
  const vtLow = _weight * 6;
  const vtHigh = _weight * 8;
  return [{ title: 'TV 6-8 ml/kg', dose: vtLow + ' - ' + vtHigh, class: 'blue' }];
}
export function cardiovascularVitals() {
  let hr, sbp;
  if (_age > 18) {
    return [];
  } else if (_age <= 1) {
    hr = '80 - 160'; // 120
    sbp = '85';
  } else if (_age <= 2) {
    hr = '80 - 130'; // 110
    sbp = '85';
  } else if (_age <= 4) {
    hr = '80 - 120'; // 100
    sbp = '85';
  } else if (_age <= 6) {
    hr = '75 - 115'; // 100
    sbp = '90';
  } else if (_age <= 8) {
    hr = '70 - 110'; // 90
    sbp = '95';
  } else if (_age <= 10) {
    hr = '70 - 110'; // 90
    sbp = '110';
  } else if (_age <= 18) {
    hr = '70 - 110'; // 90
    sbp = '115';
  }
  return [
    { title: 'HR', dose: hr, class: 'green' },
    { title: 'SBT', dose: sbp, class: 'green' },
  ];
}
export function bloodVolume() {
  let bv, formula;
  if (_age <= 1) {bv = _weight * 85;
    formula = '85 ml/kg';} 
  else if (_age <= 3) {bv = _weight * 80;
    formula = '80 ml/kg';} 
  else {bv = _weight * 75;
    formula = '75 ml/kg';}

  return [{ title: 'Blodvolum ' + formula, dose: bv, class: 'red' }]; 
}
export function shockEnergy() {
  const shock = _weight * 4;
  return [{title: 'Defibrillering: 4 J/kg', dose: shock + ' J', class: 'cpr green'}];
}
export function airway() {
  let ett;

  if (_age <= 0) ett = { size: 3, length: '9-11', blade: '1' }; // 0-9mo
  else if (_age <= 1) ett = { size: 3.5, length: 11, blade: '1' }; // 9mo-1y
  else if (_age <= 3) ett = { size: 4, length: 13, blade: '1-2' };
  else if (_age <= 5) ett = { size: 4.5, length: 14, blade: '2' };
  else if (_age <= 7) ett = { size: 5, length: 15, blade: '2' };
  else if (_age <= 9) ett = { size: 5.5, length: 16, blade: '2-3' };
  else if (_age <= 11) ett = { size: 6, length: 17, blade: '2-3' };
  else if (_age <= 13) ett = { size: 6.5, length: 18, blade: '2-3' };
  else if (_age <= 16) ett = { size: 7, length: 19, blade: 3 };
  else ett = { size: 7.5, length: 20, blade: 'mac 3' };

  const size = '#' + ett.size;
  const length = ett.length + ' cm';
  const blade = 'mac ' + ett.blade;

  return { title: 'Tube', dose: size, dose_volume: length, formula: blade };
}
export function airwayField() {
  let ett;

  if (_age <= 0) ett = { size: 3, length: '9-11', blade: '1', mask: '00', opa: 'Blå (00)' }; // 0-9mo
  else if (_age <= 1) ett = { size: 3.5, length: 11, blade: '1', mask: '0', opa: 'Grå (0)' }; // 9mo-1y
  else if (_age <= 3) ett = { size: 4, length: 13, blade: '1-2', mask: '1', opa: 'Brun (1)' };
  else if (_age <= 5) ett = { size: 4.5, length: 14, blade: '2', mask: '1', opa: 'Hvit (1,5)' };
  else if (_age <= 7) ett = { size: 5, length: 15, blade: '2', mask: '2', opa: 'Hvit (1,5)' };
  else if (_age <= 9) ett = { size: 5.5, length: 16, blade: '2-3', mask: '2', opa: 'Hvit (1,5)' };
  else if (_age <= 11) ett = { size: 6, length: 17, blade: '2-3', mask: '2', opa: 'Grønn (2)' };
  else if (_age <= 13) ett = { size: 6.5, length: 18, blade: '2-3', mask: '2-3', opa: 'Grønn (2)' };
  else if (_age <= 16) ett = { size: 7, length: 19, blade: 3, mask: '3', opa: 'Grønn (2)', };
  else ett = { size: 7.5, length: 20, blade: 'mac 3', mask: '3-4', opa: 'Gul (3)' };

  let lma

  if (_weight < 5) lma = 1;
  else if (_weight < 10) lma = '1 1/2';
  else if (_weight < 20) lma = 2;
  else if (_weight < 30) lma = '2 1/2';
  else if (_weight < 50) lma = 3;
  else if (_weight < 70) lma = 4;
  else lma = 5;
 

  return [{ title: 'Tube størrelse', dose: ett.size, class: ''}, 
          { title: 'Lengde', dose: ett.length + ' cm', class: ''}, 
          { title: 'MAC', dose: ett.blade, class: ''},
          { title: 'Maske', dose: '# ' + ett.mask, class: ''}, 
        { title: 'Svelgtube', dose: ett.opa, class: ''},
          { title: 'LMA', dose: '# ' + lma, class: ''},
        ];
}
export function urineProduction() {
  let uProd

  if (_age < 1) uProd = {prod: _weight * 2, formel: '2 mg/kg/t'};
  else if (_age < 3) uProd = {prod: _weight * 1.5, formel: '1,5 mg/kg/t'};
  else if (_age < 13) uProd = {prod: _weight * 1, formel: '1 mg/kg/t'};
  else uProd = {prod: _weight * .5, formel: '0,5 mg/kg/t'};

  return [{title: 'Urinproduksjon ' + uProd.formel, dose: uProd.prod + ' ml/t', class: 'yellow'}];
}
export function urineVolume() {
  let uSize  = _age*30 + 30;

  return [{title: 'Blærevolum', dose: `${uSize} ml`, class: 'yellow'}];
}
export function urineCatheter() {
  let uCat

  if (_age < 1) uCat = '6-8';
  else if (_age < 2) uCat = '8-10';
  else if (_age < 5) uCat = '10';
  else uCat = '12';

  return [{title: 'Kateterstørrelse', dose: `${uCat} fr`, class: 'yellow'}];
}
export function bloodProd() {
  const sag = _weight * 5 > 250 ? 250 : _weight * 5;
  const plasma = _weight * 5 > 200 ? 200 : _weight * 5;
  const plater = _weight * 5;
  return { title: 'Blodprodukter', dose: 'SAG: ' + sag + ' ml', 
  dose_volume: 'Plasma: ' + plasma + ' ml', 
  formula: 'TBC: ' + plater + ' ml' };
}


// > 30 kg: RA  4 ml/kg/%brannskade  50%  8 t / 16t
// < 30 kg: RA/Plasmalyte 4 ml/kg/%brannskade  50%  8 t / 16t + 50% av Holliday & Segars formel
// 0-10 kg 100 ml/kg/døgn, 10-20 kg 50 ml/kg/døgn, 20-30 kg 20 ml/kg/døgn Plasmalyte Glucos

function hsFormula() {
  let hollidaySegar
  if (_weight <= 10) hollidaySegar = _weight * 100;
  else if (_weight <= 20) hollidaySegar = ((_weight - 10) * 50) + 1000; 
  else hollidaySegar = ((_weight - 20) * 20) + 1500;

  return hollidaySegar;
}

export function hollidaySegar() {
  let hollidaySegar, hollidaySegar24;
 
  hollidaySegar = hsFormula()
  hollidaySegar24 = hollidaySegar / 24

  return [{title: 'Plasmalyte Glucos', dose: hollidaySegar + ' ml/døgn'},
          {title: 'Hastighet', dose: hollidaySegar24.toFixed(1) + ' ml/t'}];
}

export function burnPercent(hsArray) {
  let parkland, parkland8, parkland16, hollidaySegar50, hollidaySegar50p24;
  parkland = _weight * 4 * _burnPercent;

  parkland8 = (parkland / 2) / 8
  parkland16 = (parkland / 2) / 16

  hollidaySegar50 = hsFormula() / 2
  hollidaySegar50p24 = hollidaySegar50 / 24
  
  if (_burnPercent < 10) return [{title: '', dose: 'Ikke behov for spesiell væskebehandling'}, ];
  else
    if (_weight > 30) return [{title: 'Parkland: Ringer-Ac.', dose: parkland + ' ml', class: ''},
      {title: 'Hastighet: første 8t / neste 16t', dose: parkland8.toFixed(0) + ' ml/t / ' + parkland16.toFixed(0) + ' ml/t'},
      {title: 'Basalbehov', dose: 'Vanligvis ikke nødvendig'}];
    else if (_weight > 5) return [{title: 'Parkland: Ringer-Ac./Plasmalyte', dose: parkland + ' ml', class: ''},
            {title: 'Hastighet: første 8t | neste 16t', dose: `${parkland8.toFixed(0)} ml/t | ${parkland16.toFixed(0)} ml/t`},
            {title: 'Basalbehov(H&S50%): Plasmalyte Glucos', dose: hollidaySegar50 + ' ml/døgn'},
            {title: 'Hastighet H&S50%', dose: hollidaySegar50p24.toFixed(1) + ' ml/t'}];
    else return [{title: 'Parkland: Ringer-Ac./Plasmalyte', dose: parkland + ' ml', class: ''},
            {title: 'Hastighet: første 8t | neste 16t', dose: `${parkland8.toFixed(1)} ml/t | ${parkland16.toFixed(1)} ml/t`},
            {title: 'Basalbehov(H&S50%): Plasmalyte Glucos', dose: hollidaySegar50 + ' ml/døgn'},
            {title: 'Hastighet H&S50%', dose: hollidaySegar50p24.toFixed(1) + ' ml/t'}];
}

function formatNumber(num, type = 'solid', decimals = 2) {
  if (num === 0) return '0';

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = type == 'solid' ? [' μg', ' mg', ' g'] : [' μL', ' ml', ' L'];

  const i = Math.floor(Math.log(num) / Math.log(k));

  return ({
    num: parseFloat((num / Math.pow(k, i)).toFixed(dm)),
    unit: sizes[i]
  });
}
function formatNumberVolume(num, decimals = 2) {
  if (num === 0) return '0';

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;

  return ({
    num: num / 1000,
  });
}
function formatRange(arr) {
  if (arr.length == 1) return arr[0].num + arr[0].unit;
  else if (arr[0].unit == arr[1].unit) return arr[0].num + ' - ' + arr[1].num + arr[1].unit;
  else return (arr[0].num / 1000) + ' - ' + arr[1].num + arr[1].unit;
}
function formatRangeVolume(arr, dec, dv, weight) {
  let medVolume
  let r_num
  if (Number(dec) === 0) {
    r_num = 1
  } else if (Number(dec) === 2) {
    r_num = 100
  } else {
    r_num = 10
  }
  if (weight <= 5) {
    r_num > 10 ? 100 : r_num *= 10
  } 
  if (dv)
    if (arr.length == 1) {medVolume = (Math.round((arr[0].num + Number(dv)) * 100) / 100) + ' ml'}
    else medVolume = (Math.round((arr[0].num + Number(dv)) * 100) / 100) + ' - ' + (Math.round((arr[1].num + Number(dv)) * 100) / 100) + ' ml';
  else
    if (arr.length == 1) {medVolume = Math.round( arr[0].num * r_num) / r_num + ' ml'}
    else medVolume = Math.round( arr[0].num * r_num) / r_num + ' - ' + Math.round( arr[1].num * r_num) / r_num + ' ml';
  return medVolume
 
}
export function drug(opts) {
  const age_limit = Number(opts.age_limit)
  const name = opts.name
  const unit = opts.unit
  const type = opts.type ? opts.type : 'solid';
  const dec = opts.dec
  const dv = opts.dv
  if (_age_months < age_limit) {
    return {
      title: name + ' ' + opts.conc + ' ' + unit,
      dose: 'Nedre aldrsgrense:',
      dose_volume: age_limit + ' måneder'
    };
  }
  else {
  const dose = opts.formula.map(value => {
    const calc = value * _weight;
    const result = opts.max && calc > opts.max ? opts.max : calc;
    return formatNumber(result, type);
  });
  const dose_volume = opts.formula.map(value => {
    const calc = value * _weight / opts.conc;
    const result = (opts.max / opts.conc) && calc > (opts.max / opts.conc) ? (opts.max / opts.conc) : calc;
    return formatNumberVolume(result);
  });
  const formula = opts.formula.map(value => {
    return formatNumber(value, type);
  });
  return {
    title: name + ' ' + opts.conc + ' ' + unit,
    dose: formatRange(dose),
    dose_volume: formatRangeVolume(dose_volume, dec, dv, _weight),
    formula: formatRange(formula) + '/kg',
    class: opts.class || 'default',
  };};
}