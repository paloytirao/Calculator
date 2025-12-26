class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.shouldResetDisplay = false;
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        document.querySelectorAll('.btn-number').forEach(button => {
            button.addEventListener('click', () => {
                this.handleNumber(button.dataset.number);
            });
        });
        
        document.querySelectorAll('.btn-operator').forEach(button => {
            button.addEventListener('click', () => {
                this.handleOperator(button.dataset.operator);
            });
        });
        
        document.querySelector('.btn-equals').addEventListener('click', () => {
            this.handleEquals();
        });
        
        document.querySelector('.btn-clear').addEventListener('click', () => {
            this.handleClear();
        });
        
        document.querySelector('.btn-decimal').addEventListener('click', () => {
            this.handleDecimal();
        });
    }
    
    handleNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentInput = number;
            this.shouldResetDisplay = false;
        } else if (this.currentInput === '0') {
            this.currentInput = number;
        } else {
            this.currentInput += number;
        }
        this.updateDisplay();
    }
    
    handleOperator(operator) {
        if (this.operator) {
            this.handleEquals();
        }
        this.previousInput = this.currentInput;
        this.operator = operator;
        this.shouldResetDisplay = true;
    }
    
    handleEquals() {
        if (!this.operator) return;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        let result;
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : 'Error';
                break;
        }
        this.currentInput = String(result);
        this.operator = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
    }
    
    handleClear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
    }
    
    handleDecimal() {
        if (this.shouldResetDisplay) {
            this.currentInput = '0.';
            this.shouldResetDisplay = false;
        } else if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.display.textContent = this.currentInput;
    }
}

new Calculator();