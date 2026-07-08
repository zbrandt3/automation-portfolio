import { test as base } from '@playwright/test';
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
    registeredUser: async ({ page, randomUser }, use) => {
        //fill in registration 
        await page.goto("/login")
    }
});



export { expect } from '@playwright/test';