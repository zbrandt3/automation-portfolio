import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductsPage extends BasePage {

    readonly searchBar: Locator;
    readonly submitSearch;

    constructor(page: Page) {
        super(page);
        this.searchBar = page.locator('#search_product');
        this.submitSearch = page.locator('#submit_search');
    }

    async searchProduct(product: string) {
        await this.searchBar.fill(product);
        await this.submitSearch.click()
    }
}