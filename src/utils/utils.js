exports.mapTransactionData = (transactionResponse) => {
    if (!transactionResponse || !transactionResponse.length) {
        return [];
    }

    const transactionClone = JSON.parse(JSON.stringify(transactionResponse));
    const mappedTransactions = transactionClone.map(transaction => {
        const matchedKeys = { AccountId: 'accountId', TransactionId: 'id', Amount: 'amount', ValueDateTime: 'date', TransactionInformation: 'description', Status: 'status'};
        const mappedTransaction = {};
        delete transaction.BookingDateTime;
        delete transaction.CreditDebitIndicator;
        for (const[key, value] of Object.entries(transaction)) {
            if (key === 'Amount') {
                mappedTransaction[matchedKeys[key]] = value.Amount;
            } else {
                mappedTransaction[matchedKeys[key]] = value;
            }
        }
        return mappedTransaction;
    })
    return mappedTransactions;

}