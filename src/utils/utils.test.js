const { TestWatcher } = require("@jest/core");
const { mapTransactionData } = require("./utils");

describe("Utils", () => {
    describe("mapTransactionData", () => {
        it("init", () => {
            expect(mapTransactionData([])).toBeTruthy();
        });

        it("should return an empty array when given array is empty", () => {
            const transactionsData = [];
            const expected = [];
            expect(mapTransactionData(transactionsData)).toEqual(expected);
        });

        it("should return an array of mapped objects including following keys: accountId, amount, date, description, id, status", () => {
            const transactionsData = [{
                AccountId: '1',
                BookingDateTime: '2020-01-22T00:00:00.000Z',
                ValueDateTime: '2020-01-23T00:00:00.000Z',
                TransactionInformation: 'CULPA DUIS EU CONSECTETUR',
                CreditDebitIndicator: 'Debit',
                Amount: { Amount: 11.97, Currency: 'GBP' },
                TransactionId: '1419548c-9be0-4ff7-ae33-d16820d18aab',
                Status: 'Pending'
              }];
            const expected = [{
                accountId: "1",
                amount: 11.97,
                date: "2020-01-23T00:00:00.000Z",
                description: "CULPA DUIS EU CONSECTETUR",
                id: "1419548c-9be0-4ff7-ae33-d16820d18aab",
                status: "Pending",
            }];

            expect(Object.keys(mapTransactionData(transactionsData))).toEqual(Object.keys(expected));
            expect(mapTransactionData(transactionsData)).toEqual(expected);
        });

        it("should not mutate the original transactionsData after mapping data", () => {
            const transactionsData = [{
                AccountId: '1',
                BookingDateTime: '2020-01-22T00:00:00.000Z',
                ValueDateTime: '2020-01-23T00:00:00.000Z',
                TransactionInformation: 'CULPA DUIS EU CONSECTETUR',
                CreditDebitIndicator: 'Debit',
                Amount: { Amount: 11.97, Currency: 'GBP' },
                TransactionId: '1419548c-9be0-4ff7-ae33-d16820d18aab',
                Status: 'Pending'
              }];

            mapTransactionData(transactionsData)

            expect(transactionsData).toStrictEqual(transactionsData);
        });
    })
})