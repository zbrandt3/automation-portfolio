import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductsPage extends BasePage {

    readonly productsSearchBar: Locator;
    readonly productsSubmitSearch: Locator;
    readonly productItemList: Locator;
    readonly productViewItem: Locator;

    readonly productItemPageName: Locator;
    readonly productItemPageCategory: Locator;
    readonly productItemPagePrice: Locator;
    readonly productItemPageAvailability: Locator;
    readonly productItemPageCondition: Locator;
    readonly productItemPageBrand: Locator;
    readonly productSearchedProducts: Locator;

    readonly productId: number;
    readonly searchProductText: string;

    constructor(page: Page, productId = 1, searchProductText = 'test') {
        super(page);
        //allow for searching of specific products, default to first item
        this.productId = productId;
        this.searchProductText = searchProductText;

        this.productsSearchBar = page.locator('#search_product');
        this.productsSubmitSearch = page.locator('#submit_search');
        this.productItemList = page.locator('.features_items');
        this.productViewItem = page.locator(`a[href="/product_details/${productId}"]`)

        this.productItemPageName = page.locator('.product-information h2')
        this.productItemPageCategory = page.locator('.product-information').getByText('Category:');
        this.productItemPagePrice = page.locator('.product-information span').getByText('Rs.');
        this.productItemPageAvailability = page.locator('.product-information').getByText('Availability:');
        this.productItemPageCondition = page.locator('.product-information').getByText('Condition:');
        this.productItemPageBrand = page.locator('.product-information').getByText('Brand:');
        this.productSearchedProducts = page.locator('h2').getByText('Searched Products');
    }

    async searchProduct(product: string) {
        await this.productsSearchBar.fill(product);
        await this.productsSubmitSearch.click()
    }
}