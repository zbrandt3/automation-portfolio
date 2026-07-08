import { test, expect } from "../fixtures/test-fixtures";
import { existingUser1 as existingUser } from "../utils/test-users";

test.describe('Login with preexisting user', () => {
    test('valid login', async ({ loginPage }) => {
        await loginPage.goto(loginPage.url);
        await loginPage.login(existingUser.email, existingUser.password);
        await expect(loginPage.displayName).toHaveText(existingUser.name);
    })
});
