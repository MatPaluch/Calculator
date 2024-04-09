document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  const resultDisplay = document.getElementById("result");
  const buttons = document.querySelector(".inputs");

  // Define variables
  let currentExpression = ""; // Current calculator expression

  // Function to update displayed result
  function updateResult() {
    resultDisplay.value = currentExpression;
  }

  // Function to handle button clicks
  buttons.addEventListener("click", function (e) {
    const clickedButton = e.target;
    const buttonText = clickedButton.textContent;

    // Handling "=" button
    if (buttonText === "=") {
      // Perform calculations for the entire expression
      if (currentExpression) {
        try {
          const result = eval(currentExpression); // Use eval to calculate result
          if (Number.isInteger(result)) {
            currentExpression = result.toString();
          } else {
            currentExpression = result.toFixed(10).toString();
          }
          // Update expression to result
          updateResult();
        } catch (error) {
          currentExpression = ""; // Clear expression in case of error
          updateResult();
        }
      }
    } // Handling numbers

    // Handling "C" button (clear)
    else if (buttonText === "C") {
      currentExpression = "";
    }

    // Handling other buttons (numbers and operators)
    else if (buttonText === "<X") {
      if (currentExpression) {
        const arr = currentExpression.toString().split("");
        arr.pop();
        currentExpression = arr.join("");
      }
    } else if (buttonText === "%") {
      currentExpression = currentExpression / 100;
    } else if (
      buttonText === "/" ||
      buttonText === "*" ||
      buttonText === "+" ||
      buttonText === "-"
    ) {
      const arr = currentExpression.split("");
      if (!isNaN(arr[arr.length - 1])) {
        currentExpression += buttonText;
      } else {
        e.preventDefault();
      }
    } else if (buttonText === ".") {
      if (currentExpression.toString().includes(".")) {
        e.preventDefault();
      } else {
        currentExpression += buttonText;
      }
    } else if (e.target.tagName === "BUTTON") {
      currentExpression += buttonText;
    }
    // Update displayed result
    updateResult();
  });
});
