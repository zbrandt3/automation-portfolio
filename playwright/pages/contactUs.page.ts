import { BasePage } from "./base.page";
import { Locator, Page } from "@playwright/test";

export class ContactUsPage extends BasePage {
    readonly contactUsButton: Locator;
    readonly getInTouchText: Locator;
    readonly contactUsName: Locator;
    readonly contactUsEmail: Locator;
    readonly contactUsSubject: Locator;
    readonly contactUsMessage: Locator;
    readonly contactUsSubmit: Locator;
    readonly contactUsSuccess: Locator;


    constructor(page: Page) {
        super(page);
        this.contactUsButton = page.locator('a[href="/contact_us"]')
        this.getInTouchText = page.getByText('Get In Touch');
        this.contactUsName = page.locator('[data-qa="name"]');
        this.contactUsEmail = page.locator('[data-qa="email"]');
        this.contactUsSubject = page.locator('[data-qa="subject"]');
        this.contactUsMessage = page.locator('[data-qa="message"]');
        this.contactUsSubmit = page.locator('[data-qa="submit-button"]');
        this.contactUsSuccess = page.locator('.status.alert.alert-success');
    }
}