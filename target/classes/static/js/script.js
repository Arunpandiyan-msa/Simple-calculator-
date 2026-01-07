let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

const currentOperandTextElement = document.getElementById('current-operand');
const previousOperandTextElement = document.getElementById('previous-operand');

function updateDisplay() {
    currentOperandTextElement.innerText = currentOperand;
    if (operation != null) {
        previousOperandTextElement.innerText = `${previousOperand} ${getOperationSymbol(operation)}`;
    } else {
        previousOperandTextElement.innerText = '';
    }
}

function getOperationSymbol(op) {
    switch (op) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return '×';
        case 'divide': return '÷';
        default: return '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}

async function calculate() {
    if (operation === undefined || previousOperand === '' || currentOperand === '') return; // Wait for equal press properly or consecutive ops handling
    // However, if called from chooseOperation, we typically want chain reaction. 
    // Button "=" calls calculate() directly.
}

// Redefining calculate to hit API
// We need to handle the fetch properly.
const originalCalculate = calculate;

calculate = async function () {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    try {
        const response = await fetch(`/api/calculate?num1=${prev}&num2=${current}&operator=${operation}`);
        const data = await response.json();

        if (response.ok) {
            currentOperand = data.result;
            operation = undefined;
            previousOperand = '';
        } else {
            alert("Error: " + data.error);
            currentOperand = '0'; // Reset on error
            operation = undefined;
            previousOperand = '';
        }
    } catch (error) {
        console.warn('Backend unavailable, switching to local calculation fallback.', error);
        // Fallback to local calculation logic
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (operation) {
            case 'add':
                computation = prev + current;
                break;
            case 'subtract':
                computation = prev - current;
                break;
            case 'multiply':
                computation = prev * current;
                break;
            case 'divide':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation;
        operation = undefined;
        previousOperand = '';
    }

    updateDisplay();
}
