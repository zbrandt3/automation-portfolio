import { test, expect } from "../fixtures/test-fixtures";

test.describe("Registering new user", () => {
    test('Register minimum user', async ({ registrationPage }) => {
        await registrationPage.goto('/signup');
        await registrationPage.registrationSignupEmail.fill("adf111x@x.com");
        await registrationPage.registrationSignupName.fill("x");
    })
});