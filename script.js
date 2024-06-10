function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

let firstNumber, secondNumber, operator;

function operate(a, b, operator) {
	return operator(a, b);
}

function updateDisplay(number) {
	document.querySelector("#display").textContent += number;
}


let btnNumbers = document.querySelectorAll(".number");

btnNumbers.forEach( number => {
	number.addEventListener('click', () => updateDisplay(number.textContent))});
