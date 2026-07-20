import { test, expect } from "../fixtures/test-fixtures";
import { ProductsPage } from "../pages/products.page";

//specific item number search
const productId = 4;
const searchText = 'blue';

test.describe('Check products page', async () => {
    test('View first product', async ({ productsPage, page }) => {
        await productsPage.goto('/');
        await productsPage.productsNavButton.click();
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
    test('View n product', async ({ page }) => {
        const nProductPage = new ProductsPage(page, productId);
        await nProductPage.goto('/');
        await nProductPage.productsNavButton.click();
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
    test('Search product', async ({ productsPage, page }) => {
        await productsPage.goto('/');
        await productsPage.productsNavButton.click();
        await expect(page).toHaveURL('/products');
        await productsPage.productsSearchBar.fill(productsPage.searchProductText);
        await productsPage.productsSubmitSearch.click();
        await expect(productsPage.productSearchedProducts).toBeVisible();
    })
    test('Search specific product', async ({ page }) => {
        const specificSearch = new ProductsPage(page, productId, searchText)
        await specificSearch.goto('/');
        await specificSearch.productsNavButton.click();
        await expect(page).toHaveURL('/products');
        await specificSearch.productsSearchBar.fill(specificSearch.searchProductText);
        await specificSearch.productsSubmitSearch.click();
        await expect(specificSearch.productSearchedProducts).toBeVisible();
        await expect(specificSearch.productItemList).toContainText(searchText, { ignoreCase: true });
    })
})