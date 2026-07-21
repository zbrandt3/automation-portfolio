import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class RegistrationPage extends BasePage {
    readonly registrationName: Locator;
    readonly registrationEmail: Locator;
    readonly registrationPassword: Locator
    readonly registrationDOBDropdownDay: Locator;
    readonly registrationDOBDropdownMonth: Locator;
    readonly registrationDOBDropdownYear: Locator;
    readonly registrationFirstName: Locator;
    readonly registrationLastName: Locator;
    readonly registrationAddress: Locator;
    readonly registrationCountry: Locator;
    readonly registrationState: Locator;
    readonly registrationCity: Locator;
    readonly registrationZipCode: Locator;
    readonly registrationPhoneNumber: Locator;
    readonly registrationCreateAccountButton: Locator;
    //locators are located on a different page other than /registration


    constructor(page: Page) {
        super(page);
        this.registrationName = page.locator('#name');
        this.registrationEmail = page.locator('#email');
        this.registrationPassword = page.locator('#password');
        this.registrationDOBDropdownDay = page.locator('#uniform-days');
        this.registrationDOBDropdownMonth = page.locator('#uniform-month');
        this.registrationDOBDropdownYear = page.locator('#uniform-year');
        this.registrationFirstName = page.locator('#first_name');
        this.registrationLastName = page.locator('#last_name');
        this.registrationAddress = page.locator('#address1');
        this.registrationCountry = page.locator('#country');
        this.registrationState = page.locator('#state');
        this.registrationCity = page.locator('#city');
        this.registrationZipCode = page.locator('#zipcode');
        this.registrationPhoneNumber = page.locator('#mobile_number');
        this.registrationCreateAccountButton = page.locator('[data-qa="create-account"]');

    }
}
