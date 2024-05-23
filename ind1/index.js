// imports
const fs = require('fs');
const util = require('util');

/**
 * Class representing a TransactionAnalyzer.
 */
class TransactionAnalyzer {
    /**
     * Create a TransactionAnalyzer.
     * @param {Object[]} transactions - The list of transactions.
     */
    constructor(transactions) {
        this.transactions = transactions;
    }

    /**
     * Add a new transaction.
     * @param {Object} transaction - The transaction to add.
     */
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    /**
     * Get all transactions.
     * @return {Object[]} The list of all transactions.
     */
    getAllTransactions() {
        return this.transactions;
    }

    /**
     * Get unique transaction types.
     * @return {string[]} An array of unique transaction types.
     */
    getUniqueTransactionType() {
        const types = new Set(this.transactions.map(t => t.transaction_type));
        return Array.from(types);
    }

    /**
     * Calculate the total amount of all transactions.
     * @return {number} The total amount of all transactions.
     */
    calculateTotalAmount() {
        return this.transactions.reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0);
    }

    /**
     * Calculate the total amount of transactions for a specific date.
     * @param {number} [year] - The year of the transactions.
     * @param {number} [month] - The month of the transactions.
     * @param {number} [day] - The day of the transactions.
     * @return {number} The total amount of transactions for the specified date.
     */
    calculateTotalAmountByDate(year, month, day) {
        return this.transactions
            .filter(t => {
                const date = new Date(t.transaction_date);
                return (!year || date.getFullYear() === year) &&
                    (!month || date.getMonth() + 1 === month) &&
                    (!day || date.getDate() === day);
            })
            .reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0);
    }

    /**
     * Get transactions by type.
     * @param {string} type - The type of transactions to get.
     * @return {Object[]} The list of transactions of the specified type.
     */
    getTransactionByType(type) {
        return this.transactions.filter(t => t.transaction_type === type);
    }

    /**
     * Get transactions within a date range.
     * @param {string} startDate - The start date of the range.
     * @param {string} endDate - The end date of the range.
     * @return {Object[]} The list of transactions within the date range.
     */
    getTransactionsInDateRange(startDate, endDate) {
        return this.transactions.filter(t => {
            const date = new Date(t.transaction_date);
            return date >= new Date(startDate) && date <= new Date(endDate);
        });
    }

    /**
     * Get transactions by merchant.
     * @param {string} merchantName - The merchant name.
     * @return {Object[]} The list of transactions by the specified merchant.
     */
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(t => t.merchant_name === merchantName);
    }

    /**
     * Calculate the average transaction amount.
     * @return {number} The average transaction amount.
     */
    calculateAverageTransactionAmount() {
        if (this.transactions.length === 0) return 0;
        const total = this.calculateTotalAmount();
        return total / this.transactions.length;
    }

    /**
     * Get transactions by amount range.
     * @param {number} minAmount - The minimum amount.
     * @param {number} maxAmount - The maximum amount.
     * @return {Object[]} The list of transactions within the amount range.
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(t => {
            const amount = parseFloat(t.transaction_amount);
            return amount >= minAmount && amount <= maxAmount;
        });
    }

    /**
     * Calculate the total amount of debit transactions.
     * @return {number} The total amount of debit transactions.
     */
    calculateTotalDebitAmount() {
        return this.transactions
            .filter(t => t.transaction_type === 'debit')
            .reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0);
    }

    /**
     * Find the month with the most transactions.
     * @return {number} The month with the most transactions.
     */
    findMostTransactionsMonth() {
        const monthCounts = this.transactions.reduce((counts, t) => {
            const month = new Date(t.transaction_date).getMonth() + 1;
            counts[month] = (counts[month] || 0) + 1;
            return counts;
        }, {});
        return Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b);
    }

    /**
     * Find the month with the most debit transactions.
     * @return {number} The month with the most debit transactions.
     */
    findMostDebitTransactionMonth() {
        const monthCounts = this.transactions.reduce((counts, t) => {
            if (t.transaction_type === 'debit') {
                const month = new Date(t.transaction_date).getMonth() + 1;
                counts[month] = (counts[month] || 0) + 1;
            }
            return counts;
        }, {});
        return Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b);
    }

    /**
     * Determine which type of transactions are most common.
     * @return {string} The type of transactions that are most common ('debit', 'credit', or 'equal').
     */
    mostTransactionTypes() {
        const typeCounts = this.transactions.reduce((counts, t) => {
            counts[t.transaction_type] = (counts[t.transaction_type] || 0) + 1;
            return counts;
        }, {});
        if (typeCounts.debit > typeCounts.credit) return 'debit';
        if (typeCounts.debit < typeCounts.credit) return 'credit';
        return 'equal';
    }

    /**
     * Get transactions before a specific date.
     * @param {string} date - The date to compare.
     * @return {Object[]} The list of transactions before the specified date.
     */
    getTransactionsBeforeDate(date) {
        const targetDate = new Date(date);
        return this.transactions.filter(t => new Date(t.transaction_date) < targetDate);
    }

    /**
     * Find a transaction by its ID.
     * @param {string} id - The ID of the transaction.
     * @return {Object} The transaction with the specified ID.
     */
    findTransactionById(id) {
        return this.transactions.find(t => t.transaction_id === id);
    }

    /**
     * Get descriptions of all transactions.
     * @return {string[]} The list of all transaction descriptions.
     */
    mapTransactionDescriptions() {
        return this.transactions.map(t => t.transaction_description);
    }
}

/**
 * Print the output to the console with a specific prefix.
 * @param {string} prefixData - The prefix for the output.
 * @param {Object[]} arrayData - The array of data to print.
 */
function getOutput(prefixData, arrayData) {
    console.log(prefixData, util.inspect(arrayData, { maxArrayLength: null }));
}

fs.readFile('transactions.json', (err, data) => {
    if (err) throw err;
    const transactions = JSON.parse(data);
    const analyzer = new TransactionAnalyzer(transactions);

    getOutput('All Transactions:', analyzer.getAllTransactions());
    getOutput('Unique Transaction Types:', analyzer.getUniqueTransactionType());
    getOutput('Total Amount:', analyzer.calculateTotalAmount());
    getOutput('Transactions By Type (debit):', analyzer.getTransactionByType('debit'));
    getOutput('Transactions In Date Range:', analyzer.getTransactionsInDateRange('2010-01-01', '2023-12-31'));
    getOutput('Transactions By Merchant (SuperMart):', analyzer.getTransactionsByMerchant('OnlineShop'));
    getOutput('Average Transaction Amount:', analyzer.calculateAverageTransactionAmount());
    getOutput('Transactions By Amount Range (50-100):', analyzer.getTransactionsByAmountRange(50, 100));
    getOutput('Total Debit Amount:', analyzer.calculateTotalDebitAmount());
    getOutput('Month With Most Transactions:', analyzer.findMostTransactionsMonth());
    getOutput('Month With Most Debit Transactions:', analyzer.findMostDebitTransactionMonth());
    getOutput('Most Transaction Types:', analyzer.mostTransactionTypes());
    getOutput('Transactions Before Date (2019-06-01):', analyzer.getTransactionsBeforeDate('2019-06-01'));
    getOutput('Transaction By ID (1):', analyzer.findTransactionById('1'));
    getOutput('Transaction Descriptions:', analyzer.mapTransactionDescriptions());
});
