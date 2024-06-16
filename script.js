const buttons = document.querySelectorAll(".buttons > *");
const buttonsDiv = document.querySelector(".buttons");

buttons.forEach(button => {
	const div = document.createElement("div");
	div.classList.add("button-wrapper");
	if (button.classList.contains("top-row")) div.classList.add("top-row");
	if (button.classList.contains("add")) div.classList.add("add");
	if (button.classList.contains("all-clear")) div.classList.add("all-clear");

	div.appendChild(button);
	
	buttonsDiv.appendChild(div);

	//button.parentNode.replaceChild(div, button);
});

let displayValues = ["0","0"];
let currentIndex = 1; //displayValuesPointer
let currentOperator;
const ERROR_DISPLAYS = ["error", "motherfu"]

updateDisplay();

let btnNumbers = document.querySelectorAll(".number");
let btnEquals = document.querySelector("#equals");
let btnAllClear = document.querySelector(".button-wrapper > .all-clear");
let btnOperators = document.querySelectorAll(".operator");

let btnClear = document.querySelector("#clear");
let btnDot = document.querySelector("#dot");
let btnEvals = document.querySelectorAll(".eval");
let btnOff = document.querySelector("#off");

let btnMemClear = document.querySelector("#m-clear");
let btnMemRead = document.querySelector("#m-read");
let btnMemPlus = document.querySelector("#m-plus");
let btnMemMinus = document.querySelector("#m-minus");

[btnClear, btnDot, btnOff, btnMemClear, btnMemRead, btnMemPlus, btnMemMinus, ...btnEvals].forEach(button => {
	button.addEventListener("click", () => alert("Feature not ready"));
});

btnNumbers.forEach( number => {
	number.addEventListener("click", () => updateDisplay(number.textContent))});

btnEquals.addEventListener("click", calculate);

btnAllClear.addEventListener("click", resetCalculator);

btnOperators.forEach( operator => {
	operator.addEventListener("click", () => setOperator(operator.textContent))
});



function updateDisplay(number = "") {
	if (ERROR_DISPLAYS.includes(displayValues[currentIndex])) {
		document.querySelector("#display").textContent = displayValues[currentIndex];
		return;
	}
	if (isValidInput(displayValues[currentIndex], number)) {
		// Don't want the following e.g. 032, 00643
		if (!(number === "") && displayValues[currentIndex] === "0") {
			displayValues[currentIndex] = number;
		} else {
			displayValues[currentIndex] += number;
		}
		document.querySelector("#display").textContent = displayValues[currentIndex];
	}
}

function isValidInput(display, input = "") {
	let displayLength = display.replace("-","").length;

	let isNotTooBig = (displayLength < 8 && (!(input === "0") || displayLength > 0))

	let isJustUpdating = (displayLength <= 8 && input === "")

	return 	isNotTooBig	|| isJustUpdating
}

function setOperator(operator) {
	if (ERROR_DISPLAYS.includes(displayValues[currentIndex])) return;

	// Using operator instead of equals
	if (currentIndex === 1 && currentOperator) {
		calculate();
		if (ERROR_DISPLAYS.includes(displayValues[currentIndex])) return;
	} 
	// First time pressing the operator button
	else if (currentIndex === 1) {
		displayValues[0] = displayValues[1];
	}

	switch(operator) {
		case "+":
			currentOperator = add;
			break;
		case "−":
			currentOperator = subtract;
			break;
		case "×":
			currentOperator = multiply;
			break;
		case "÷":
			currentOperator = divide;
			break;
	}
	currentIndex = 1;
	displayValues[currentIndex] = "0";
}

function resetCalculator() {
	displayValues = ["0", "0"];
	currentIndex = 1;
	currentOperator = undefined;
	updateDisplay();
}

function calculate() {
	if (ERROR_DISPLAYS.includes(displayValues[0])) return;

	let display = document.querySelector("#display");

	if (!currentOperator) {
		flashDisplay(display.textContent);
		displayValues = ["0", "0"];
		return;
	}

	let a, b;
	[a, b] = displayValues;
	let result = currentOperator(+a, +b)
	result = typeof result === "String" ? result : roundDisplay(result).toString();
	currentIndex = 0;
	const displayValue = result.replace("-","").length > 8 ? "error" : result;
	displayValues[currentIndex] = displayValue;

	flashDisplay(displayValue)
}

function flashDisplay(value) {
	const display = document.querySelector("#display");
	display.textContent = "";
	setTimeout( () => display.textContent = value, 100);
}

function roundDisplay(result) {
	let resultString = result.toString().replace("-","");
	if (!resultString.includes(".") || resultString.length <= 8) {
		return result;
	}
	[whole, ...fraction] = resultString.split(".");
	const wholeLength = whole.length;
	if (wholeLength > 6) {
		return Math.round(result);
	} else {
		const precision = (8-1) - wholeLength;
		return Math.round(result * Math.pow(10,precision)) / Math.pow(10,precision);
	}
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? "motherfu" : a / b;
