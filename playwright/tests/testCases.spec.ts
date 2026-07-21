import { test, expect } from "../fixtures/test-fixtures";

test.describe('Navigate to Test Cases page', async () => {
    test('click on navigation button', async ({ testCasesPage, page, homePage }) => {
        await testCasesPage.goto('/');
        await homePage.testCasesPageNavButton.click();
        await expect(page).toHaveURL('/test_cases');
    })
})