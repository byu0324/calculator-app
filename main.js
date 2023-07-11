//theme

const switch1 = document.querySelector('#first');
const switch2 = document.querySelector('#second');
const switch3 = document.querySelector('#third');
const label = document.querySelectorAll('label');

switch1.addEventListener('click', () => {
  switchTheme('first');
});

switch2.addEventListener('click', () => {
  switchTheme('second');
});

switch3.addEventListener('click', () => {
  switchTheme('third');
});

function switchTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

//calculator

const $preNum = document.querySelector('.previousNum');
const $curNum = document.querySelector('.currentNum');
const $nums = document.querySelectorAll('.num');
const $operations = document.querySelectorAll('.operation');
const $reset = document.querySelector('.reset');
const $calculate = document.querySelector('.calculate');
const $delete = document.querySelector('.delete');

let curNum = '0';
let preNum = '';
let operation = '';

$nums.forEach(num => {
  num.addEventListener('click', (e) => {
    if(num.textContent == '.' && curNum.includes('.')) return;
    if(curNum === '0') {
      if(e.target.textContent == '.') {
        curNum += e.target.textContent;
        updateDisplay();
        return;
      }
      curNum = e.target.textContent;
    } else {
      curNum += e.target.textContent;
    }
    updateDisplay();
  });
});

function displayNumber (num) {
  let strNum = num.toString().split('.');
  let intNum = parseFloat(strNum[0]);
  let decNum = strNum[1];

  let displayNum = '';
  if(!isNaN(intNum)) {
    displayNum = intNum.toLocaleString('ko-KR');
  }
  if(decNum === undefined) {
    return displayNum;
  } else {
    return `${displayNum}.${decNum}`;
  }
}

function updateDisplay () {
  $curNum.textContent = displayNumber(curNum);
  $preNum.textContent = `${displayNumber(preNum)} ${operation}`;
}

$operations.forEach(oper => {
  oper.addEventListener('click', (e) => {
    if(operation != '' && curNum == '') {
      operation = e.target.textContent;
      updateDisplay();
      return;
    }
    if(preNum != '') calculate();
    operation = e.target.textContent;
    preNum = curNum;
    curNum = '';
    updateDisplay();
  });
});

function calculate () {
  let currentNumber = parseFloat(curNum);
  let previousNumber = parseFloat(preNum);
  let answer;

  switch(operation) {
    case '+':
      answer = Math.round((previousNumber + currentNumber) * 10) / 10 ;
      break;
    case '-':
      answer = Math.round((previousNumber - currentNumber) * 10) / 10 ;
      break;
    case '×':
      answer = Math.round((previousNumber * currentNumber) * 10) / 10 ;
      break;
    case '/':
      answer = Math.round((previousNumber / currentNumber) * 10) / 10 ;
      break;
  }
  
  curNum = answer;
  preNum = '';
  operation = '';
}

$calculate.addEventListener('click', () => {
  calculate();
  updateDisplay();
});

$reset.addEventListener('click', () => {
  curNum = '0';
  preNum = '';
  operation = '';
  updateDisplay();
});

$delete.addEventListener('click', () => {
  if(curNum.length == 1) {
    curNum = '0';
    updateDisplay();
    return;
  }
  curNum = curNum.slice(0, -1);
  updateDisplay();
});