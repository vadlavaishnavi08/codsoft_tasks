const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentValue = '0';
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentValue;
}

function performCalculation() {
  const firstValue = parseFloat(previousValue);
  const secondValue = parseFloat(currentValue);
  let result;

  if (operator === '+') {
    result = firstValue + secondValue;
  } else if (operator === '-') {
    result = firstValue - secondValue;
  } else if (operator === '*') {
    result = firstValue * secondValue;
  } else if (operator === '/') {
    result = secondValue === 0 ? 'Error' : firstValue / secondValue;
  }

  currentValue = String(result);
  previousValue = null;
  operator = null;
  shouldResetDisplay = true;
}

function handleNumber(value) {
  if (currentValue === '0' || shouldResetDisplay) {
    currentValue = value;
    shouldResetDisplay = false;
  } else {
    currentValue += value;
  }

  updateDisplay();
}

function handleOperator(nextOperator) {
  if (operator !== null && previousValue !== null && !shouldResetDisplay) {
    performCalculation();
  }

  previousValue = currentValue;
  operator = nextOperator;
  shouldResetDisplay = true;
  updateDisplay();
}

function handleDecimal() {
  if (currentValue.includes('.')) {
    return;
  }

  if (shouldResetDisplay) {
    currentValue = '0.';
    shouldResetDisplay = false;
  } else {
    currentValue += '.';
  }

  updateDisplay();
}

function handleClear() {
  currentValue = '0';
  previousValue = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function handleDelete() {
  if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
  } else {
    currentValue = '0';
  }

  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value !== undefined) {
      if (value === '+' || value === '-' || value === '*' || value === '/') {
        handleOperator(value);
      } else {
        handleNumber(value);
      }
    } else if (action === 'decimal') {
      handleDecimal();
    } else if (action === 'clear') {
      handleClear();
    } else if (action === 'delete') {
      handleDelete();
    } else if (action === 'calculate') {
      if (operator !== null && previousValue !== null) {
        performCalculation();
        updateDisplay();
      }
    }
  });
});

updateDisplay();
