import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { BaseUser } from '../utils/test-users';
import { RegistrationPage } from '../pages/registration.page';
import { ContactUsPage } from '../pages/contactUs.page';
import { TestCasesPage } from '../pages/testCases.page';
import { HomePage } from '../pages/home.page';
import { CartPage } from '../pages/cart.page';

type Pages = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    registrationPage: RegistrationPage;
    randomUser: BaseUser;
    registeredUser: BaseUser;
    contactUsPage: ContactUsPage;
    testCasesPage: TestCasesPage;
    homePage: HomePage;
    cartPage: CartPage;
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
    contactUsPage: async ({ page }, use) => {
        await use(new ContactUsPage(page));
    },
    testCasesPage: async ({ page }, use) => {
        await use(new TestCasesPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    randomUser: async ({ }, use) => {
        await use(new BaseUser());
    },
    registeredUser: async ({ page, randomUser, homePage }, use) => {
        //fill in registration 
        await page.goto("/login")
        await use(randomUser);

        //teardown
        await page.goto('/');
        await homePage.deleteAccountButton.click()
        await expect(page).toHaveURL('/delete_account')
    }
});



export { expect } from '@playwright/test';