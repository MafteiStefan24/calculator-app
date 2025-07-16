const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-screen');

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action || key.value;

        // Handle number keys
        if (!isNaN(parseFloat(action))) {
            if (waitingForSecondValue) {
                display.value = action;
                waitingForSecondValue = false;
            } else {
                display.value = display.value === '0' ? action : display.value + action;
            }
        }

        // Handle decimal key
        if (action === '.') {
            if (!display.value.includes('.')) {
                display.value += '.';
            }
            if (waitingForSecondValue) {
                display.value = '0.';
                waitingForSecondValue = false;
            }
        }

        // Handle operator keys
        if (action === '+' || action === '-' || action === '*' || action === '/') {
            const inputValue = parseFloat(display.value);

            if (firstValue === null) {
                firstValue = inputValue;
            } else if (operator) {
                const result = calculate(firstValue, inputValue, operator);
                display.value = String(result);
                firstValue = result;
            }

            waitingForSecondValue = true;
            operator = action;
        }

        // Handle "all-clear" key
        if (action === 'all-clear') {
            display.value = '0';
            firstValue = null;
            operator = null;
            waitingForSecondValue = false;
        }

        // --- Adaugă această secțiune pentru butonul "Backspace" ---
        if (action === 'backspace') {
            let currentValue = display.value;
            // Dacă valoarea are mai mult de o cifră, șterge ultima cifră
            if (currentValue.length > 1) {
                display.value = currentValue.slice(0, -1);
            } else {
                // Dacă mai rămâne o singură cifră sau e "0", setează la "0"
                display.value = '0';
            }
        }
        // --- Sfârșit secțiune "Backspace" ---


        // Handle "equal" key
        if (action === '=') {
            let secondValue = parseFloat(display.value);

            if (firstValue !== null && operator !== null) {
                display.value = calculate(firstValue, secondValue, operator);
                firstValue = null;
                operator = null;
                waitingForSecondValue = false;
            }
        }
    }
});

function calculate(first, second, op) {
    if (op === '+') {
        return first + second;
    }
    if (op === '-') {
        return first - second;
    }
    if (op === '*') {
        return first * second;
    }
    if (op === '/') {
        return first / second;
    }
}