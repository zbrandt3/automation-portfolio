import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class RegistrationPage extends BasePage {
    readonly registerationName: Locator;
    readonly registerationEmail: Locator;
    readonly registerationPassword: Locator
    readonly registrationDOBDropdownDay: Locator;
    readonly registrationDOBDropdownMonth: Locator;
    readonly registrationDOBDropdownYear: Locator;
    readonly registerationFirstName: Locator;
    readonly registerationLastName: Locator;
    readonly registrationSignupName: Locator;
    readonly registrationSignupEmail: Locator;


    constructor(page: Page) {
        super(page);
        this.registerationName = page.locator('#name');
        this.registerationEmail = page.locator('#email');
        this.registerationPassword = page.locator('#password');
        this.registrationDOBDropdownDay = page.locator('#uniform-days');
        this.registrationDOBDropdownMonth = page.locator('#uniform-month');
        this.registrationDOBDropdownYear = page.locator('#uniform-year');
        this.registerationFirstName = page.locator('#first_name');
        this.registerationLastName = page.locator('#last_name');
        this.registrationSignupName = page.locator('[data-qa="signup-name"]')
        this.registrationSignupEmail = page.locator('[data-qa="signup-email"]')
    }
}
