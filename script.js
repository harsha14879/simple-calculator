let currentInput = '';
let previousInput = '';
let operator = null;

const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

function updateDisplay() {
  display.textContent = currentInput || '0';
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Prevent multiple dots
    if (button.dataset.number === '.' && currentInput.includes('.')) return;
    currentInput += button.dataset.number;
    updateDisplay();
  });
});

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    operator = button.dataset.operator;
    previousInput = currentInput;
    currentInput = '';
  });
});

equalsButton.addEventListener('click', () => {
  if (currentInput === '' || previousInput === '') return;
  calculate();
  updateDisplay();
  previousInput = '';
});

clearButton.addEventListener('click', () => {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay();
});

function calculate() {
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case '+':
      currentInput = (prev + curr).toString();
      break;
    case '-':
      currentInput = (prev - curr).toString();
      break;
    case '*':
      currentInput = (prev * curr).toString();
      break;
    case '/':
      currentInput = curr === 0 ? 'Error' : (prev / curr).toString();
      break;
    default:
      return;
  }
}
