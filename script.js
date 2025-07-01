const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const chartCanvas = document.getElementById("expense-chart");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateChart() {
    const categories = ["Food", "Transport", "Entertainment", "Other"];
    const categoryTotals = categories.map(category =>
        expenses.filter(e => e.category === category).reduce((sum, e) => sum + e.amount, 0)
    );

    new Chart(chartCanvas, {
        type: "pie",
        data: {
            labels: categories,
            datasets: [{
                data: categoryTotals,
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"]
            }]
        }
    });
}

function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.classList.add("expense-item");
        li.innerHTML = `${expense.name} - ₹${expense.amount} (${expense.category}) <button onclick="deleteExpense(${index})">❌</button>`;
        expenseList.appendChild(li);
    });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateChart();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
}

expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const category = document.getElementById("expense-category").value;
    
    expenses.push({ name, amount, category });
    renderExpenses();
    expenseForm.reset();
});

renderExpenses();
