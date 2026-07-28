import { test, expect } from "../fixtures/test-fixtures";
import { ProductDetailsPage } from "../pages/productDetails.page";
import { ProductsPage } from "../pages/products.page";

//specific item number search
const productId = 4;
const searchText = 'blue';

test.describe('Check products page', async () => {
    test('View first product', async ({ page, productsPage, productDetailsPage, homePage }) => {
        await productsPage.goto('/');
        await homePage.productsPageNavButton.click();
        await expect(page).toHaveURL('/products');
        await expect(productsPage.productItemList).toBeVisible();
        await productsPage.productViewItem.click();

        await expect(page).toHaveURL(`/product_details/${productsPage.productId}`);
        await expect(productDetailsPage.productDetailsPageAvailability).toBeVisible();
        await expect(productDetailsPage.productDetailsPageName).toBeVisible();
        await expect(productDetailsPage.productDetailsPageCategory).toBeVisible();
        await expect(productDetailsPage.productDetailsPagePrice).toBeVisible();
        await expect(productDetailsPage.productDetailsPageCondition).toBeVisible();
        await expect(productDetailsPage.productDetailsPageBrand).toBeVisible();
    })
    test('View n product', async ({ page, homePage }) => {
        const nProductPage = new ProductsPage(page, productId);
        const nProductDetailsPage = new ProductDetailsPage(page);
        await nProductPage.goto('/');
        await homePage.productsPageNavButton.click();
        await expect(page).toHaveURL('/products');
        await expect(nProductPage.productItemList).toBeVisible();
        await nProductPage.productViewItem.click();

        await expect(page).toHaveURL(`/product_details/${nProductPage.productId}`);
        await expect(nProductDetailsPage.productDetailsPageAvailability).toBeVisible();
        await expect(nProductDetailsPage.productDetailsPageName).toBeVisible();
        await expect(nProductDetailsPage.productDetailsPageCategory).toBeVisible();
        await expect(nProductDetailsPage.productDetailsPagePrice).toBeVisible();
        await expect(nProductDetailsPage.productDetailsPageCondition).toBeVisible();
        await expect(nProductDetailsPage.productDetailsPageBrand).toBeVisible();
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