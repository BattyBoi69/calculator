let displayValues = ["0","0"];
let currentIndex = 1; //displayValuesPointer
let currentOperator;
const ERROR_DISPLAYS = ["error", "motherfu"]

updateDisplay();

let btnNumbers = document.querySelectorAll(".number");
let btnEquals = document.querySelector("#equals");
let btnAllClear = document.querySelector("#all-clear");
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

btnEquals.addEventListener("click", equals);

btnAllClear.addEventListener("click", () => {
	displayValues = ["0", "0"];
	currentIndex = 1;
	currentOperator = undefined;
	updateDisplay();
});

btnOperators.forEach( operator => {
	operator.addEventListener("click", () => {

		if (ERROR_DISPLAYS.includes(displayValues[currentIndex])) return;

		// Using operator instead of equals
		if (currentIndex === 1 && currentOperator) {
			equals();
			if (ERROR_DISPLAYS.includes(displayValues[currentIndex])) return;
		} 
		// First time pressing the operator button
		else if (currentIndex === 1) {
			displayValues[0] = displayValues[1];
		}

		switch(operator.textContent) {
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
	})
});


function updateDisplay(number = "") {
	if (ERROR_DISPLAYS.includes(displayValues[currentIndex])) {
		document.querySelector("#display").textContent = displayValues[currentIndex];
		return;
	}
	if (isValidDisplay(displayValues[currentIndex], number)) {
		// Don't want the following e.g. 032, 00643
		if (!(number === "") && displayValues[currentIndex] === "0") {
			displayValues[currentIndex] = number;
		} else {
			displayValues[currentIndex] += number;
		}
		document.querySelector("#display").textContent = displayValues[currentIndex];
	}
}

function isValidDisplay(display, input = "") {
	let displayLength = display.replace("-","").length;

	let isNotTooBig = (displayLength < 8 && (!(input === "0") || displayLength > 0))

	let isJustUpdating = (displayLength <= 8 && input === "")

	return 	isNotTooBig	|| isJustUpdating
}

function equals() {
	if (ERROR_DISPLAYS.includes(displayValues[0])) return;

	let display = document.querySelector("#display");
	let displaceHolder;

	if (!currentOperator) {
		displaceHolder = display.textContent;
		display.textContent = ""; //flashing effect
		setTimeout( () => {
			display.textContent = displaceHolder;
			displayValues = ["0", "0"];
		}, 100 );
		return;
	}

	let a, b;
	[a, b] = displayValues;
	let result = currentOperator(+a, +b)
	result = typeof result === "String" ? result : displayRound(result).toString();
	currentIndex = 0;
	displaceHolder = result.replace("-","").length > 8 ? "error" : result;
	displayValues[currentIndex] = displaceHolder;

	display.textContent = ""; //flashing effect
	setTimeout( () => {display.textContent = displaceHolder}, 100);
}

function displayRound(result) {
	let resultString = result.toString().replace("-","");
	if (!resultString.includes(".") || resultString.length <= 8) {
		return result;
	}
	[whole, ...fraction] = resultString.split(".");
	const wholeLength = whole.length;
	if (wholeLength > 6) {
		return Math.round(result);
	} else {
		const tenIndex = (8-1) - wholeLength;
		const tenDotMover = Math.pow(10,tenIndex);
		return Math.round(result * tenDotMover) / tenDotMover;
	}
}

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
	if (b === 0) return "motherfu";
	return a / b;
}


function operate(a, b, op) {
	return op(a, b);
}
