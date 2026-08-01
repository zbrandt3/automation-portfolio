import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { HomePage } from "./home.page";

export class ProductsPage extends BasePage {

    public productId: number;
    protected searchProductText: string;

    readonly productsSearchBar: Locator;
    readonly productsSubmitSearch: Locator;
    readonly productItemList: Locator;
    readonly productViewItem: Locator;
    readonly productItemAddedPopoverButton: Locator;
    readonly productSearchedProducts: Locator;


    constructor(page: Page, productId = 1, searchProductText = 'test') {
        super(page);
        //allow for searching of specific products, default to first item
        this.productId = productId;
        this.searchProductText = searchProductText;

        this.productsSearchBar = page.locator('#search_product');
        this.productsSubmitSearch = page.locator('#submit_search');
        this.productItemList = page.locator('.features_items');
        this.productViewItem = page.locator(`a[href="/product_details/${productId}"]`);
        this.productItemAddedPopoverButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.productSearchedProducts = page.locator('h2').getByText('Searched Products');

    }

    async setProductID(id: number) {
        this.productId = id;
    }

    async searchProduct(product: string) {
        await this.productsSearchBar.fill(product);
        await this.productsSubmitSearch.click()
    }

    async addProductToCart(id: number = 1) {
        await this.setProductID(id);
        await this.goto('/products');

        //set item locators when id is set
        const item = this.page.locator('.single-products').nth(id - 1);
        const addItem = this.page.locator(`.product-overlay [data-product-id="${id}"]`)

        await item.hover();
        await addItem.click();

        await this.productItemAddedPopoverButton.click();
    }
}