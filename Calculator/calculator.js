// CSC426 Calculator

const formulaDisplay = document.getElementById('expression');
const mainDisplay = document.getElementById('result');

let calcString = '';

function refreshInterface() {
    formulaDisplay.textContent = calcString;
    try {
        const computedValue = parseAndCompute(calcString);
        mainDisplay.textContent = computedValue === '' ? '0' : String(computedValue);
    } catch (err) {
        mainDisplay.textContent = '';
    }
}

function handleInput(inputToken) {
    if (inputToken === 'clear') {
        calcString = '';
        refreshInterface();
        return;
    }
    if (inputToken === 'back') {
        calcString = calcString.slice(0, -1);
        refreshInterface();
        return;
    }
    if (inputToken === 'percent') {
        calcString = calcString + '%';
        refreshInterface();
        return;
    }
    if (inputToken === 'power') {
        calcString += '^';
        refreshInterface();
        return;
    }
    if (inputToken === '=') {
        try {
            const computedValue = parseAndCompute(calcString);
            if (computedValue === '') return;
            
            calcString = String(computedValue);
            formulaDisplay.textContent = '';
            mainDisplay.textContent = calcString;
        } catch (err) {
            mainDisplay.textContent = 'Error';
        }
        return;
    }

    calcString += inputToken;
    refreshInterface();
}

document.querySelectorAll('.key').forEach(interactiveBtn => {
    interactiveBtn.addEventListener('click', () => {
        const structuralAction = interactiveBtn.dataset.action;
        handleInput(structuralAction);
    });
});

window.addEventListener('keydown', (eventObj) => {
    const pressedKey = eventObj.key;
    
    if ((/^[0-9]$/).test(pressedKey) || ['+', '-', '*', '/', '.', '%'].includes(pressedKey)) {
        handleInput(pressedKey);
        eventObj.preventDefault();
        return;
    }
    if (pressedKey === '\\' || pressedKey === '^') {
        handleInput(pressedKey);
        eventObj.preventDefault();
        return;
    }
    if (pressedKey === 'Enter') {
        handleInput('=');
        eventObj.preventDefault();
        return;
    }
    if (pressedKey === 'Backspace') {
        handleInput('back');
        eventObj.preventDefault();
        return;
    }
    if (pressedKey.toLowerCase() === 'c') {
        handleInput('clear');
        eventObj.preventDefault();
        return;
    }
});

function parseAndCompute(rawExpression) {
    if (!rawExpression) return '';

    let cleanString = rawExpression.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');

    cleanString = cleanString.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

    cleanString = cleanString.replace(/(\d+(?:\.\d+)?)(?:\\)(\d+(?:\.\d+)?)/g, '(Math.floor($1/$2))');

    cleanString = cleanString.replace(/(\d+(?:\.\d+)?|\([^)]*\))\^(\d+(?:\.\d+)?|\([^)]*\))/g, 'Math.pow($1,$2)');

    if (/[^0-9+\-*/().% Mathfloorpow]/.test(cleanString)) {
        throw new Error('Invalid Character Set');
    }

    const evaluationResult = eval(cleanString);
    if (typeof evaluationResult === 'number' && !Number.isFinite(evaluationResult)) {
        throw new Error('Math Error');
    }
    return evaluationResult;
}

refreshInterface();
