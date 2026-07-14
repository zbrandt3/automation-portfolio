import { test, expect } from "../fixtures/test-fixtures";
import { RegistrationPage } from "../pages/registration.page";
import { existingUser1 as existingUser } from "../utils/test-users";

test.describe("Registering new user", () => {
    test('Register minimum user', async ({ page, registrationPage, randomUser }) => {
        //signup page to registration page
        await registrationPage.goto('/signup');
        await registrationPage.registrationSignupEmail.fill(randomUser.email);
        await registrationPage.registrationSignupName.fill(randomUser.name);
        await registrationPage.registrationSignUpButton.click();

        //registration page
        await registrationPage.registrationPassword.fill(randomUser.password);
        await registrationPage.registrationFirstName.fill(randomUser.firstName);
        await registrationPage.registrationLastName.fill(randomUser.lastName);
        await registrationPage.registrationAddress.fill(randomUser.address);
        await registrationPage.registrationCountry.selectOption(randomUser.country);
        await registrationPage.registrationCity.fill(randomUser.city);
        await registrationPage.registrationState.fill(randomUser.state);
        await registrationPage.registrationAddress.fill(randomUser.address);
        await registrationPage.registrationZipCode.fill(randomUser.zipCode);
        await registrationPage.registrationPhoneNumber.fill(randomUser.phoneNumber);
        await registrationPage.registrationCreateAccountButton.click();
        await expect(page).toHaveURL('/account_created');

        await registrationPage.registrationContinue.click();
        await registrationPage.registrationDeleteAccount.click();
        await expect(page).toHaveURL('/delete_account');
        await expect(registrationPage.registrationDeletionConfirmation).toBeVisible();
    })
    test('register user with existing email', async ({ registrationPage, randomUser }) => {
        await registrationPage.goto('/signup');
        await registrationPage.registrationSignupEmail.fill(existingUser.email)
        await registrationPage.registrationSignupName.fill(randomUser.name)
        await registrationPage.registrationSignUpButton.click();
        await expect(registrationPage.registrationEmailError).toBeVisible();
        await expect(registrationPage.registrationEmailError).toHaveCSS('color', 'rgb(255, 0, 0)');
    })
});