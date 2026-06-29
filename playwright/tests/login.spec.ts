import { test, expect } from "../fixtures/test-fixtures";
import { baseUser } from "../utils/test-data";

test.describe('Login with preexisting user', () => {
    test('valid login', async ({ page, loginPage }) => {
        await loginPage.goto(loginPage.url);
        await loginPage.login(baseUser.email, baseUser.password);

        await expect(page).toHaveURL(loginPage.successUrl);
    })
});
