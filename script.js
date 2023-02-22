let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetMainScreen = false
let shouldResetSmallScreen = false

const mainScreen = document.getElementById('main-screen')
const smallScreen = document.getElementById('small-screen')
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsBtn = document.getElementById('equals')
const clearBtn = document.getElementById('clear')
const deleteBtn = document.getElementById('delete')

equalsBtn.addEventListener('click', calculate)

clearBtn.addEventListener('click', clear)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

function appendNumber(number) {
  if (mainScreen.textContent === 'Cannot divide by 0') {
    resetMainScreen()
    resetSmallScreen()
  }
  if (mainScreen.textContent === '0' || shouldResetMainScreen) resetMainScreen()
  if (shouldResetSmallScreen) resetSmallScreen()
  mainScreen.textContent += number
}

function resetMainScreen() {
  mainScreen.textContent = ''
  shouldResetMainScreen = false
}

function resetSmallScreen() {
  smallScreen.textContent = ''
  shouldResetSmallScreen = false
}

function clear() {
  mainScreen.textContent = '0'
  smallScreen.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
  shouldResetMainScreen = false
  shouldResetSmallScreen = false
}

function setOperation(operator) {
  if (mainScreen.textContent === '0') {
    currentOperation = operator
    smallScreen.textContent = `${firstOperand} ${currentOperation}`
    return
  }
  if (currentOperation !== null) calculate()
  if (mainScreen.textContent === 'Cannot divide by 0') return
  firstOperand = mainScreen.textContent
  mainScreen.textContent = '0'
  currentOperation = operator
  smallScreen.textContent = `${firstOperand} ${currentOperation}`
  shouldResetSmallScreen = false
}

function calculate() {
  if (currentOperation === null) return
  secondOperand = mainScreen.textContent
  mainScreen.textContent = operate(currentOperation, firstOperand, secondOperand)
  smallScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
  shouldResetMainScreen = true
  shouldResetSmallScreen = true
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '–':
      return substract(a, b)
    case '×':
      return multiply(a, b)
    case '÷':
      if (b === 0) return 'Cannot divide by 0'
      else return divide(a, b)
    default:
      return null
  }
}

function add(x, y) {
  return x + y
}

function substract(x, y) {
  return x - y
}

function multiply(x, y) {
  return x * y
}

function divide(x, y) {
  return x / y
}