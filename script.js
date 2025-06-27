const radioMetric = document.getElementById('metric');
const radioImperial = document.getElementById('imperial');
const inputCentimeters = document.getElementById('centimeters');
const inputKilos = document.getElementById('kilos');
const bmiResult = document.querySelector('.bmi-result');
const betweenweightLow = document.querySelector('.between-weight-low');
const betweenweightHigh = document.querySelector('.between-weight-high');
const containerInpCalc = document.querySelector('.container-inp-num');
const boxInputHeight = document.querySelector('.box-input-height');
const boxInputWeight = document.querySelector('.box-input-weight');
const measurements = document.querySelectorAll('.measurements');
const boxWeight = document.querySelector('.box-weight');
const boxHeight = document.querySelector('.box-height');
const betweenWeightLow = document.querySelector('.between-weight-low');
const betweenWeightHigh = document.querySelector('.between-weight-high');
const descriptionBmi = document.querySelector('.description-bmi');
const debounceTimers = {};

const limits = {
  kilos: { min: 0.212, max: 635 },
  centimeters: { min: 24, max: 273 },
  feet: { min: 0, max: 8 },
  inches: { min: 9.448, max: 108 },
  stones: { min: 0, max: 99 },
  libras: { min: 0.467, max: 1400 },
};

function messageMaxValueWeight() {
  const messageMaxNoRepeat = document.querySelector('.message-max-weight');
  if (messageMaxNoRepeat) {
    return;
  }
  const messageMax = document.createElement('p');
  messageMax.className = 'message-max-weight';
  messageMax.textContent = 'This is the heaviest weight in history';
  boxWeight.insertAdjacentElement('afterend', messageMax);
}

function messageMaxValueHeight() {
  const messageMinNoRepeat = document.querySelector('.message-max-height');
  if (messageMinNoRepeat) {
    return;
  }
  const messageMax = document.createElement('p');
  messageMax.className = 'message-max-height';
  messageMax.textContent = 'This is the tallest height in history';
  boxHeight.insertAdjacentElement('afterend', messageMax);
}
function messageMaxValueWeightImperial() {
  const messageMaxNoRepeat = document.querySelector('.message-max-weight');
  if (messageMaxNoRepeat) {
    return;
  }
  const messageMax = document.createElement('p');
  messageMax.className = 'message-max-weight';
  messageMax.textContent =
    'This are the highest weight values in history or great';
  boxWeight.insertAdjacentElement('afterend', messageMax);
}

function messageMaxValueHeightImperial() {
  const messageMaxNoRepeat = document.querySelector('.message-max-height');
  if (messageMaxNoRepeat) {
    return;
  }
  const messageMax = document.createElement('p');
  messageMax.className = 'message-max-height';
  messageMax.textContent =
    'This are the highest recorded height in history or great';
  boxHeight.insertAdjacentElement('afterend', messageMax);
}

function messageMinValueWeight() {
  const messageMinNoRepeat = document.querySelector('.message-min-weight');
  if (messageMinNoRepeat) {
    return;
  }
  const messageMin = document.createElement('p');
  messageMin.className = 'message-min-weight';
  messageMin.textContent = 'This is the lightest weight in history';
  boxWeight.insertAdjacentElement('afterend', messageMin);
}

function messageMinValueHeight() {
  const messageMinNoRepeat = document.querySelector('.message-min-height');
  if (messageMinNoRepeat) {
    return;
  }
  const messageMin = document.createElement('p');
  messageMin.className = 'message-min-height';
  messageMin.textContent = 'This is the shortest height in history';
  boxHeight.insertAdjacentElement('afterend', messageMin);
}

function calcMinWeight(stones, libras) {
  const pesoEmKg = stones * 6.35029 + libras * 0.453592;

  if (pesoEmKg >= 0.212) {
  } else {
  }

  return pesoEmKg;
}

function showMessageMinHeightWeight(e) {
  const messageMaxHeight = document.querySelector('.message-max-height');
  const messageMaxWeight = document.querySelector('.message-max-weight');

  const input = e.target;
  const name = input.name;
  const value = input.value;
  if (value === '') {
    return;
  }
  const { min } = limits[name];

  if (name === 'kilos' && value <= min) {
    messageMinValueWeight();
    validateField(e);
    recalcAll(e);
  }
  if (name === 'centimeters' && value <= min) {
    messageMinValueHeight();
    validateField(e);
    recalcAll(e);
  }

  if (!messageMaxHeight) {
    if (name === 'inches' && value <= min) {
      messageMinValueHeight();
      validateField(e);
      recalcAll(e);
    }
  }

  if (!messageMaxWeight) {
    if (name === 'libras' && value <= min) {
      messageMinValueWeight();
      validateField(e);
      recalcAll(e);
    }
  }
}
function showMessageMaxHeightWeight(e) {
  const input = e.target;
  const name = input.name;
  const value = input.value;
  if (value === '') {
    return;
  }
  const { max } = limits[name];
  if (name === 'kilos' && value >= max) {
    messageMaxValueWeight();
    validateField(e);
    recalcAll(e);
  }
  if (name === 'centimeters' && value >= max) {
    messageMaxValueHeight();
    validateField(e);
    recalcAll(e);
  }

  if (name === 'feet' && value >= max) {
    messageMaxValueHeightImperial();
    validateField(e);
    recalcAll(e);
  }

  if (name === 'inches' && value >= max) {
    messageMaxValueHeightImperial();
    validateField(e);
    recalcAll(e);
  }
  if (name === 'stones' && value >= max) {
    messageMaxValueWeightImperial();
    validateField(e);
    recalcAll(e);
  }

  if (name === 'libras' && value >= max) {
    messageMaxValueWeightImperial();
    validateField(e);
    recalcAll(e);
  }
}
function messageMaxMintWeightHeightRem(e) {
  const input = e.target;
  const name = input.name;
  let value = input.value;
  const { min, max } = limits[name];
  const feet = document.querySelector('input[name="feet"]')?.value.trim();
  const inches = document.querySelector('input[name="inches"]')?.value.trim();
  const stones = document.querySelector('input[name="stones"]')?.value.trim();
  const libras = document.querySelector('input[name="libras"]')?.value.trim();

  const acessFeet = 'feet';
  const acessInches = 'inches';
  const acessStones = 'stones';
  const acessLibras = 'libras';
  if (
    (name === 'kilos' && value < max && value > min) ||
    (name === 'kilos' && value === '') ||
    (name === 'kilos' && value < max)
  ) {
    removeMessageWeight();
  }

  if (
    (name === 'centimeters' && value < max && value > min) ||
    (name === 'centimeters' && value === '') ||
    (name === 'centimeters' && value < max)
  ) {
    removeMessageHeight();
  }

  if (
    (name === 'feet' && value < max && value > min && inches === '') ||
    (name === 'feet' && value === '') ||
    (name === 'feet' && value < max)
  ) {
    console.log(value);
    console.log(max);
    removeMessageHeight();
    if (inches >= limits[acessInches].max) {
      messageMaxValueHeightImperial();
    }
    if (inches <= limits[acessInches].min && value <= min && inches !== '') {
      messageMinValueHeight();
    }
  }

  if (
    (name === 'inches' && value < max && value > min && feet === '') ||
    (name === 'inches' && value === '') ||
    (name === 'inches' && value < max)
  ) {
    console.log(value);
    console.log(max);
    removeMessageHeight();
    if (feet >= limits[acessFeet].max) {
      messageMaxValueHeightImperial();
    }
  }

  if (
    (name === 'stones' && value < max && value > min && libras === '') ||
    (name === 'stones' && value === '' && libras === '') ||
    (name === 'stones' && value < max)
  ) {
    removeMessageWeight();
    if (libras >= limits[acessLibras].max) {
      messageMaxValueWeightImperial();
    }
    if (libras <= limits[acessLibras].min && value <= min && libras !== '') {
      messageMinValueWeight();
    }
  }

  if (
    (name === 'libras' && value < max && value > min && stones === '') ||
    (name === 'libras' && value === '' && stones === '') ||
    (name === 'libras' && value < max)
  ) {
    removeMessageWeight();
    if (stones >= limits[acessStones].max) {
      messageMaxValueWeightImperial();
    }
  }
}

function removeMessageWeight() {
  const messageMinNoRepeatWeight = document.querySelector(
    '.message-min-weight'
  );
  const messageMaxNoRepeatWeight = document.querySelector(
    '.message-max-weight'
  );

  if (messageMaxNoRepeatWeight) {
    messageMaxNoRepeatWeight.remove();
  }
  if (messageMinNoRepeatWeight) {
    messageMinNoRepeatWeight.remove();
  }
}
function removeMessageHeight() {
  const messageMinNoRepeatHeight = document.querySelector(
    '.message-min-height'
  );
  const messageMaxNoRepeatHeight = document.querySelector(
    '.message-max-height'
  );

  if (messageMaxNoRepeatHeight) {
    messageMaxNoRepeatHeight.remove();
  }
  if (messageMinNoRepeatHeight) {
    messageMinNoRepeatHeight.remove();
  }
}

function validateField(e) {
  const input = e.target;
  const name = input.name;
  const raw = input.value;
  if (raw === '') return;
  const num = parseFloat(raw);
  if (isNaN(num)) return;

  let v = num;
  const { min, max } = limits[name];
  if (max != null && v > max) v = max;
  if (min != null && v < min) v = min;

  if (v !== num) {
    return (input.value = v);
  }
}

function recalcAll(e) {
  executionBmiCaclMetric(e);
  executionBmiCaclImperial(e);
}
function minMaxValueHeightWeight() {
  document
    .querySelectorAll(
      'input[name="kilos"], input[name="centimeters"], ' +
        'input[name="feet"], input[name="inches"], ' +
        'input[name="stones"], input[name="libras"]'
    )
    .forEach((input) => {
      input.addEventListener('blur', (e) => {
        validateField(e);
        recalcAll(e);
      });
    });
}

function bmiCalcMetric(height, inpKG) {
  let meters = height / 100;
  let calc = inpKG / meters ** 2;
  let calcString = calc.toString();
  let result = calcString.indexOf('.');
  switch (result) {
    case 1:
      return calcString.slice(0, 3);
    case 2:
      return calcString.slice(0, 4);
    case 3:
      return calcString.slice(0, 5);
    case 4:
      return calcString.slice(0, 6);
    case 5:
      return calcString.slice(0, 7);
  }
}

let cmHeight;
let kgWeight;
let resultBmiCalcMetrec;
function executionBmiCaclMetric(e) {
  const el = e.target;
  if (!el.matches('input[name="centimeters"], input[name="kilos"]')) {
    return;
  }
  switch (el.name) {
    case 'centimeters':
      cmHeight = el.value;
      break;
    case 'kilos':
      kgWeight = el.value;
      break;
  }
  if (cmHeight && kgWeight) {
    bmiResult.textContent = bmiCalcMetric(cmHeight, kgWeight);
    return bmiCalcMetric(cmHeight, kgWeight);
  }
}

function changeToMetric() {
  const boxInputInRem = document.getElementById('box-in');
  const boxInputLbsRem = document.getElementById('box-lbs');

  if (boxInputInRem || boxInputLbsRem) {
    boxInputInRem.remove();
    boxInputLbsRem.remove();
  }
  containerInpCalc.style.flexDirection = 'row';
  containerInpCalc.style.rowGap = '0';
}

function changeNameContentsToMetric() {
  const boxInputAraay = document.querySelectorAll('.box-input');
  const boxInputNumAraay = document.querySelectorAll('.box-inp-num');
  const measurementsArray = document.querySelectorAll('.measurements');

  boxInputAraay.forEach((element) => {
    element.style.removeProperty('height');
  });

  boxInputNumAraay.forEach((element) => {
    element.style.removeProperty('height');
  });

  measurementsArray.forEach((element) => {
    element.style.removeProperty('top');
  });

  measurements[0].textContent = 'cm';
  measurements[1].textContent = 'kg';
  inputCentimeters.name = 'centimeters';
  inputKilos.name = 'kilos';
  inputCentimeters.value = '';
  inputKilos.value = '';
  bmiResult.textContent = '--';
  descriptionBmi.textContent = '------- ------';
  betweenWeightHigh.textContent = '--';
  betweenWeightLow.textContent = '--';
}

function creatFieldsImperial() {
  const boxInputInRem = document.getElementById('box-in');
  const boxInputLbsRem = document.getElementById('box-lbs');

  if (boxInputInRem || boxInputLbsRem) {
    return;
  }
  containerInpCalc.style.flexDirection = 'column';
  containerInpCalc.style.rowGap = '24px';
  const boxInputIn = document.createElement('div');
  boxInputIn.className = 'box-inp-num';
  boxInputIn.id = 'box-in';
  boxInputIn.innerHTML = `        
                  <input
                    type="number"
                    name="inches"
                    class="inp-num"
                    step="1"
                    id="inches"
                  />
                  <span class="measurements">in</span>
                `;
  const boxInputLbs = document.createElement('div');
  boxInputLbs.className = 'box-inp-num';
  boxInputLbs.id = 'box-lbs';
  boxInputLbs.innerHTML = `        
                  <input
                    type="number"
                    name="libras"
                    class="inp-num"
                    step="1"
                    id="libras"
                  />
                  <span class="measurements">lbs</span>
                `;
  boxInputHeight.insertAdjacentElement('afterend', boxInputIn);
  boxInputWeight.insertAdjacentElement('afterend', boxInputLbs);
}

function changeToImperial() {
  const boxInputAraay = document.querySelectorAll('.box-input');
  const boxInputNumAraay = document.querySelectorAll('.box-inp-num');
  const measurementsArray = document.querySelectorAll('.measurements');

  boxInputAraay.forEach((element) => {
    element.style.height = '77px';
  });

  boxInputNumAraay.forEach((element) => {
    element.style.height = '77px';
  });

  measurementsArray.forEach((element) => {
    element.style.top = '24px';
  });

  measurements[0].textContent = 'ft';
  measurements[1].textContent = 'st';
  inputCentimeters.name = 'feet';
  inputKilos.name = 'stones';
  inputCentimeters.value = '';
  inputKilos.value = '';
  bmiResult.textContent = '--';
  descriptionBmi.textContent = '------- ------';
  betweenWeightHigh.textContent = '--';
  betweenWeightLow.textContent = '--';
}

function bmiCaclImperial(feet, inches, stones, pounds) {
  const weightLb = stones * 14 + pounds;
  const heightIn = feet * 12 + inches;
  const bmi = (weightLb / heightIn ** 2) * 703;
  const bmiString = bmi.toString();
  let result = bmiString.indexOf('.');
  switch (result) {
    case 1:
      return bmiString.slice(0, 3);
    case 2:
      return bmiString.slice(0, 4);
    case 3:
      return bmiString.slice(0, 5);
  }
}

let ftHeight;
let inHeight;
let stWeight;
let lbsWeight;

function executionBmiCaclImperial(e) {
  const el = e.target;
  if (
    !el.matches(
      'input[name="feet"], input[name="inches"], input[name="stones"], input[name="libras"]'
    )
  ) {
    return;
  }
  switch (el.name) {
    case 'feet':
      ftHeight = el.value;
      break;
    case 'inches':
      inHeight = el.value;
      break;
    case 'stones':
      stWeight = el.value;
      break;
    case 'libras':
      lbsWeight = el.value;
      break;
  }
  if (ftHeight && inHeight && stWeight && lbsWeight) {
    bmiResult.textContent = bmiCaclImperial(
      ftHeight,
      inHeight,
      stWeight,
      lbsWeight
    );
    return bmiCaclImperial(ftHeight, inHeight, stWeight, lbsWeight);
  }
}

const betweenBMIWeights = {
  underweight: { max: 18.5 },
  healthyWeight: { min: 18.6, max: 24.9 },
  overweight: { min: 25, max: 29.9 },
  obese: { min: 30 },
};
let heightCmValue;

function betweenWeightsMetric(e) {
  const input = e.target;
  const name = input.name;
  const raw = input.value;
  validateField(e);
  if (name === 'centimeters') {
    heightCmValue = raw;
  }

  let bmi = executionBmiCaclMetric(e);
  let bmiMin;
  let bmiMax;
  if (bmi < betweenBMIWeights.underweight.max) {
    bmiMax = betweenBMIWeights.underweight.max;
    bmiMin = bmi;
    descriptionBmi.textContent = 'underweight';
  } else if (
    bmi > betweenBMIWeights.healthyWeight.min &&
    bmi < betweenBMIWeights.healthyWeight.max
  ) {
    bmiMax = betweenBMIWeights.healthyWeight.max;
    bmiMin = betweenBMIWeights.healthyWeight.min;
    descriptionBmi.textContent = 'health weight';
  } else if (
    bmi > betweenBMIWeights.overweight.min &&
    bmi < betweenBMIWeights.overweight.max
  ) {
    bmiMax = betweenBMIWeights.overweight.max;
    bmiMin = betweenBMIWeights.overweight.min;
    descriptionBmi.textContent = 'overweight';
  } else if (bmi > betweenBMIWeights.obese.min) {
    bmiMax = bmi;
    bmiMin = betweenBMIWeights.obese.min;
    descriptionBmi.textContent = 'obese';
  }

  const hightMetric = heightCmValue / 100;

  const pesoMin = bmiMin * hightMetric ** 2;
  const pesoMax = bmiMax * hightMetric ** 2;
  if (bmiMin && bmiMax) {
    betweenWeightLow.textContent = `${pesoMin.toFixed(1)}Kgs`;
    betweenWeightHigh.textContent = `${pesoMax.toFixed(1)}Kgs`;
  }
}

let heightFeetValue;
let heightInchesValue;
function betweenWeightsImperial(e) {
  const input = e.target;
  const name = input.name;
  const raw = input.value;
  validateField(e);
  if (name === 'feet') {
    heightFeetValue = raw;
  }
  if (name === 'inches') {
    heightInchesValue = raw;
  }

  let bmi = executionBmiCaclImperial(e);
  let bmiMin;
  let bmiMax;
  if (bmi < betweenBMIWeights.underweight.max) {
    bmiMax = betweenBMIWeights.underweight.max;
    bmiMin = bmi;
    descriptionBmi.textContent = 'underweight';
  } else if (
    bmi > betweenBMIWeights.healthyWeight.min &&
    bmi < betweenBMIWeights.healthyWeight.max
  ) {
    bmiMax = betweenBMIWeights.healthyWeight.max;
    bmiMin = betweenBMIWeights.healthyWeight.min;
    descriptionBmi.textContent = 'health weight';
  } else if (
    bmi > betweenBMIWeights.overweight.min &&
    bmi < betweenBMIWeights.overweight.max
  ) {
    bmiMax = betweenBMIWeights.overweight.max;
    bmiMin = betweenBMIWeights.overweight.min;
    descriptionBmi.textContent = 'overweight';
  } else if (bmi > betweenBMIWeights.obese.min) {
    bmiMax = bmi;
    bmiMin = betweenBMIWeights.obese.min;
    descriptionBmi.textContent = 'obese';
  }

  const hightMetric = heightFeetValue * 0.3048 + heightInchesValue * 0.0254;
  const pesoMin = bmiMin * hightMetric ** 2;
  const pesoMax = bmiMax * hightMetric ** 2;
  if (bmiMin && bmiMax) {
    betweenWeightLow.textContent = `${pesoMin.toFixed(1)}Kgs`;
    betweenWeightHigh.textContent = `${pesoMax.toFixed(1)}Kgs`;
  }
}

inputCentimeters.addEventListener('keydown', (e) => {
  if (e.key === '.' || e.key === ',' || e.key === 'e' || e.key === 'E') {
    e.preventDefault();
  }
});

inputKilos.addEventListener('keydown', (e) => {
  if (e.key === 'e' || e.key === 'E') {
    e.preventDefault();
  }
});

containerInpCalc.addEventListener('input', (e) => {
  messageMaxMintWeightHeightRem(e);
  minMaxValueHeightWeight();
  executionBmiCaclMetric(e);
  executionBmiCaclImperial(e);
  showMessageMaxHeightWeight(e);
  setTimeout(() => {
    showMessageMinHeightWeight(e);
    betweenWeightsMetric(e);
    betweenWeightsImperial(e);
  }, 2000);
});
containerInpCalc.addEventListener('', (e) => {
  betweenWeights(e);
});

radioImperial.addEventListener('click', () => {
  creatFieldsImperial();
  changeToImperial();
  removeMessageHeight();
  removeMessageWeight();
});

radioMetric.addEventListener('click', () => {
  changeToMetric();
  changeNameContentsToMetric();
  removeMessageHeight();
  removeMessageWeight();
});
