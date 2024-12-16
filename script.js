// Store expenses in localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Add an expense
function addExpense(description, amount, category) {
  expenses.push({ description, amount: parseFloat(amount), category });
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Render expenses on the View Expenses page
function renderExpenses() {
  const expenseList = document.getElementById("expense-list");
  expenseList.innerHTML = "";
  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.description} - $${expense.amount.toFixed(2)} (${expense.category})
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

// Delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

// Render summary
function renderSummary() {
  const totalAmount = document.getElementById("total-amount");
  const categorySummary = document.getElementById("category-summary");

  let total = 0;
  const categoryTotals = {};

  expenses.forEach((expense) => {
    total += expense.amount;
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
  });

  totalAmount.textContent = total.toFixed(2);

  categorySummary.innerHTML = "";
  for (const [category, amount] of Object.entries(categoryTotals)) {
    const li = document.createElement("li");
    li.textContent = `${category}: $${amount.toFixed(2)}`;
    categorySummary.appendChild(li);
  }
}

// Add expense functionality
document.getElementById("add-expense")?.addEventListener("click", () => {
  const description = document.getElementById("description").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const category = document.getElementById("category").value;

  if (!description || !amount) {
    alert("Please fill out all fields!");
    return;
  }

  addExpense(description, amount, category);
  alert("Expense added!");
  window.location.href = "view-expenses.html";
});

// Render data on page load
if (window.location.pathname.includes("view-expenses.html")) {
  renderExpenses();
}
if (window.location.pathname.includes("summary.html")) {
  renderSummary();
}
