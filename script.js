let displayNumber = ["0","0"];
let dNS = 1; //displayNumberSelector
let selectedOperator;

updateDisplay();

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
	if (displayNumber[dNS] === "error") {
		document.querySelector("#display").textContent = displayNumber[dNS];
		return;
	}
	let displayLength = displayNumber[dNS].length;

	// Check display has space and non empty
	if (displayLength < 8 && (!(number === "0") || displayLength > 0)) {

		// Check display is not 0 before appending digits
		if (!(number === "") && displayNumber[dNS] === "0") {
			displayNumber[dNS] = number;
		} else {
			displayNumber[dNS] += number;
		}
		document.querySelector("#display").textContent = displayNumber[dNS];
	}
}

function equals() {
	//Assume displayNumber is filled

	if (displayNumber[0] === "error") return;

	let a, b;
	[a, b] = displayNumber;
	let result = selectedOperator(+a, +b).toString();
	dNS = 0;
	displayNumber[dNS] = result.length > 8 ? "error" : result;
	updateDisplay();
}


let btnNumbers = document.querySelectorAll(".number");

btnNumbers.forEach( number => {
	number.addEventListener("click", () => updateDisplay(number.textContent))});

let btnOperators = document.querySelectorAll(".operator");

btnOperators.forEach( operator => {
	operator.addEventListener("click", () => {

		if (displayNumber[dNS] === "error") return;

		// Using operator instead of equals
		if (dNS === 1 && selectedOperator) {
			equals();
			if (displayNumber[dNS] === "error") return;
		} 
		// First time pressing the operator button
		else if (dNS === 1) {
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
		dNS = 1;
		displayNumber[dNS] = "0";
	})
});

let btnEquals = document.querySelector(".equals");

btnEquals.addEventListener("click", equals);
