import { test, expect } from '../fixtures/test-fixtures'

test.describe('Home page', () => {
    test('Subscribe email', async ({ homePage }) => {
        await homePage.goto('/');
        await expect(homePage.subscriptionHeader).toBeVisible();
        await homePage.subscriptionForm.fill('test@gmail.com');
        await homePage.subscriptionSubmitButton.click();
        await expect(homePage.subscriptionSuccessMessage).toBeVisible();
    })
})

test.describe('Category navigation', () => {
    test('check women category', async ({ homePage, productsPage }) => {
        await homePage.goto('/');
        await expect(homePage.categoryCategoryPanel).toBeVisible();
        await homePage.categoryWomenSelection.click();
        await expect(homePage.womenCategoryDress).toBeVisible();
        await homePage.womenCategoryDress.click();
        await expect(productsPage.productHeader).toContainText('Dress');
    })
    test('check men category', async ({ homePage, productsPage }) => {
        await homePage.goto('/');
        await expect(homePage.categoryCategoryPanel).toBeVisible();
        await homePage.categoryMenSelection.click();
        await expect(homePage.menCategoryTshirts).toBeVisible();
        await homePage.menCategoryTshirts.click();
        await expect(productsPage.productHeader).toContainText('Tshirts');

    })
})