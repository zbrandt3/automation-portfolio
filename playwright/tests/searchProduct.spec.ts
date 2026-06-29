import { expect, test } from "../fixtures/test-fixtures";

test.describe("use product search page", () => {
    test("search for specific item", async ({ page, productsPage }) => {
        await productsPage.searchProduct('1000');
        expect(page).toHaveURL('/products?search=1000/')
    })
});