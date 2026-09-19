import { test, expect } from "../fixtures/test-fixtures";
import { HomePage } from "../pages/home.page";
import { ProductDetailsPage } from "../pages/productDetails.page";
import { ProductsPage } from "../pages/products.page";

//specific item number search
//const productId = 4;
//const searchText = 'blue';

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
        await productsPage.setSearchText('blue');
        await productsPage.setProductID(4);
        await productsPage.goto('/');
        await homePage.productsPageNavButton.click();
        await expect(page).toHaveURL('/products');
        await productsPage.searchProduct();
        await expect(productsPage.productSearchedProducts).toBeVisible();
    })
    test('Search specific product', async ({ page, homePage, productsPage }) => {
        await productsPage.setSearchText('blue');
        await productsPage.setProductID(4);
        await productsPage.goto('/');
        await homePage.productsPageNavButton.click();
        await expect(page).toHaveURL('/products');
        await productsPage.searchProduct();
        await expect(productsPage.productSearchedProducts).toBeVisible();
        await expect(productsPage.productItemList).toContainText(productsPage.searchProductText, { ignoreCase: true });
    })
})

test.describe('search brand', () => {
    test('search polo brand', async ({ homePage, productsPage }) => {
        await homePage.goto('/');
        await homePage.productsPageNavButton.click();
        await expect(homePage.brandsPolo).toBeVisible();
        await homePage.brandsPolo.click();
        await expect(productsPage.productHeader).toContainText('Polo');
    })
    test('search H&M brand', async ({ homePage, productsPage }) => {
        await homePage.goto('/');
        await homePage.productsPageNavButton.click();
        await expect(homePage.brandsHandM).toBeVisible();
        await homePage.brandsHandM.click();
        await expect(productsPage.productHeader).toContainText('H&M');
    })
})
