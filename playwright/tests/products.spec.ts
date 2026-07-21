import { test, expect } from "../fixtures/test-fixtures";
import { ProductsPage } from "../pages/products.page";

//specific item number search
const productId = 4;
const searchText = 'blue';

test.describe('Check products page', async () => {
    test('View first product', async ({ productsPage, page, homePage }) => {
        await productsPage.goto('/');
        await homePage.productsPageNavButton.click();
        await expect(page).toHaveURL('/products');
        await expect(productsPage.productItemList).toBeVisible();
        await productsPage.productViewItem.click();

        await expect(page).toHaveURL(`/product_details/${productsPage.productId}`);
        await expect(productsPage.productItemPageAvailability).toBeVisible();
        await expect(productsPage.productItemPageName).toBeVisible();
        await expect(productsPage.productItemPageCategory).toBeVisible();
        await expect(productsPage.productItemPagePrice).toBeVisible();
        await expect(productsPage.productItemPageCondition).toBeVisible();
        await expect(productsPage.productItemPageBrand).toBeVisible();
    })
    test('View n product', async ({ page, homePage }) => {
        const nProductPage = new ProductsPage(page, productId);
        await nProductPage.goto('/');
        await homePage.productsPageNavButton.click();
        await expect(page).toHaveURL('/products');
        await expect(nProductPage.productItemList).toBeVisible();
        await nProductPage.productViewItem.click();

        await expect(page).toHaveURL(`/product_details/${nProductPage.productId}`);
        await expect(nProductPage.productItemPageAvailability).toBeVisible();
        await expect(nProductPage.productItemPageName).toBeVisible();
        await expect(nProductPage.productItemPageCategory).toBeVisible();
        await expect(nProductPage.productItemPagePrice).toBeVisible();
        await expect(nProductPage.productItemPageCondition).toBeVisible();
        await expect(nProductPage.productItemPageBrand).toBeVisible();
    })
    test('Search product', async ({ productsPage, page, homePage }) => {
        await productsPage.goto('/');
        await homePage.productsPageNavButton.click();
        await expect(page).toHaveURL('/products');
        await productsPage.searchProduct(searchText);
        await expect(productsPage.productSearchedProducts).toBeVisible();
    })
    test('Search specific product', async ({ page, homePage }) => {
        const specificSearch = new ProductsPage(page, productId, searchText)
        await specificSearch.goto('/');
        await homePage.productsPageNavButton.click();
        await expect(page).toHaveURL('/products');
        await specificSearch.searchProduct(searchText);
        await expect(specificSearch.productSearchedProducts).toBeVisible();
        await expect(specificSearch.productItemList).toContainText(searchText, { ignoreCase: true });
    })
})