import { test, expect } from "../fixtures/test-fixtures";
import { existingUser1 as existingUser } from "../utils/test-users";

test.describe("Registering new user", () => {
    test('Register minimum user', async ({ page, registrationPage, registeredUser, loginPage }) => {
        //signup page to registration page
        await registrationPage.goto('/signup');
        await loginPage.registrationSignupEmail.fill(registeredUser.email);
        await loginPage.registrationSignupName.fill(registeredUser.name);
        await loginPage.registrationSignUpButton.click();

        //registration page
        await registrationPage.registrationPassword.fill(registeredUser.password);
        await registrationPage.registrationFirstName.fill(registeredUser.firstName);
        await registrationPage.registrationLastName.fill(registeredUser.lastName);
        await registrationPage.registrationAddress.fill(registeredUser.address);
        await registrationPage.registrationCountry.selectOption(registeredUser.country);
        await registrationPage.registrationCity.fill(registeredUser.city);
        await registrationPage.registrationState.fill(registeredUser.state);
        await registrationPage.registrationAddress.fill(registeredUser.address);
        await registrationPage.registrationZipCode.fill(registeredUser.zipCode);
        await registrationPage.registrationPhoneNumber.fill(registeredUser.phoneNumber);
        await registrationPage.registrationCreateAccountButton.click();
        await expect(page).toHaveURL('/account_created');
    })

    test('register user with existing email', async ({ registrationPage, randomUser, loginPage }) => {
        await registrationPage.goto('/signup');
        await loginPage.registrationSignupEmail.fill(existingUser.email)
        await loginPage.registrationSignupName.fill(randomUser.name)
        await loginPage.registrationSignUpButton.click();
        await expect(loginPage.registrationEmailError).toBeVisible();
        await expect(loginPage.registrationEmailError).toHaveCSS('color', 'rgb(255, 0, 0)');
    })
});