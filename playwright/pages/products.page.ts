import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { HomePage } from "./home.page";

export class ProductsPage extends BasePage {

    public productId: number;
    public searchProductText: string;

    readonly productsSearchBar: Locator;
    readonly productsSubmitSearch: Locator;
    readonly productItemList: Locator;
    readonly productViewItem: Locator;
    readonly productItemAddedPopoverButton: Locator;
    readonly productSearchedProducts: Locator;

    readonly productHeader: Locator;


    constructor(page: Page) {
        super(page);
        //allow for searching of specific products, default to first item
        this.productId = 1;
        this.searchProductText = 'test';

        this.productsSearchBar = page.locator('#search_product');
        this.productsSubmitSearch = page.locator('#submit_search');
        this.productItemList = page.locator('.features_items');
        this.productViewItem = page.locator(`a[href="/product_details/${this.productId}"]`);
        this.productItemAddedPopoverButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.productSearchedProducts = page.locator('h2').getByText('Searched Products');
        this.productHeader = page.locator('h2.title.text-center');

    }

    async setProductID(id: number) {
        this.productId = id;
    }
    async setSearchText(searchText: string) {
        this.searchProductText = searchText;
    }

    async searchProduct() {
        await this.productsSearchBar.fill(this.searchProductText);
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