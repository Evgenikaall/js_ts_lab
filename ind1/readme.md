# Анализатор Транзакций

Этот проект представляет собой консольное приложение на JavaScript для анализа транзакций. Приложение читает данные из файла JSON, содержащего список транзакций, и предоставляет различные методы для их анализа.

## Структура проекта

- `transactions.json`: Файл, содержащий транзакции.
- `index.js` (или `main.js`): Основной файл с кодом приложения.

## Класс `TransactionAnalyzer`

Класс `TransactionAnalyzer` предоставляет методы для анализа транзакций. Конструктор класса принимает массив объектов транзакций.

### Методы класса

1. **`addTransaction(transaction)`**: Добавляет новую транзакцию.
    - **Параметр**: `transaction` - объект транзакции.

2. **`getAllTransactions()`**: Возвращает все транзакции.
    - **Возвращает**: Массив объектов транзакций.

3. **`getUniqueTransactionType()`**: Возвращает уникальные типы транзакций.
    - **Возвращает**: Массив строк с уникальными типами транзакций.

4. **`calculateTotalAmount()`**: Рассчитывает общую сумму всех транзакций.
    - **Возвращает**: Общая сумма транзакций.

5. **`calculateTotalAmountByDate(year, month, day)`**: Рассчитывает общую сумму транзакций за определённую дату.
    - **Параметры**: `year` - год, `month` - месяц, `day` - день.
    - **Возвращает**: Общая сумма транзакций за указанную дату.

6. **`getTransactionByType(type)`**: Возвращает транзакции указанного типа.
    - **Параметр**: `type` - тип транзакций (например, 'debit' или 'credit').
    - **Возвращает**: Массив объектов транзакций указанного типа.

7. **`getTransactionsInDateRange(startDate, endDate)`**: Возвращает транзакции в указанном диапазоне дат.
    - **Параметры**: `startDate` - начальная дата, `endDate` - конечная дата.
    - **Возвращает**: Массив объектов транзакций в указанном диапазоне дат.

8. **`getTransactionsByMerchant(merchantName)`**: Возвращает транзакции указанного торгового места.
    - **Параметр**: `merchantName` - имя торгового места.
    - **Возвращает**: Массив объектов транзакций указанного торгового места.

9. **`calculateAverageTransactionAmount()`**: Рассчитывает среднюю сумму транзакций.
    - **Возвращает**: Средняя сумма транзакций.

10. **`getTransactionsByAmountRange(minAmount, maxAmount)`**: Возвращает транзакции с суммой в указанном диапазоне.
    - **Параметры**: `minAmount` - минимальная сумма, `maxAmount` - максимальная сумма.
    - **Возвращает**: Массив объектов транзакций в указанном диапазоне сумм.

11. **`calculateTotalDebitAmount()`**: Рассчитывает общую сумму дебетовых транзакций.
    - **Возвращает**: Общая сумма дебетовых транзакций.

12. **`findMostTransactionsMonth()`**: Определяет месяц с наибольшим количеством транзакций.
    - **Возвращает**: Номер месяца с наибольшим количеством транзакций.

13. **`findMostDebitTransactionMonth()`**: Определяет месяц с наибольшим количеством дебетовых транзакций.
    - **Возвращает**: Номер месяца с наибольшим количеством дебетовых транзакций.

14. **`mostTransactionTypes()`**: Определяет, каких транзакций больше всего.
    - **Возвращает**: 'debit', если дебетовых больше; 'credit', если кредитовых больше; 'equal', если их количество равно.

15. **`getTransactionsBeforeDate(date)`**: Возвращает транзакции, совершенные до указанной даты.
    - **Параметр**: `date` - дата для сравнения.
    - **Возвращает**: Массив объектов транзакций, совершённых до указанной даты.

16. **`findTransactionById(id)`**: Находит транзакцию по её уникальному идентификатору.
    - **Параметр**: `id` - уникальный идентификатор транзакции.
    - **Возвращает**: Объект транзакции с указанным идентификатором.

17. **`mapTransactionDescriptions()`**: Возвращает массив с описаниями всех транзакций.
    - **Возвращает**: Массив строк с описаниями транзакций.

## Использование

Пример использования класса `TransactionAnalyzer` для анализа транзакций:

```javascript
const fs = require('fs');
const util = require('util');

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

/**
 * Print the output to the console with a specific prefix.
 * @param {string} prefixData - The prefix for the output.
 * @param {Object[]} arrayData - The array of data to print.
 */
function getOutput(prefixData, arrayData) {
    console.log(prefixData, util.inspect(arrayData, { maxArrayLength: null }));
}
