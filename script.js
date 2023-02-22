let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetMainScreen = false
let shouldResetSubscreen = false

const mainScreen = document.getElementById('main-screen')
const subscreen = document.getElementById('subscreen')
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsBtn = document.getElementById('equals')
const clearBtn = document.getElementById('clear')
const deleteBtn = document.getElementById('delete')
const decimalBtn = document.getElementById('decimal')
const percentBtn = document.getElementById('percent')

equalsBtn.addEventListener('click', calculate)
clearBtn.addEventListener('click', clear)
decimalBtn.addEventListener('click', insertPoint)
deleteBtn.addEventListener('click', deleteNumber)
percentBtn.addEventListener('click', getPercentage)
document.addEventListener("keydown", handleKeyboardInput)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '=' || e.key === 'Enter') {
    e.preventDefault()
    calculate()
  }
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === '.') insertPoint()
  if (e.key === 'Escape') clear()
  if (e.key === '%') getPercentage()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
    console.log(e.key)
}
  
function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '–'
  if (keyboardOperator === '+') return '+'
}

function appendNumber(number) {
  if (mainScreen.textContent === 'Cannot divide by 0') {
    resetMainScreen()
    resetSubscreen()
  }
  if (mainScreen.textContent === '0' || shouldResetMainScreen) resetMainScreen()
  if (shouldResetSubscreen) resetSubscreen()
  if (mainScreen.textContent.length >= 15) return
  mainScreen.textContent += number
}

function resetMainScreen() {
  mainScreen.textContent = ''
  shouldResetMainScreen = false
}

function resetSubscreen() {
  subscreen.textContent = ''
  shouldResetSubscreen = false
}

function clear() {
  mainScreen.textContent = '0'
  subscreen.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
  shouldResetMainScreen = false
  shouldResetSubscreen = false
}

function deleteNumber() {
  if (mainScreen.textContent === '0') return
  if (mainScreen.textContent.length === 1) {
    mainScreen.textContent = '0'
    return
  } 
  mainScreen.textContent = mainScreen.textContent.slice(0, -1)
}

function getPercentage() {
  if (firstOperand === '') {
    resetMainScreen()
    resetSubscreen()
    mainScreen.textContent = '0'
    return
  } else {
    mainScreen.textContent = roundUp(mainScreen.textContent * firstOperand / 100)
  }
}

function insertPoint() {
  if (mainScreen.textContent.includes('.')) return
  mainScreen.textContent += '.'
}

function setOperation(operator) {
  if (mainScreen.textContent === '0' && firstOperand !== '') {
    currentOperation = operator
    subscreen.textContent = `${firstOperand} ${currentOperation}`
    return
  }
  if (currentOperation !== null) calculate()
  if (mainScreen.textContent === 'Cannot divide by 0') return
  firstOperand = mainScreen.textContent
  mainScreen.textContent = '0'
  currentOperation = operator
  subscreen.textContent = `${firstOperand} ${currentOperation}`
  shouldResetSubscreen = false
}

function calculate() {
  if (currentOperation === null) return
  secondOperand = mainScreen.textContent
  mainScreen.textContent = operate(currentOperation, firstOperand, secondOperand)
  subscreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
  shouldResetMainScreen = true
  shouldResetSubscreen = true
  firstOperand = ''
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

function roundUp(num) {
  return Math.round(num * 1000) / 1000
}

function add(x, y) {
  return roundUp(x + y)
}

function substract(x, y) {
  return roundUp(x - y)
}

function multiply(x, y) {
  return roundUp(x * y)
}

function divide(x, y) {
  return roundUp(x / y)
}