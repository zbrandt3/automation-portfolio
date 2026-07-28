import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductDetailsPage extends BasePage {
    readonly productDetailsPageName: Locator;
    readonly productDetailsPageCategory: Locator;
    readonly productDetailsPagePrice: Locator;
    readonly productDetailsPageAvailability: Locator;
    readonly productDetailsPageCondition: Locator;
    readonly productDetailsPageBrand: Locator;

    constructor(page: Page) {
        super(page);
        this.productDetailsPageName = page.locator('.product-information h2')
        this.productDetailsPageCategory = page.locator('.product-information').getByText('Category:');
        this.productDetailsPagePrice = page.locator('.product-information span').getByText('Rs.');
        this.productDetailsPageAvailability = page.locator('.product-information').getByText('Availability:');
        this.productDetailsPageCondition = page.locator('.product-information').getByText('Condition:');
        this.productDetailsPageBrand = page.locator('.product-information').getByText('Brand:');
    }
}