const display = document.getElementById("display");
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

function appendNumber(number) {
  if (display.textContent === "0" || shouldResetDisplay) {
    display.textContent = number;
    shouldResetDisplay = false;
  } else {
    display.textContent += number;
  }
}

function chooseOperator(op) {
  if (operator !== null) evaluate();
  firstOperand = display.textContent;
  operator = op;
  shouldResetDisplay = true;
}

function evaluate() {
  if (operator === null || shouldResetDisplay) return;

  const secondOperand = display.textContent;
  const a = parseFloat(firstOperand);
  const b = parseFloat(secondOperand);

  let result;
  switch (operator) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "×": result = a * b; break;
    case "÷": result = b === 0 ? "Error" : a / b; break;
  }

  display.textContent = result;
  operator = null;
}

function clear() {
  display.textContent = "0";
  firstOperand = null;
  operator = null;
  shouldResetDisplay = false;
}

function appendDot() {
  if (shouldResetDisplay) resetDisplay();
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
}

function toggleSign() {
  if (display.textContent === "0") return;
  display.textContent = display.textContent.startsWith("-")
    ? display.textContent.slice(1)
    : "-" + display.textContent;
}

function percent() {
  display.textContent = (parseFloat(display.textContent) / 100).toString();
}

function resetDisplay() {
  display.textContent = "";
  shouldResetDisplay = false;
}
document.querySelectorAll("[data-number]").forEach(btn => {
  btn.addEventListener("click", () => appendNumber(btn.textContent));
});

document.querySelectorAll("[data-action='operator']").forEach(btn => {
  btn.addEventListener("click", () => chooseOperator(btn.textContent));
});

document.querySelector("[data-action='equals']").addEventListener("click", evaluate);
document.querySelector("[data-action='clear']").addEventListener("click", clear);
document.querySelector("[data-number='.']").addEventListener("click", appendDot);
document.querySelector("[data-action='plus-minus']").addEventListener("click", toggleSign);
document.querySelector("[data-action='percent']").addEventListener("click", percent);
