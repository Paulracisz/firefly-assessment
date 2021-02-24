class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    appendNumber(number) {
        // this if checks to see if the decimal was added more than once and stops it from occurring twice
        if (number === '.' && this.currentOperand.includes('.')) return
        // converting our inputs into strings so we can concatenate them to do more than single digits.
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        // check to see if there is a second number to perform an operation on
        if (this.currentOperand === '') return
        // if there's already two operands lets do a computation
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
            computation = prev + current
            break
        case '-':
            computation = prev - current
            break
        case 'x':
            computation = prev * current
            break
        case '÷':
            computation = prev / current
            break
        default:
            return 
        }
        this.currentOperand = computation
        historyArray.push(`${prev} ${this.operation} ${current} = ${computation} </br>`)
        let historyText = historyArray.join("")
        document.getElementById('history-text').innerHTML = historyText
        console.log(historyArray)
        this.operation = undefined
        this.previousOperand = ''

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
            }
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`
            }
            else {
                return integerDisplay
            }
        }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const hamburgerMenuElement = document.getElementsByClassName('hamburger-menu')
const fontsModal = document.getElementsByClassName('fonts-menu')
const closeMenu = document.getElementById('close')
const fontMenuContainer = document.getElementById('modal-fonts')
const historyModal = document.getElementById('history-menu')
const closeMenuHistory = document.getElementById('close-history')
let historyArray = []

const calculator = new Calculator(previousOperandTextElement, 
    currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

hamburgerMenuElement[0].addEventListener('click', e => {
    const displayMenuElement = document.getElementById('modal')
    if (displayMenuElement.className === 'no-display') {
        displayMenuElement.classList.remove('no-display')
        displayMenuElement.classList.add('show-modal')
    }
    else {
        displayMenuElement.classList.remove('show-modal')
        displayMenuElement.classList.add('no-display')
    }
})

fontsModal[0].addEventListener('click', e => {
    const displayMenuElement = document.getElementById('modal-fonts')
    if (displayMenuElement.className === 'no-display') {
        displayMenuElement.classList.remove('no-display')
        displayMenuElement.classList.add('show-modal-fonts')
    }
    else {
        displayMenuElement.classList.remove('show-modal-fonts')
        displayMenuElement.classList.add('no-display')
    }
})

closeMenu.addEventListener('click', e => {
    const displayMenuElement = document.getElementById('modal-fonts')
    displayMenuElement.classList.remove('show-modal-fonts')
    displayMenuElement.classList.add('no-display')
})

fontMenuContainer.addEventListener('click', e => {
    const r = document.querySelector(':root')
    // e.path[0] is the path of the event that leads to the
    // element that was clicked.
    if (e.path[0].id === "times") {
        r.style.setProperty('--main-font', '"Times New Roman"')
    }
    if (e.path[0].id === "default") {
        r.style.setProperty('--main-font', '"Open Sans"')
    }
    if (e.path[0].id === "arial") {
        r.style.setProperty('--main-font', '"Arial"')
    }
    if (e.path[0].id === "default-theme") {
        r.style.setProperty('--main-bg-color', 'rgb(46,57,138)')
        r.style.setProperty('--header-bg-color', 'rgb(86,89,166)')
        r.style.setProperty('--button-number-color', 'rgb(135,141,188)')
        r.style.setProperty('--operator-color', 'rgb(250,219,75)')
        r.style.setProperty('--number-color', 'rgb(171,175,208)')
    }
    if (e.path[0].id === "dark") {
        r.style.setProperty('--main-bg-color', 'black')
        r.style.setProperty('--header-bg-color', 'grey')
        r.style.setProperty('--button-number-color', 'white')
        r.style.setProperty('--operator-color', 'grey')
        r.style.setProperty('--number-color', 'white')
    }
    if (e.path[0].id === "pink") {
        r.style.setProperty('--main-bg-color', 'pink')
        r.style.setProperty('--header-bg-color', 'hotpink')
        r.style.setProperty('--button-number-color', 'white')
        r.style.setProperty('--operator-color', 'white')
        r.style.setProperty('--number-color', 'white')
    }
})


historyModal.addEventListener('click', e => {
    const displayMenuElement = document.getElementById('modal-history')
    displayMenuElement.classList.remove('no-display')
    displayMenuElement.classList.add('show-modal-fonts')
})

closeMenuHistory.addEventListener('click', e => {
    const displayMenuElement = document.getElementById('modal-history')
    displayMenuElement.classList.remove('show-modal-fonts')
    displayMenuElement.classList.add('no-display')
})