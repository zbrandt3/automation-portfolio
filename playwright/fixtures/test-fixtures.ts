import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { BaseUser } from '../utils/test-users';
import { RegistrationPage } from '../pages/registration.page';

type Pages = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    registrationPage: RegistrationPage;
    randomUser: BaseUser;
    registeredUser: BaseUser;
};

export const test = base.extend<Pages>({
    page: async ({ page }, use) => {
        await page.route('**/*doubleclick.net**', route => route.abort());
        await page.route('**/*googlesyndication.com**', route => route.abort());
        await page.route('**/*adtrafficquality.google**', route => route.abort());
        await page.route('**/*admaster.cc**', route => route.abort());
        await use(page);
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    registrationPage: async ({ page }, use) => {
        await use(new RegistrationPage(page));
    },
    randomUser: async ({ }, use) => {
        await use(new BaseUser());
    },
    registeredUser: async ({ page, randomUser, registrationPage }, use) => {
        //fill in registration 
        await page.goto("/login")
        await use(randomUser);

        //teardown
        await page.goto('/');
        await registrationPage.registrationDeleteAccount.click()
        await expect(page).toHaveURL('/delete_account')
    }
});



export { expect } from '@playwright/test';