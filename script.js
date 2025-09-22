document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const resultDiv = document.getElementById('result');
    const addBtn = document.getElementById('addBtn');
    const subtractBtn = document.getElementById('subtractBtn');
    const multiplyBtn = document.getElementById('multiplyBtn');
    const divideBtn = document.getElementById('divideBtn');

    // Calculate result
    function calculate(operation) {
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        
        // Check if inputs are valid numbers
        if (isNaN(num1) || isNaN(num2)) {
            showError('Input tidak valid. harap masukkan angka yang benar!');
            return;
        }

        let result;
        let operatorSymbol;

        switch(operation) {
            case 'add':
                result = num1 + num2;
                operatorSymbol = '+';
                break;
            case 'subtract':
                result = num1 - num2;
                operatorSymbol = '-';
                break;
            case 'multiply':
                result = num1 * num2;
                operatorSymbol = '×';
                break;
            case 'divide':
                if (num2 === 0) {
                    showError('Tidak bisa dibagi dengan nol!');
                    return;
                }
                result = num1 / num2;
                operatorSymbol = '÷';
                break;
        }

        // Update result
        resultDiv.textContent = formatResult(result);
        resultDiv.classList.remove('error');
    }

    // Format result (handle decimal places)
    function formatResult(result) {
        // Check if result is integer
        if (Number.isInteger(result)) {
            return result.toString();
        }
        // Round to 6 decimal places max
        return parseFloat(result.toFixed(6)).toString();
    }

    // Show error message
    function showError(message) {
        resultDiv.textContent = message;
        resultDiv.classList.add('error');
        
        // Remove error class after animation
        setTimeout(() => {
            resultDiv.classList.remove('error');
        }, 500);
    }

    // Event listeners
    addBtn.addEventListener('click', () => calculate('add'));
    subtractBtn.addEventListener('click', () => calculate('subtract'));
    multiplyBtn.addEventListener('click', () => calculate('multiply'));
    divideBtn.addEventListener('click', () => calculate('divide'));

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            calculate('add'); // Default operation
        } else if (e.key === '+') {
            calculate('add');
        } else if (e.key === '-') {
            calculate('subtract');
        } else if (e.key === '*') {
            calculate('multiply');
        } else if (e.key === '/') {
            e.preventDefault(); // Prevent browser search
            calculate('divide');
        }
    });
});