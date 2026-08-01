import { test, expect } from "../fixtures/test-fixtures";
import { existingUser1 as existingUser } from "../utils/test-users";

test.describe("Registering new user", () => {
    test('Register minimum user', async ({ page, randomUser, registrationPage, loginPage }) => {
        await randomUser.createNewUserByGoingToSignupPage(registrationPage, loginPage);
        await expect(page).toHaveURL('/account_created');
    })

    test('register user with existing email', async ({ registrationPage, loginPage }) => {
        await registrationPage.goto('/signup');
        await loginPage.registrationSignupEmail.fill(existingUser.email)
        await loginPage.registrationSignupName.fill('name')
        await loginPage.registrationSignUpButton.click();
        await expect(loginPage.registrationEmailError).toBeVisible();
        await expect(loginPage.registrationEmailError).toHaveCSS('color', 'rgb(255, 0, 0)');
    })
});