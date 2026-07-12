import { test, expect } from "../fixtures/test-fixtures";
import { existingUser1 as existingUser } from "../utils/test-users";

test.describe('Validating login', () => {
    test('valid login', async ({ loginPage }) => {
        await loginPage.goto(loginPage.url);
        await loginPage.login(existingUser.email, existingUser.password);
        await expect(loginPage.displayName).toHaveText(existingUser.name);
    })

    test('invalid login', async ({ loginPage, randomUser }) => {
        await loginPage.goto(loginPage.url);
        await loginPage.login(randomUser.email, randomUser.password);
        //locator uses text, this visibility means correct error text
        await expect(loginPage.loginError).toBeVisible();
        await expect(loginPage.loginError).toHaveCSS('color', 'rgb(255, 0, 0)');
    })
});
