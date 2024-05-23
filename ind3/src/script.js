/**
 * Represents a financial transaction.
 * @typedef {Object} Transaction
 * @property {number} id - The unique identifier for the transaction.
 * @property {string} date - The date and time of the transaction.
 * @property {number} amount - The amount of the transaction.
 * @property {string} category - The category of the transaction.
 * @property {string} description - The description of the transaction.
 */

/**
 * Array containing all transactions.
 * @type {Transaction[]}
 */
const transactions = [];
const transactionTable = document.getElementById("transactionTable");
const transactionForm = document.getElementById("transactionForm");
const totalAmountDisplay = document.getElementById("totalAmount");
const transactionDetailsDisplay = document.getElementById("transactionDetails");

/**
 * Provides event listener for add transaction form
 */
transactionForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTransaction();
});

transactionTable.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
        const transactionId = parseInt(event.target.dataset.transactionId);
        deleteTransaction(transactionId);
    } else if (event.target.tagName === "TD") {
        const transactionId = parseInt(event.target.parentElement.dataset.transactionId);
        showTransactionDetails(transactionId);
    }
});

/**
 * Provide basic functionality to create new transaction
 */
function addTransaction() {
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const id = transactions.length + 1;
    const date = new Date().toLocaleString();

    const transaction = {id, date, amount, category, description};
    transactions.push(transaction);

    const newRow = document.createElement("tr");
    newRow.dataset.transactionId = id;
    newRow.innerHTML = `
            <td>${id}</td>
            <td>${date}</td>
            <td>${category}</td>
            <td>${description}</td>
            <td><button class="delete" data-transaction-id="${id}">Delete</button></td>
        `;
    if (amount >= 0) {
        newRow.classList.add("success");
    } else {
        newRow.classList.add("error");
    }
    transactionTable.querySelector("tbody").appendChild(newRow);

    calculateTotal();
}

/**
 * Deletes transaction based on index
 * @param id
 */
function deleteTransaction(id) {
    const index = transactions.findIndex(transaction => transaction.id === id);
    if (index !== -1) {
        transactions.splice(index, 1);
        transactionTable.querySelector(`tr[data-transaction-id="${id}"]`).remove();
        calculateTotal();
    }
}

/**
 * Utility function to calculate amount
 */
function calculateTotal() {
    const totalAmount = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    totalAmountDisplay.textContent = `Total Amount: ${totalAmount.toFixed(2)}`;
}

/**
 * Show detailed information about a transaction.
 * @param {number} id - The ID of the transaction to show details for.
 */
function showTransactionDetails(id) {
    const transaction = transactions.find(transaction => transaction.id === id);
    if (transaction) {
        transactionDetailsDisplay.innerHTML = `
            <h2>Transaction Details</h2>
            <ul>
                <li><strong>ID:</strong> ${transaction.id}</li>
                <li><strong>Date:</strong> ${transaction.date}</li>
                <li><strong>Amount:</strong> ${transaction.amount}</li>
                <li><strong>Category:</strong> ${transaction.category}</li>
                <li><strong>Description:</strong> ${transaction.description}</li>
            </ul>
        `;
    }else{
        document.getElementById("transactionDetails").innerHTML = ``;
    }
}


