import { test, expect } from "../fixtures/test-fixtures";
import { existingUser1 as existingUser } from "../utils/test-users";

test.describe("Registering new user", () => {
    test('Register minimum user', async ({ page, registrationPage, registeredUser }) => {
        //signup page to registration page
        await registrationPage.goto('/signup');
        await registrationPage.registrationSignupEmail.fill(registeredUser.email);
        await registrationPage.registrationSignupName.fill(registeredUser.name);
        await registrationPage.registrationSignUpButton.click();

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

    test('register user with existing email', async ({ registrationPage, randomUser }) => {
        await registrationPage.goto('/signup');
        await registrationPage.registrationSignupEmail.fill(existingUser.email)
        await registrationPage.registrationSignupName.fill(randomUser.name)
        await registrationPage.registrationSignUpButton.click();
        await expect(registrationPage.registrationEmailError).toBeVisible();
        await expect(registrationPage.registrationEmailError).toHaveCSS('color', 'rgb(255, 0, 0)');
    })
});