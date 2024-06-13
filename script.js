let displayNumber = ["0","0"];
let dNP = 1; //displayNumberPointer
let selectedOperator;

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

btnClear.classList.add("todo");
btnDot.classList.add("todo");
btnEvals.forEach( item => item.classList.add("todo") );
btnOff.classList.add("todo");

btnMemClear.classList.add("todo");
btnMemRead.classList.add("todo");
btnMemPlus.classList.add("todo");
btnMemMinus.classList.add("todo");

let btnFutureFeatres = document.querySelectorAll(".todo");
btnFutureFeatres.forEach( button => {
	button.addEventListener("click", () => {
		alert("Feature not ready");
	})
});


btnNumbers.forEach( number => {
	number.addEventListener("click", () => updateDisplay(number.textContent))});

btnEquals.addEventListener("click", equals);

btnAllClear.addEventListener("click", () => {
	displayNumber = ["0", "0"];
	dNP = 1;
	selectedOperator = undefined;
	updateDisplay();
});

btnOperators.forEach( operator => {
	operator.addEventListener("click", () => {

		if (displayNumber[dNP] === "error") return;

		// Using operator instead of equals
		if (dNP === 1 && selectedOperator) {
			equals();
			if (displayNumber[dNP] === "error") return;
		} 
		// First time pressing the operator button
		else if (dNP === 1) {
			displayNumber[0] = displayNumber[1];
		}

		switch(operator.textContent) {
			case "+":
				selectedOperator = add;
				break;
			case "−":
				selectedOperator = subtract;
				break;
			case "×":
				selectedOperator = multiply;
				break;
			case "÷":
				selectedOperator = divide;
				break;
		}
		dNP = 1;
		displayNumber[dNP] = "0";
	})
});


function updateDisplay(number = "") {
	if (displayNumber[dNP] === "error") {
		document.querySelector("#display").textContent = displayNumber[dNP];
		return;
	}
	if (isValidDisplay(displayNumber[dNP], number)) {
		// Don't want the following e.g. 032, 00643
		if (!(number === "") && displayNumber[dNP] === "0") {
			displayNumber[dNP] = number;
		} else {
			displayNumber[dNP] += number;
		}
		document.querySelector("#display").textContent = displayNumber[dNP];
	}
}

function isValidDisplay(display, input = "") {
	let displayLength = display.replace("-","").length;

	let isNotTooBig = (displayLength < 8 && (!(input === "0") || displayLength > 0))

	let isJustUpdating = (displayLength <= 8 && input === "")

	return 	isNotTooBig	|| isJustUpdating
}

function equals() {
	if (displayNumber[0] === "error") return;

	let display = document.querySelector("#display");
	let displaceHolder;

	if (!selectedOperator) {
		displaceHolder = display.textContent;
		display.textContent = ""; //flashing effect
		setTimeout( () => {
			display.textContent = displaceHolder;
			displayNumber = ["0", "0"];
		}, 100 );
		return;
	}

	let a, b;
	[a, b] = displayNumber;
	let result = selectedOperator(+a, +b).toString();
	dNP = 0;
	displaceHolder = result.replace("-","").length > 8 ? "error" : result;
	displayNumber[dNP] = displaceHolder;

	display.textContent = ""; //flashing effect
	setTimeout( () => {display.textContent = displaceHolder}, 100);
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
	return a / b;
}


function operate(a, b, op) {
	return op(a, b);
}


