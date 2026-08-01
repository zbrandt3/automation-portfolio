import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage {
    readonly checkoutPageName: Locator;
    readonly checkoutPageAddress: Locator;
    readonly checkoutPageCityStateZip: Locator;
    readonly checkoutPageCountry: Locator;
    readonly checkoutPagePhoneNumber: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutPageName = page.locator('#address_delivery .address_firstname');
        this.checkoutPageAddress = page.locator('#address_delivery .address_address1').nth(1);
        this.checkoutPageCityStateZip = page.locator('#address_delivery .address_city');
        this.checkoutPageCountry = page.locator('#address_delivery .address_country_name');
        this.checkoutPagePhoneNumber = page.locator('#address_delivery .address_phone');
    }
}
