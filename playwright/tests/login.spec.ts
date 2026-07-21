import { test, expect } from "../fixtures/test-fixtures";
import { existingUser1 as existingUser } from "../utils/test-users";

test.describe('Validating login', () => {
    test('home page visibility ', async ({ loginPage, homePage }) => {
        await loginPage.goto('/');
        await expect(homePage.logo).toBeVisible();
    })
    test('invalid login', async ({ loginPage, randomUser }) => {
        await loginPage.goto(loginPage.url);
        await loginPage.login(randomUser.email, randomUser.password);
        //locator uses text, this visibility means correct error text
        await expect(loginPage.loginError).toBeVisible();
        await expect(loginPage.loginError).toHaveCSS('color', 'rgb(255, 0, 0)');
    })
    test('valid login', async ({ loginPage, homePage }) => {
        await loginPage.login(existingUser.email, existingUser.password);
        await expect(homePage.displayName).toHaveText(existingUser.name);
    })
    test('logout', async ({ loginPage, page, homePage }) => {
        await loginPage.login(existingUser.email, existingUser.password);
        await homePage.logoutButton.click();
        await expect(page).toHaveURL("/login");
    })


});
