let displayNumber = ["0","0"];
let displayNumberSelector = 0;
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
	if (displayNumber[displayNumberSelector] === "error") {
		document.querySelector("#display").textContent = displayNumber[displayNumberSelector];
		return;
	}
	let displayLength = displayNumber[displayNumberSelector].length;

	// Check display has space and non empty
	if (displayLength < 8 && (!(number === "0") || displayLength > 0)) {

		// Check display is not 0 before appending digits
		if (!(number === "") && displayNumber[displayNumberSelector] === "0") {
			displayNumber[displayNumberSelector] = number;
		} else {
			displayNumber[displayNumberSelector] += number;
		}
		document.querySelector("#display").textContent = displayNumber[displayNumberSelector];
	}
}

function equals() {
	//Assume displayNumber is filled
	let a, b;
	[a, b] = displayNumber;
	let result = selectedOperator(+a, +b).toString();
	if (result.length > 8) {
		displayNumber = ["error", "0"];
	} else {
		displayNumber = [result, "0"];
	}
	displayNumberSelector = 0;
	updateDisplay();
}


let btnNumbers = document.querySelectorAll(".number");

btnNumbers.forEach( number => {
	number.addEventListener("click", () => updateDisplay(number.textContent))});

let btnOperators = document.querySelectorAll(".operator");

btnOperators.forEach( operator => {
	operator.addEventListener("click", () => {
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
		displayNumberSelector = 1;
	})
});

let btnEquals = document.querySelector(".equals");

btnEquals.addEventListener("click", equals);
