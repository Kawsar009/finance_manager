var totalSalarayIncome;
var totalBalance;
const calculateBtn = document.getElementById("calculate-btn");
calculateBtn.addEventListener("click", function () {
  // taking the total salary input
  totalSalarayIncome = getNumericInput("salary-income-input");

  // taking expenses
  const foodCostExpense = getNumericInput("food-cost-input");
  const rentCostExpense = getNumericInput("rent-cost-input");
  const clothesCostExpense = getNumericInput("clothes-cost-input");

  // calculating the total expense
  if (foodCostExpense && rentCostExpense && clothesCostExpense) {
    const totalExpense = foodCostExpense + rentCostExpense + clothesCostExpense;

    // showing the total expense
    document.getElementById("total-expense-shower").innerText = totalExpense;

    // calculating balance and showing to the UI
    if (totalSalarayIncome && totalExpense) {
      totalBalance = totalSalarayIncome - totalExpense;
      if (totalBalance >= 0) {
        document.getElementById("balance-shower").innerText = totalBalance;
        document.getElementById("negative-balance-handle").style.display =
          "none";
      } else {
        // showing error if total balance is negative
        document.getElementById("negative-balance-handle").style.display =
          "block";
      }
    }
  }
});

// savings
const savingButton = document.getElementById("savings-btn");
savingButton.addEventListener("click", function () {
  const savingsAmountShower = document.getElementById("saving-amount-shower");
  const remainingBalanceShower = document.getElementById("remaining-balance");
  const savingsOverflowError = document.getElementById(
    "saving-percentage-overflow-error"
  );

  // clearing previous inputs
  savingsAmountShower.innerText = "";
  remainingBalanceShower.innerText = "";

  // taking saving percentage value
  const savingPercentage = getNumericInput("saving-percentage-taker");

  if (totalSalarayIncome && savingPercentage) {
    // calculating saving amount
    const savingsAmount = (totalSalarayIncome * savingPercentage) / 100;

    if (savingsAmount <= totalBalance) {
      // showing savings amount to the UI
      savingsAmountShower.innerText = savingsAmount;

      // showing remaining amount to the UI
      remainingBalanceShower.innerText = totalBalance - savingsAmount;

      // clearing if there is an previous error
      savingsOverflowError.classList.remove("d-block");
      savingsOverflowError.classList.add("d-none");
    } else {
      // showing error if balance tends to be negative
      savingsOverflowError.classList.remove("d-none");
      savingsOverflowError.classList.add("d-block");

      // no change in balance if balance tends to be negative
      savingsAmountShower.innerText = "00";
      remainingBalanceShower.innerText = totalBalance;
    }
  }
});

// getting input value
function getNumericInput(id) {
  const targetElement = document.getElementById(id);
  const value = parseFloat(targetElement.value);
  const error = document.getElementById(id + "-error");

  if (!isNaN(value)) {
    if (value <= 0) {
      // show error if negative value is given
      error.style.display = "block";
    } else {
      // if positive(correct) value is given
      error.style.display = "none";
      return value;
    }
  } else {
    // if a string is given
    error.style.display = "block";
  }
}
