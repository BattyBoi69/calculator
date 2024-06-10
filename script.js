let displayNumber = ["0","0"];
let dNP = 1; //displayNumberPointer
let selectedOperator;

updateDisplay();

let btnNumbers = document.querySelectorAll(".number");
let btnEquals = document.querySelector("#equals");
let btnAllClear = document.querySelector("#all-clear");
let btnOperators = document.querySelectorAll(".operator");

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

function updateDisplay(number = "") {
	if (displayNumber[dNP] === "error") {
		document.querySelector("#display").textContent = displayNumber[dNP];
		return;
	}
	let displayLength = displayNumber[dNP].length;

	// Check display has space and non empty
	if ((displayLength < 8 && (!(number === "0") || displayLength > 0))
		|| (displayLength === 8 && number === "")) {

		// Check display is not 0 before appending digits
		if (!(number === "") && displayNumber[dNP] === "0") {
			displayNumber[dNP] = number;
		} else {
			displayNumber[dNP] += number;
		}
		document.querySelector("#display").textContent = displayNumber[dNP];
	}
}

function equals() {
	//Assume displayNumber is filled

	if (displayNumber[0] === "error") return;

	let a, b;
	[a, b] = displayNumber;
	let result = selectedOperator(+a, +b).toString();
	dNP = 0;
	displayNumber[dNP] = result.length > 8 ? "error" : result;
	updateDisplay();
}
