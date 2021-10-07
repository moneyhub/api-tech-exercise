const { TestWatcher } = require("@jest/core");
const { mapTransactionData } = require("./utils");

describe("Utils", () => {
    describe("mapTransactionData", () => {
        test("init", () => {
            expect(mapTransactionData()).toBeTruthy();
        })
    })
})